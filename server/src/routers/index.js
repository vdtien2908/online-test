import { errHandler, notFound } from '../app/http/middlewares/errHandler';

import authRouter from './authRouter';

function initRoutes(app) {
    // Router authentication
    app.use('/api/auth', authRouter);

    app.use('/api/user', (req, res) => {
        console.log(123);
    });

    // Handle error
    app.use(notFound);
    app.use(errHandler);
}

export default initRoutes;
