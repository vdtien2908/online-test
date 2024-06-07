import express from 'express';

import ClassController from '../app/http/controllers/ClassController';

const router = express.Router();

router.get('/', ClassController.index);
router.post('/', ClassController.store);
router.get('/:id', ClassController.show);
router.put('/:id', ClassController.update);
router.delete('/:id', ClassController.delete);
router.post('/addStudent/:id', ClassController.addStudent);
router.delete('/deleteStudent', ClassController.addStudent);
router.get('/getUserByClassId/:id', ClassController.getUserByClassId);
router.get('/getUserNotCLass/:id', ClassController.getUserNotClassId);

export default router;
