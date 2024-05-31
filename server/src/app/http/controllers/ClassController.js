import asyncHandler from 'express-async-handler';
import { Op } from 'sequelize';

import { ClassModel } from '../../models';

class ClassController {
    // [GET] /api/class
    index = asyncHandler(async (req, res) => {
        const classList = await ClassModel.findAll({
            where: { status: 0 },
        });

        res.status(200).json({
            success: classList ? true : false,
            data: classList ? classList : 'Can not get class',
        });
    });

    // [GET] /api/class/:id
    show = asyncHandler(async (req, res) => {
        const { id } = req.params;

        const classList = await ClassModel.findAll({
            where: {
                id,
            },
        });

        res.status(200).json({
            success: classList ? true : false,
            data: classList ? classList : 'Can not get class!',
        });
    });

    // [POST] /api/class
    store = asyncHandler(async (req, res) => {
        const {
            className,
            invitationCode,
            note,
            schoolYear,
            semester,
            subjectId,
        } = req.body;

        // Validate input data
        if (
            !className ||
            !invitationCode ||
            !note ||
            !schoolYear ||
            !semester ||
            !subjectId
        ) {
            return res.status(400).json({
                success: false,
                message: 'Missing inputs',
            });
        }

        // Check exists subject
        const isCheckClassName = await ClassModel.findAll({
            where: {
                className: className,
                status: 0,
            },
        });

        if (isCheckClassName.length > 0) {
            return res.status(401).json({
                success: false,
                message: 'The class name already exists!',
            });
        }

        const data = req.body;
        data.totalMember = 0;
        data.creator = req.user.id;

        const newClass = await ClassModel.create(data);

        res.status(200).json({
            success: newClass ? true : false,
            newClass: newClass ? newClass : 'Can not created new class',
        });
    });

    // [PUT] /api/class
    update = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const data = req.body;

        if (!id || Object.keys(data).length === 0) {
            throw new Error('Missing inputs');
        }

        // Check class exists
        if (data.className) {
            const isCheckClassName = await ClassModel.findAll({
                where: {
                    className: data.className,
                    status: 0,
                    id: {
                        [Op.not]: id,
                    },
                },
            });

            if (isCheckClassName.length > 0) {
                return res.status(401).json({
                    success: false,
                    message: 'The className name already exists!',
                });
            }
        }

        const [isUpdateClass] = await ClassModel.update(data, {
            where: { id },
        });

        res.status(200).json({
            success: isUpdateClass ? true : false,
            message: isUpdateClass
                ? 'Update class successfully!'
                : 'Can not updated class!',
        });
    });

    // [DELETE] /api/class
    delete = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const [isDeleteClass] = await ClassModel.update(
            { status: 1 },
            { where: { id } }
        );

        res.status(200).json({
            success: isDeleteClass ? true : false,
            message: isDeleteClass
                ? 'Deleted subject successfully!'
                : 'Can not deleted subject!',
        });
    });
}

export default new ClassController();
