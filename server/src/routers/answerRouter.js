import express from 'express';

import AnswerController from '../app/http/controllers/AnswerController';

const router = express.Router();

router.get('/', AnswerController.index);
router.post('/', AnswerController.store);
router.get('/:id', AnswerController.show);
router.put('/:id', AnswerController.update);
router.delete('/:id', AnswerController.delete);

export default router;
