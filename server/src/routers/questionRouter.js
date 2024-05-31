import express from 'express';

import QuestionController from '../app/http/controllers/QuestionController';

const router = express.Router();

router.get('/', QuestionController.index);
router.post('/', QuestionController.store);
router.get('/:id', QuestionController.show);
router.put('/:id', QuestionController.update);
router.delete('/:id', QuestionController.delete);

export default router;
