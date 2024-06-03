const routes = {
    dashboard: { index: '/dashboard' },
    class: {
        index: '/class',
        create: 'create',
        update: 'update/:id',
        delete: 'delete/:id',
    },
    subject: {
        index: '/subject',
        create: 'create',
        update: 'update/:id',
        delete: 'delete/:id',
        chapter: 'chapter/:id',
    },
    question: {
        index: '/question',
        create: 'create',
        update: 'update/:id',
        delete: 'delete/:id',
    },
    test: {
        index: '/test',
    },
    takeATest: {
        index: '/take-a-test/:id',
    },
    assignment: {
        index: '/assignment',
    },
    user: {
        index: '/user',
    },
    role: {
        index: '/role',
    },
    login: {
        index: '/login',
    },
    about: {
        index: '/',
    },
};

export default routes;
