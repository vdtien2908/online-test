import asyncHandler from 'express-async-handler';
import { Op } from 'sequelize';

import { AnswerModel } from '../../models';

class AnswerController {
    // [GET] /api/answers
    index = asyncHandler(async (req, res) => {
        const answers = await AnswerModel.findAll({
            where: { status: 0 },
        });

        res.status(200).json({
            success: answers ? true : false,
            data: answers ? answers : 'Can not get answers',
        });
    });

    // [GET] /api/answers/:id
    show = asyncHandler(async (req, res) => {
        const { id } = req.params;

        const answers = await AnswerModel.findAll({
            where: {
                id,
            },
        });

        res.status(200).json({
            success: answers ? true : false,
            data: answers ? answers : 'Can not get answer!',
        });
    });

    // [POST] /api/answers
    store = asyncHandler(async (req, res) => {
        const { questionId } = req.params;
        const { answers } = req.body;

        // Validate input data
        if (answers.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Missing inputs',
            });
        }

        const data = answers.map((answer) => {
            return {
                questionId: parseInt(questionId),
                content: answer.content,
                isAnswer: answer.isAnswer,
            };
        });

        const newAnswer = await AnswerModel.bulkCreate(data);

        res.status(200).json({
            success: newAnswer ? true : false,
            newAnswer: newAnswer ? newAnswer : 'Can not created new answer',
        });
    });

    // [POST] /api/answers/add:/questionId
    add = asyncHandler(async (req, res) => {
        const { questionId } = req.params;
        const { content, isAnswer } = req.body;
        if (!content || isAnswer === undefined) {
            return res.status(400).json({
                success: false,
                message: 'Missing inputs',
            });
        }

        const data = {
            questionId,
            content,
            isAnswer,
        };

        const newAnswer = await AnswerModel.create(data);

        res.status(200).json({
            success: newAnswer ? true : false,
            newAnswer: newAnswer ? newAnswer : 'Can not created new answer',
        });
    });

    // [PUT] /api/answers
    update = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const data = req.body;

        if (!id || Object.keys(data).length === 0) {
            throw new Error('Missing inputs');
        }

        const [isUpdateAnswer] = await AnswerModel.update(data, {
            where: { id },
        });

        res.status(200).json({
            success: isUpdateAnswer ? true : false,
            message: isUpdateAnswer
                ? 'Update answer successfully!'
                : 'Can not updated answer!',
        });
    });

    // [DELETE] /api/answers
    delete = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const [isDeleteAnswer] = await AnswerModel.update(
            { status: 1 },
            { where: { id } }
        );

        res.status(200).json({
            success: isDeleteAnswer ? true : false,
            message: isDeleteAnswer
                ? 'Deleted answer successfully!'
                : 'Can not deleted answer!',
        });
    });
}

export default new AnswerController();
