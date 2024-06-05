import express from 'express';

const router = express.Router();

import UserController from '../app/http/controllers/UserController';

router.get('/', UserController.index);
router.post('/', UserController.store);
router.get('/:id', UserController.show);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete);

export default router;
