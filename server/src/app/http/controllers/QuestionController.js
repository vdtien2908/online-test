import asyncHandler from 'express-async-handler';
import { Op } from 'sequelize';

import { QuestionModel } from '../../models';

class QuestionController {
    // [GET] /api/questions
    index = asyncHandler(async (req, res) => {
        const questions = await QuestionModel.findAll({
            where: { status: 0 },
        });

        res.status(200).json({
            success: questions ? true : false,
            data: questions ? questions : 'Can not get questions',
        });
    });

    // [GET] /api/questions/:id
    show = asyncHandler(async (req, res) => {
        const { id } = req.params;

        const questions = await QuestionModel.findAll({
            where: {
                id,
            },
        });

        res.status(200).json({
            success: questions ? true : false,
            data: questions ? questions : 'Can not get question!',
        });
    });

    // [POST] /api/questions
    store = asyncHandler(async (req, res) => {
        const { content, lever, chapterId } = req.body;

        // Validate input data
        if (!content || !lever || !chapterId) {
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
        const [isDeleteQuestion] = await QuestionModel.update(
            { status: 1 },
            { where: { id } }
        );

        res.status(200).json({
            success: isDeleteQuestion ? true : false,
            message: isDeleteQuestion
                ? 'Deleted question successfully!'
                : 'Can not deleted question!',
        });
    });
}

export default new QuestionController();
