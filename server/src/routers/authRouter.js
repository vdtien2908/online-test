import express from 'express';

import AuthController from '../app/http/controllers/AuthController';

const route = express.Router();

route.post('/register', AuthController.register);

export default route;
