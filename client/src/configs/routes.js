const routes = {
    dashboard: { index: '/' },
    group: {
        index: '/group',
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
