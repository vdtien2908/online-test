import asyncHandler from 'express-async-handler';
import { Op } from 'sequelize';

import { UserModel, RoleModel } from '../../models';

class UserController {
    // [GET] /api/user
    index = asyncHandler(async (req, res) => {
        const { search, roleId } = req.query;
        const whereConditions = {
            [Op.and]: [
                {
                    status: 0,
                },
                {
                    '$RoleModel.RoleName$': {
                        [Op.in]: ['sinh viên', 'giảng viên'],
                    },
                },
            ],
        };

        if (search) {
            whereConditions.fullName = {
                [Op.like]: `%${search}%`,
            };
        }

        if (roleId) {
            whereConditions.roleId = {
                [Op.eq]: roleId,
            };
        }
        const users = await UserModel.findAll({
            where: whereConditions,
            include: {
                model: RoleModel,
                attributes: ['RoleName'],
            },
        });

        res.status(200).json({
            success: true,
            data: users,
        });
    });

    // [GET] /api/users/:id
    show = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const user = await UserModel.findOne({
            where: { id },
            attributes: { exclude: ['password', 'refreshToken'] },
            include: {
                model: RoleModel,
                attributes: ['RoleName'],
            },
        });

        res.status(200).json({
            success: user ? true : false,
            data: user ? user : 'Không lấy được dữ liệu người dùng!',
        });
    });

    // [POST] /api/users
    store = asyncHandler(async (req, res) => {
        const { email, fullName, gender, dob, phoneNumber, roleId } = req.body;

        // Validate input data
        if (
            !email ||
            !fullName ||
            gender === undefined ||
            !dob ||
            !phoneNumber ||
            !roleId
        ) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng nhập đầy đủ dữ liệu!',
            });
        }

        // Check exists subject
        const isCheckEmail = await UserModel.findAll({
            where: {
                email: email,
                status: 0,
            },
        });

        if (isCheckEmail.length > 0) {
            return res.status(401).json({
                success: false,
                message: 'Người dùng đã tồn tại!',
            });
        }

        const currentYear = new Date().getFullYear();
        const lastTwoDigits = currentYear % 100;
        const randomSixDigits = Math.floor(100000 + Math.random() * 900000);
        const code = parseInt(`${lastTwoDigits}0${roleId}0${randomSixDigits}`);
        req.body.code = code;
        req.body.password = '123456';

        const nesUser = await UserModel.create(req.body);

        res.status(200).json({
            success: nesUser ? true : false,
            nesUser: nesUser ? nesUser : 'Tạo người dùng mới không thành công',
        });
    });

    // [PUT] /api/users
    update = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const data = req.body;

        if (!id || Object.keys(data).length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng nhập đầy đủ dữ liệu!',
            });
        }

        // Check exists subject
        if (data.email) {
            const isCheckEmail = await UserModel.findAll({
                where: {
                    email: data.email,
                    status: 0,
                    id: {
                        [Op.not]: id,
                    },
                },
            });

            if (isCheckEmail.length > 0) {
                return res.status(401).json({
                    success: false,
                    message: 'Người dùng đã tồn tại!',
                });
            }
        }

        const [isUpdateUser] = await UserModel.update(data, {
            where: { id },
        });

        res.status(200).json({
            success: isUpdateUser ? true : false,
            message: isUpdateUser
                ? 'Cập nhật người dùng thành công!'
                : 'Không cập nhật được người dùng!',
        });
    });

    // [DELETE] /api/users
    delete = asyncHandler(async (req, res) => {
        const { id } = req.params;

        const [isUpdateUser] = await UserModel.update(
            { status: 1 },
            { where: { id } }
        );

        res.status(200).json({
            success: isUpdateUser ? true : false,
            message: isUpdateUser
                ? 'Xoá người dùng thành công!'
                : 'Không xoá được người dùng!',
        });
    });
}

export default new UserController();
