import express from 'express';

import AssignmentController from '../app/http/controllers/AssignmentController';

const router = express.Router();

router.get('/', AssignmentController.index);
router.get(
    '/getUserNotAssignBySubjectId/:id',
    AssignmentController.getUserBySubjectId
);
router.post('/', AssignmentController.store);
router.delete('/', AssignmentController.delete);

export default router;
