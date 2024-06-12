import asyncHandler from 'express-async-handler';
import { Op } from 'sequelize';

import {
    SubjectModel,
    ClassModel,
    AssignmentModel,
    ClassDetailModel,
} from '../../models';

class SubjectController {
    // [GET] /api/subjects
    index = asyncHandler(async (req, res) => {
        const { search, sort } = req.query;

        const whereConditions = {
            status: 0,
        };

        if (search) {
            whereConditions.subjectName = {
                [Op.like]: `%${search}%`,
            };
        }

        const sortOptions = [];
        if (sort) {
            const sortField = 'id';
            const sortOrder = sort.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
            sortOptions.push([sortField, sortOrder]);
        }

        const { role, id } = req.user;

        const subjects = await AssignmentModel.findAll({
            where: { userId: id },
            attributes: ['subjectId'],
        });

        const subjectIds = subjects.map(
            (subject) => subject.dataValues.subjectId
        );

        if (role === 3) {
            whereConditions.id = {
                [Op.in]: subjectIds,
            };
        }

        const result = await SubjectModel.findAll({
            where: whereConditions,
            order: sortOptions,
        });

        res.status(200).json({
            success: result ? true : false,
            data: result ? result : 'Không lấy được dữ liệu môn học.',
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
            data: subject ? subject : 'Không lấy được dữ liệu môn học!',
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
            numberCredits === null ||
            numberOfTheoryLessons === null ||
            numberOfPracticalLessons === null
        ) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng nhập đầy đủ dữ liệu!',
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
                message: 'Tên Môn học đã tồn tại!',
            });
        }

        const newSubject = await SubjectModel.create(req.body);

        res.status(200).json({
            success: newSubject ? true : false,
            newSubject: newSubject
                ? newSubject
                : 'Tạo môn học mới không thành công',
        });
    });

    // [PUT] /api/subjects
    update = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const data = req.body;

        if (!id || Object.keys(data).length === 0) {
            throw new Error('Vui lòng nhập đầy đủ dữ liệu!');
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
                    message: 'Tên môn học đã tồn tại!',
                });
            }
        }

        const [isUpdateSubject] = await SubjectModel.update(data, {
            where: { id },
        });

        res.status(200).json({
            success: isUpdateSubject ? true : false,
            message: isUpdateSubject
                ? 'Cập nhật môn học thành công!'
                : 'Không cập nhật được môn học!',
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
                ? 'Xoá môn học thành công!'
                : 'Không thể xoá môn học!',
        });
    });
}

export default new SubjectController();
