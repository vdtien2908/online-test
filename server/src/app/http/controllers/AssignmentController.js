import asyncHandler from 'express-async-handler';
import { Op } from 'sequelize';

import { AssignmentModel, UserModel, SubjectModel } from '../../models';

class AssignmentController {
    // [GET] /api/assignments
    index = asyncHandler(async (req, res) => {
        const { userName, subjectId } = req.query;

        const whereConditions = {};
        if (userName) {
            whereConditions['$UserModel.fullName$'] = {
                [Op.like]: `%${userName}%`,
            };
        }

        if (subjectId) {
            whereConditions['$AssignmentModel.subjectId$'] = subjectId;
        }

        const assignments = await AssignmentModel.findAll({
            include: [
                {
                    model: UserModel,
                    attributes: ['id', 'fullName'],
                },
                {
                    model: SubjectModel,
                    attributes: ['id', 'subjectName'],
                },
            ],
            where: whereConditions,
        });

        res.status(200).json({
            success: true,
            data: assignments,
        });
    });

    // [POST] /api/assignments
    store = asyncHandler(async (req, res) => {
        const { userId, subjectId } = req.body;

        // Validate input data
        if (!userId || !subjectId) {
            return res.status(400).json({
                success: false,
                message: 'Missing inputs',
            });
        }

        const newAssignment = await AssignmentModel.create(req.body);

        res.status(200).json({
            success: newAssignment ? true : false,
            newAssignment: newAssignment
                ? newAssignment
                : 'Can not created new assignment',
        });
    });

    // [DELETE] /api/assignments
    delete = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const [isDeleteAssignment] = await AssignmentModel.update(
            { status: 1 },
            { where: { id } }
        );

        res.status(200).json({
            success: isDeleteAssignment ? true : false,
            message: isDeleteAssignment
                ? 'Deleted assignment successfully!'
                : 'Can not deleted assignment!',
        });
    });
}

export default new AssignmentController();
