import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import { UserModel } from '../../models';
import { generateAccessToken, generateRefreshToken } from '../middlewares/jwt';

dotenv.config();

class AuthController {
    // [POST] /api/auth/register
    register = asyncHandler(async (req, res) => {
        const { email, fullName, dob, gender, phoneNumber, password } =
            req.body;

        if (
            !email ||
            !fullName ||
            !dob ||
            !gender ||
            !phoneNumber ||
            !password
        ) {
            return res.status(400).json({
                success: false,
                message: 'Missing inputs',
            });
        }

        // Check user
        const user = await UserModel.findOne({ email });
        if (user) {
            throw new Error('User has existed!');
        }

        // Role student
        req.body.roleId = 3;
        const response = await UserModel.create(req.body);
        return res.status(200).json({
            success: response ? true : false,
            message: response
                ? 'Created user successfully!'
                : 'Created user failed!',
        });
    });

    // [POST] /api/auth/login
    login = asyncHandler(async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Missing inputs',
            });
        }

        const user = await UserModel.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
        }

        const isCheckPass = await user.isCorrectPassword(password);
        if (!isCheckPass) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
        }

        const {
            password: userPassword,
            roleId,
            refreshToken,
            ...userFilter
        } = user.get({ plain: true });

        // Create accessToken
        const accessToken = generateAccessToken(userFilter.id, roleId);

        // Create refreshToken
        const newRefreshToken = generateRefreshToken(userFilter.id);

        // Save refreshToken to database
        await UserModel.update(
            { refreshToken: newRefreshToken },
            { where: { id: userFilter.id } }
        );

        // Save refreshToken to cookie
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true, // Only accessible via HTTP
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        return res.status(200).json({
            success: true,
            data: {
                accessToken,
                user: userFilter,
            },
        });
    });

    // [GET] /api/auth/current-user
    getCurrent = asyncHandler(async (req, res) => {
        const { id } = req.user;

        const user = await UserModel.findOne({
            where: { id },
            attributes: { exclude: ['refreshToken', 'password'] },
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        return res.status(200).json({
            success: true,
            data: user,
        });
    });

    // [POST] /api/auth/refreshToken
    refreshAccessToken = asyncHandler(async (req, res) => {
        const cookie = req.cookies;
        if (!cookie || !cookie.refreshToken) {
            return res.status(400).json({
                success: false,
                message: 'No refresh token in cookies',
            });
        }

        let result;
        try {
            result = jwt.verify(cookie.refreshToken, process.env.JWT_SECRET);
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'Invalid refresh token',
            });
        }

        const user = await UserModel.findOne({
            where: {
                id: result.id,
                refreshToken: cookie.refreshToken,
            },
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found or refresh token is invalid',
            });
        }

        const newRefreshToken = generateRefreshToken(user.id);

        await UserModel.update(
            { refreshToken: newRefreshToken },
            { where: { id: user.id } }
        );

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 day
        });

        return res.status(200).json({
            success: true,
            newAccessToken: generateAccessToken(user.id, user.roleId),
        });
    });

    // [GET] /api/auth/logout
    logout = asyncHandler(async (req, res) => {
        const { refreshToken } = req.cookies;
        if (!refreshToken) {
            return res.status(400).json({
                success: false,
                message: 'No refresh token in cookies',
            });
        }

        await UserModel.update(
            { refreshToken: '' },
            { where: { refreshToken } }
        );

        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
        });

        return res.status(200).json({
            success: true,
            message: 'Logout successfully',
        });
    });
}

export default new AuthController();
