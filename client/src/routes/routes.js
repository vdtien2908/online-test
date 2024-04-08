// Page
import Dashboard from '~/pages/Home';
import { Group } from '~/pages/Group';
import { Assignment } from '~/pages/Assignment';
import { Question } from '~/pages/Question';
import { Role } from '~/pages/Role';
import { Subject } from '~/pages/Subject';
import { Test } from '~/pages/Test';
import { User } from '~/pages/User';
import Login from '~/pages/Login';

// Config
import config from '~/configs';

const privateRoutes = [
    {
        path: config.routes.dashboard.index,
        component: Dashboard,
    },
    {
        path: config.routes.group.index,
        component: Group,
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
