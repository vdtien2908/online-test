import asyncHandler from 'express-async-handler';
import { Op } from 'sequelize';

import { ChapterModel } from '../../models';

class ChapterController {
    // [GET] /api/chapters
    index = asyncHandler(async (req, res) => {
        const chapters = await ChapterModel.findAll({
            where: { status: 0 },
        });

        res.status(200).json({
            success: chapters ? true : false,
            data: chapters ? chapters : 'Can not get chapters',
        });
    });

    // [GET] /api/chapters/:id
    show = asyncHandler(async (req, res) => {
        const { id } = req.params;

        const chapters = await ChapterModel.findAll({
            where: {
                id,
            },
        });

        res.status(200).json({
            success: chapters ? true : false,
            data: chapters ? chapters : 'Can not get chapter!',
        });
    });

    // [POST] /api/chapters
    store = asyncHandler(async (req, res) => {
        const { chapterName, subjectId } = req.body;

        // Validate input data
        if (!chapterName || !subjectId) {
            return res.status(400).json({
                success: false,
                message: 'Missing inputs',
            });
        }

        // Check exists chapter
        const isCheckChapterName = await ChapterModel.findAll({
            where: {
                chapterName,
                status: 0,
                subjectId,
            },
        });

        if (isCheckChapterName.length > 0) {
            return res.status(401).json({
                success: false,
                message: 'The chapter name already exists!',
            });
        }

        const newChapter = await ChapterModel.create(req.body);

        res.status(200).json({
            success: newChapter ? true : false,
            newChapter: newChapter ? newChapter : 'Can not created new chapter',
        });
    });

    // [PUT] /api/chapters
    update = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const data = req.body;

        if (!id || Object.keys(data).length === 0) {
            throw new Error('Missing inputs');
        }

        // Check class exists
        if (data.chapterName) {
            const { dataValues } = await ChapterModel.findOne({
                where: { id },
            });
            const isCheckChapterName = await ChapterModel.findAll({
                where: {
                    chapterName: data.chapterName,
                    status: 0,
                    id: {
                        [Op.not]: id,
                    },
                    subjectId: dataValues.subjectId,
                },
            });

            if (isCheckChapterName.length > 0) {
                return res.status(401).json({
                    success: false,
                    message: 'The chapter name already exists!',
                });
            }
        }

        const [isUpdateChapter] = await ChapterModel.update(data, {
            where: { id },
        });

        res.status(200).json({
            success: isUpdateChapter ? true : false,
            message: isUpdateChapter
                ? 'Update chapter successfully!'
                : 'Can not updated chapter!',
        });
    });

    // [DELETE] /api/chapters
    delete = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const [isDeleteChapter] = await ChapterModel.update(
            { status: 1 },
            { where: { id } }
        );

        res.status(200).json({
            success: isDeleteChapter ? true : false,
            message: isDeleteChapter
                ? 'Deleted chapter successfully!'
                : 'Can not deleted chapter!',
        });
    });
}

export default new ChapterController();
