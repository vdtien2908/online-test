import express from 'express';

import SubjectController from '../app/http/controllers/SubjectController';

const router = express.Router();

router.get('/', SubjectController.index);
router.post('/', SubjectController.store);
router.get('/:id', SubjectController.show);
router.put('/:id', SubjectController.update);
router.delete('/:id', SubjectController.delete);

export default router;
