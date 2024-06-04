import asyncHandler from 'express-async-handler';
import { Op } from 'sequelize';

import { ClassModel, SubjectModel } from '../../models';

class ClassController {
    // [GET] /api/class
    index = asyncHandler(async (req, res) => {
        const classList = await ClassModel.findAll({
            where: { status: 0 },
            include: [{ model: SubjectModel }],
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
}

export default new ClassController();
