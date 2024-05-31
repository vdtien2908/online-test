import { errHandler, notFound } from '../app/http/middlewares/errHandler';
import { verifyAccessToken } from '../app/http/middlewares/verifyToken';

import authRouter from './authRouter';
import classRouter from './classRouter';
import subjectRouter from './subjectRouter';

function initRoutes(app) {
    // Router authentication
    app.use('/api/auth', authRouter);
    app.use('/api/class', verifyAccessToken, classRouter);
    app.use('/api/subjects', verifyAccessToken, subjectRouter);

    // Handle error
    app.use(notFound);
    app.use(errHandler);
}

export default initRoutes;
