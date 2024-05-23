import express from 'express';

import AuthController from '../app/http/controllers/AuthController';

const route = express.Router();

route.get('/', AuthController.index);

export default route;
