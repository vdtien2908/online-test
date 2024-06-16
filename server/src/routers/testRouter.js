import express from 'express';

import TestController from '../app/http/controllers/TestController';

const router = express.Router();

router.get('/', TestController.index);
router.post('/', TestController.store);
router.get('/:id', TestController.show);
router.put('/:id', TestController.update);
router.delete('/:id', TestController.delete);

export default router;
