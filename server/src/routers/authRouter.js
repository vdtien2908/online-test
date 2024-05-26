import express from 'express';

import AuthController from '../app/http/controllers/AuthController';
import { verifyAccessToken } from '../app/http/middlewares/verifyToken';

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/current-user', verifyAccessToken, AuthController.getCurrent);
router.post('/refreshToken', AuthController.refreshAccessToken);
router.get('/logout', AuthController.logout);

export default router;
