import express from 'express';

import ClassController from '../app/http/controllers/ClassController';

const router = express.Router();

router.get('/', ClassController.index);
router.post('/', ClassController.store);
router.get('/:id', ClassController.show);
router.put('/:id', ClassController.update);
router.delete('/:id', ClassController.delete);

export default router;
