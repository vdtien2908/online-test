import asyncHandler from 'express-async-handler';
import { Op } from 'sequelize';

import { SubjectModel, ClassModel } from '../../models';

class SubjectController {
    // [GET] /api/subjects
    index = asyncHandler(async (req, res) => {
        const subjects = await SubjectModel.findAll({
            where: { status: 0 },
        });

        res.status(200).json({
            success: subjects ? true : false,
            data: subjects ? subjects : 'Can not get subject',
        });
    });

    // [GET] /api/subject/:id
    show = asyncHandler(async (req, res) => {
        const { id } = req.params;

        const subject = await SubjectModel.findAll({
            where: {
                id,
            },
        });

        res.status(200).json({
            success: subject ? true : false,
            data: subject ? subject : 'Can not get subject!',
        });
    });

    // [POST] /api/subjects
    store = asyncHandler(async (req, res) => {
        const {
            subjectName,
            numberCredits,
            numberOfPracticalLessons,
            numberOfTheoryLessons,
        } = req.body;

        // Validate input data
        if (
            !subjectName ||
            !numberCredits ||
            !numberOfTheoryLessons ||
            !numberOfPracticalLessons
        ) {
            return res.status(400).json({
                success: false,
                message: 'Missing inputs',
            });
        }

        // Check exists subject
        const isCheckSubjectName = await SubjectModel.findAll({
            where: {
                subjectName: subjectName,
                status: 0,
            },
        });

        if (isCheckSubjectName.length > 0) {
            return res.status(401).json({
                success: false,
                message: 'The subject name already exists!',
            });
        }

        const newSubject = await SubjectModel.create(req.body);

        res.status(200).json({
            success: newSubject ? true : false,
            newSubject: newSubject ? newSubject : 'Can not created new subject',
        });
    });

    // [PUT] /api/subjects
    update = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const data = req.body;

        if (!id || Object.keys(data).length === 0) {
            throw new Error('Missing inputs');
        }

        // Check subject exists
        if (data.subjectName) {
            const isCheckSubjectName = await SubjectModel.findAll({
                where: {
                    subjectName: data.subjectName,
                    status: 0,
                    id: {
                        [Op.not]: id,
                    },
                },
            });

            if (isCheckSubjectName.length > 0) {
                return res.status(401).json({
                    success: false,
                    message: 'The subject name already exists!',
                });
            }
        }

        const [isUpdateSubject] = await SubjectModel.update(data, {
            where: { id },
        });

        res.status(200).json({
            success: isUpdateSubject ? true : false,
            message: isUpdateSubject
                ? 'Update subject successfully!'
                : 'Can not updated subject!',
        });
    });

    // [DELETE] /api/subjects
    delete = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const [isDeleteSubject] = await SubjectModel.update(
            { status: 1 },
            { where: { id } }
        );

        const classList = await ClassModel.findAll({
            where: { status: 0, subjectId: id },
        });

        if (isDeleteSubject && classList.length > 0) {
            await ClassModel.update(
                { status: 1 },
                { where: { subjectId: id } }
            );
        }

        res.status(200).json({
            success: isDeleteSubject ? true : false,
            message: isDeleteSubject
                ? 'Deleted subject successfully!'
                : 'Can not deleted subject!',
        });
    });
}

export default new SubjectController();
