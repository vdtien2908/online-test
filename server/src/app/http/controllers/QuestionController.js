import asyncHandler from 'express-async-handler';
import { Op } from 'sequelize';

import {
    QuestionModel,
    SubjectModel,
    AnswerModel,
    AssignmentModel,
} from '../../models';

class QuestionController {
    // [GET] /api/questions
    index = asyncHandler(async (req, res) => {
        const { subjectId, lever, search } = req.query;

        const whereConditions = {
            status: 0,
        };

        // Get role current user
        const { role, id } = req.user;

        const subjects = await AssignmentModel.findAll({
            where: { userId: id },
            attributes: ['subjectId'],
        });

        const subjectIds = subjects.map(
            (subject) => subject.dataValues.subjectId
        );

        if (role === 3) {
            if (subjectIds.length === 0) {
                return res.status(200).json({
                    success: true,
                    data: [],
                });
            }

            whereConditions.subjectId = {
                [Op.in]: subjectIds,
            };
        }

        if (search) {
            whereConditions.content = {
                [Op.like]: `%${search}%`,
            };
        }

        if (subjectId) {
            whereConditions.subjectId = {
                [Op.eq]: subjectId,
            };
        }

        if (lever) {
            whereConditions.lever = {
                [Op.eq]: lever,
            };
        }

        const questions = await QuestionModel.findAll({
            where: whereConditions,
            include: [
                {
                    model: SubjectModel,
                    attributes: ['subjectName'],
                },
            ],
        });

        res.status(200).json({
            success: questions ? true : false,
            data: questions ? questions : 'Can not get questions',
        });
    });

    // [GET] /api/questions/:id
    show = asyncHandler(async (req, res) => {
        const { id } = req.params;

        const questions = await QuestionModel.findOne({
            where: {
                id,
            },
            include: [
                {
                    model: AnswerModel,
                    where: {
                        status: 0,
                    },
                    required: false,
                },
                { model: SubjectModel },
            ],
        });

        res.status(200).json({
            success: questions ? true : false,
            data: questions ? questions : 'Can not get question!',
        });
    });

    // [POST] /api/questions
    store = asyncHandler(async (req, res) => {
        const { content, lever, questionId } = req.body;

        // Validate input data
        if (!content || !lever || questionId) {
            return res.status(400).json({
                success: false,
                message: 'Missing inputs',
            });
        }

        req.body.userId = req.user.id;
        const newQuestion = await QuestionModel.create(req.body);

        res.status(200).json({
            success: newQuestion ? true : false,
            newQuestion: newQuestion
                ? newQuestion
                : 'Can not created new question',
        });
    });

    // [PUT] /api/questions
    update = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const data = req.body;

        if (!id || Object.keys(data).length === 0) {
            throw new Error('Missing inputs');
        }

        const [isUpdateQuestion] = await QuestionModel.update(data, {
            where: { id },
        });

        res.status(200).json({
            success: isUpdateQuestion ? true : false,
            message: isUpdateQuestion
                ? 'Update question successfully!'
                : 'Can not updated question!',
        });
    });

    // [DELETE] /api/questions
    delete = asyncHandler(async (req, res) => {
        const { id } = req.params;

        const answers = await AnswerModel.findAll({
            where: {
                questionId: {
                    [Op.eq]: id,
                },
            },
            attributes: ['id'],
        });

        const [isDeleteQuestion] = await QuestionModel.update(
            { status: 1 },
            { where: { id } }
        );

        if (answers.length > 0) {
            await AnswerModel.update(
                { status: 1 },
                { where: { questionId: id } }
            );
        }

        res.status(200).json({
            success: isDeleteQuestion ? true : false,
            message: isDeleteQuestion
                ? 'Deleted question successfully!'
                : 'Can not deleted question!',
        });
    });
}

export default new QuestionController();
