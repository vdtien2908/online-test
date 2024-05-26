import asyncHandler from 'express-async-handler';
import { UserModel } from '../../models';

class AuthController {
    // [POST] /api/auth/register
    register = asyncHandler((req, res) => {});
}

export default new AuthController();
