import asyncHandler from 'express-async-handler';
import { Op } from 'sequelize';

import {
    ClassModel,
    SubjectModel,
    ClassDetailModel,
    UserModel,
} from '../../models';

class ClassController {
    // [GET] /api/class
    index = asyncHandler(async (req, res) => {
        const { search, subjectId } = req.query;

        const whereConditions = {
            status: 0,
        };

        if (search) {
            whereConditions.className = {
                [Op.like]: `%${search}%`,
            };
        }

        if (subjectId) {
            whereConditions.subjectId = {
                [Op.eq]: subjectId,
            };
        }

        const classList = await ClassModel.findAll({
            where: whereConditions,
            include: {
                model: SubjectModel,
            },
        });

        res.status(200).json({
            success: classList ? true : false,
            data: classList ? classList : 'Không lấy được dữ liệu lớp học',
        });
    });

    // [GET] /api/class/:id
    show = asyncHandler(async (req, res) => {
        const { id } = req.params;

        const classList = await ClassModel.findAll({
            where: {
                id,
            },
            include: {
                model: SubjectModel,
            },
        });

        res.status(200).json({
            success: classList ? true : false,
            data: classList ? classList : 'Không lấy được dữ liệu lớp học.',
        });
    });

    // [POST] /api/class
    store = asyncHandler(async (req, res) => {
        const { className, note, schoolYear, semester, subjectId } = req.body;

        // Validate input data
        if (!className || !note || !schoolYear || !semester || !subjectId) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng nhập đầy đủ thông tin',
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
                message: 'Tên lớp học đã tồn tại!',
            });
        }
        function getRandomNumber() {
            const now = new Date().getTime();
            const randomNum = Math.random() * now;
            const randomInt = Math.floor(randomNum);
            return randomInt;
        }

        const data = req.body;
        data.totalMember = 0;
        data.creator = req.user.id;
        data.invitationCode = getRandomNumber();

        const newClass = await ClassModel.create(data);

        res.status(200).json({
            success: newClass ? true : false,
            newClass: newClass ? newClass : 'Không thể tạo lớp học mới',
        });
    });

    // [PUT] /api/class
    update = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const data = req.body;

        if (!id || Object.keys(data).length === 0) {
            throw new Error('Vui lòng nhập đầy đủ dữ liệu!');
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
                    message: 'Tên lớp học đã tồn tại!',
                });
            }
        }

        const [isUpdateClass] = await ClassModel.update(data, {
            where: { id },
        });

        res.status(200).json({
            success: isUpdateClass ? true : false,
            message: isUpdateClass
                ? 'Cập nhật lớp học thành công!'
                : 'Không thể cập nhật lớp học!',
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
                ? 'Xoá lớp học thành công!'
                : 'Không thể xoá lớp học!',
        });
    });

    // [GET] /api/class/getUserByClassId/:id
    getUserByClassId = asyncHandler(async (req, res) => {
        const { id } = req.params;

        const getClassDetailByClassIds = await ClassDetailModel.findAll({
            where: {
                classId: id,
            },
            attributes: ['userId'],
        });

        const userIds = getClassDetailByClassIds.map((record) => record.userId);

        const users = await UserModel.findAll({
            where: {
                id: {
                    [Op.in]: userIds,
                },
            },
            attributes: ['id', 'code', 'fullName'],
        });

        res.status(200).json({
            success: true,
            data: users,
        });
    });

    // [GET] /api/class/getUserNotSubject/:id
    getUserNotClassId = asyncHandler(async (req, res) => {
        const { id } = req.params;

        const module = await ClassModel.findOne({
            where: {
                id,
            },
            include: [
                {
                    model: SubjectModel,
                },
            ],
        });

        const subjectId = module.SubjectModel.id;

        const modules = await ClassModel.findAll({
            where: { subjectId },
        });

        const classIds = modules.map((mod) => mod.id);

        const classDetails = await ClassDetailModel.findAll({
            where: {
                classId: classIds,
            },
        });

        const registeredUserIds = classDetails.map((detail) => detail.userId);

        const users = await UserModel.findAll({
            where: {
                id: {
                    [Op.notIn]: registeredUserIds,
                },
                roleId: 2,
                status: 0,
            },
            attributes: ['id', 'code', 'fullName'],
        });

        res.status(200).json({
            success: true,
            data: users,
        });
    });

    // [POST] /api/class/addStudent/:id
    addStudent = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const { selectedStudent } = req.body;

        if (!Array.isArray(selectedStudent) || selectedStudent.length === 0) {
            return res.status(400).json({ message: 'Invalid student list' });
        }

        const classDetails = selectedStudent.map((student) => ({
            classId: id,
            userId: student.id,
        }));

        await ClassDetailModel.bulkCreate(classDetails);

        const module = await ClassModel.findOne({ where: { id } });

        await ClassModel.update(
            {
                totalMember: module.totalMember + classDetails.length,
            },
            { where: { id } }
        );

        res.status(201).json({
            success: true,
            message: 'Thêm sinh viên thành công.',
        });
    });

    // [DELETE] /api/deleteStudent
    delete = asyncHandler(async (req, res) => {
        const { classId, userId } = req.query;

        const deleteResult = await ClassDetailModel.destroy({
            where: { classId, userId },
        });

        const isDelete = deleteResult && deleteResult.affectedRows > 0;

        const module = await ClassModel.findOne({ where: { id: classId } });

        await ClassModel.update(
            {
                totalMember: module.totalMember - 1,
            },
            { where: { id: classId } }
        );

        res.status(200).json({
            success: isDelete,
            message: isDelete
                ? 'Xoá sinh viên thành công!'
                : 'xoá sinh viên thành công công!',
        });
    });
}

export default new ClassController();
