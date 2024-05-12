const routes = {
    dashboard: { index: '/' },
    class: {
        index: '/class',
        add: 'create',
        update: 'update/:id',
        delete: 'delete/:id',
    },
    subject: {
        index: '/subject',
        add: 'create',
        update: 'update/:id',
        delete: 'delete/:id',
    },
    question: {
        index: '/question',
        add: 'create',
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
};

export default routes;
