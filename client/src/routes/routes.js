// Page
import Dashboard from '~/pages/Home';
import { Class } from '~/pages/Class';
import { Assignment } from '~/pages/Assignment';
import { Question } from '~/pages/Question';
import { Role } from '~/pages/Role';
import { Subject } from '~/pages/Subject';
import { Test } from '~/pages/Test';
import { User } from '~/pages/User';
import { TakeATest } from '~/pages/TakeATest';
import Login from '~/pages/Login';
import EmptyLayout from '~/layouts/EmptyLayout';
// Config
import config from '~/configs';

const privateRoutes = [
    {
        path: config.routes.dashboard.index,
        component: Dashboard,
    },
    {
        path: config.routes.class.index,
        component: Class,
    },
    {
        path: config.routes.subject.index,
        component: Subject,
    },
    {
        path: config.routes.question.index,
        component: Question,
    },
    {
        path: config.routes.test.index,
        component: Test,
    },
    {
        path: config.routes.takeATest.index,
        component: TakeATest,
        layout: EmptyLayout,
    },
    {
        path: config.routes.assignment.index,
        component: Assignment,
    },
    {
        path: config.routes.user.index,
        component: User,
    },
    {
        path: config.routes.role.index,
        component: Role,
    },
    {
        path: config.routes.login.index,
        component: Login,
        layout: null,
    },
];

const publicRoutes = [];

export { privateRoutes, publicRoutes };
