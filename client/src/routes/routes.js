// Page
import Dashboard from '~/pages/Home';
import { Class } from '~/pages/Class';
import { Assignment } from '~/pages/Assignment';
import { Question } from '~/pages/Question';
import { Role } from '~/pages/Role';
import { Subject, Chapter } from '~/pages/Subject';
import { Test } from '~/pages/Test';
import { User } from '~/pages/User';
import { TakeATest } from '~/pages/TakeATest';
import About from '~/pages/About';
import Login from '~/pages/Login';
import EmptyLayout from '~/layouts/EmptyLayout';
// Config
import config from '~/configs';
const routes = config.routes;

const privateRoutes = [
    {
        path: routes.dashboard.index,
        component: Dashboard,
    },
    {
        path: routes.class.index,
        component: Class,
    },
    {
        path: routes.subject.index,
        component: Subject,
    },
    {
        path: routes.question.index,
        component: Question,
    },
    {
        path: routes.test.index,
        component: Test,
    },
    {
        path: routes.takeATest.index,
        component: TakeATest,
        layout: EmptyLayout,
    },
    {
        path: routes.assignment.index,
        component: Assignment,
    },
    {
        path: routes.user.index,
        component: User,
    },
    {
        path: routes.role.index,
        component: Role,
    },
];

const publicRoutes = [
    {
        path: routes.login.index,
        component: Login,
        layout: EmptyLayout,
    },
    {
        path: routes.about.index,
        component: About,
        layout: EmptyLayout,
    },
];

export { privateRoutes, publicRoutes };
