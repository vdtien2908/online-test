import asyncHandler from 'express-async-handler';
import { Op, Sequelize } from 'sequelize';

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

    // [GET] /api/getUserBySubjectId
    getUserBySubjectId = asyncHandler(async (req, res) => {
        const { id } = req.params;

        const result = await AssignmentModel.findAll({
            where: {
                subjectId: id,
            },
            attributes: ['userId'],
        });

        const userIds = result.map((record) => record.userId);

        const users = await UserModel.findAll({
            where: {
                id: {
                    [Op.not]: userIds,
                },
                roleId: 3,
                status: 0,
            },
        });

        res.status(200).json({
            success: true,
            data: users,
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
        const { subjectId, userId } = req.query;

        if (!subjectId || !userId) {
            return res.status(400).json({
                success: false,
                message: 'Không tìm thấy mã môn học hoặc mà người dùng.',
            });
        }

        const deleteResult = await AssignmentModel.destroy({
            where: { subjectId, userId },
        });

        const isDeleteAssignment =
            deleteResult && deleteResult.affectedRows > 0;

        res.status(200).json({
            success: isDeleteAssignment,
            message: isDeleteAssignment
                ? 'Xoá phân công thành công!'
                : 'Không thể xoá phân công!',
        });
    });
}

export default new AssignmentController();
