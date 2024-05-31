import express from 'express';

import AssignmentController from '../app/http/controllers/AssignmentController';

const router = express.Router();

router.post('/', AssignmentController.store);
router.delete('/:id', AssignmentController.delete);

export default router;
