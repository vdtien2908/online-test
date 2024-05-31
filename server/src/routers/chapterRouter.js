import express from 'express';

import ChapterController from '../app/http/controllers/ChapterController';

const router = express.Router();

router.get('/', ChapterController.index);
router.post('/', ChapterController.store);
router.get('/:id', ChapterController.show);
router.put('/:id', ChapterController.update);
router.delete('/:id', ChapterController.delete);

export default router;
