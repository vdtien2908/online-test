import { errHandler, notFound } from '../app/http/middlewares/errHandler';
import { verifyAccessToken } from '../app/http/middlewares/verifyToken';

import authRouter from './authRouter';
import classRouter from './classRouter';
import subjectRouter from './subjectRouter';
import chapterRouter from './chapterRouter';
import questionRouter from './questionRouter';
import answerRouter from './answerRouter';
import assignmentRouter from './assignmentRouter';
import userRouter from './userRouter';

function initRoutes(app) {
    // Router authentication
    app.use('/api/auth', authRouter);
    app.use('/api/class', verifyAccessToken, classRouter);
    app.use('/api/subjects', verifyAccessToken, subjectRouter);
    app.use('/api/chapters', verifyAccessToken, chapterRouter);
    app.use('/api/questions', verifyAccessToken, questionRouter);
    app.use('/api/answers', verifyAccessToken, answerRouter);
    app.use('/api/assignments', verifyAccessToken, assignmentRouter);
    app.use('/api/users', verifyAccessToken, userRouter);

    // Handle error
    app.use(notFound);
    app.use(errHandler);
}

export default initRoutes;
