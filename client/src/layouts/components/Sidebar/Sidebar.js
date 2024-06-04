import clsx from 'clsx';
import { FaChartBar } from 'react-icons/fa';
import {
    FaCircleQuestion,
    FaUserGroup,
    FaBook,
    FaPersonHarassing,
    FaRegFileLines,
} from 'react-icons/fa6';
import { BiDetail } from 'react-icons/bi';
import { Fragment } from 'react';

import Menu from './Menu';
import { MenuItem } from './Menu';
import config from '~/configs';

import style from './Sidebar.module.scss';

const dataSidebar = [
    {
        title: 'Tổng quan',
        path: config.routes.dashboard.index,
        icon: <FaChartBar />,
    },
    {
        title: 'Lớp học phần',
        path: config.routes.class.index,
        icon: <BiDetail />,
        tag: 'Học phần',
    },
    {
        title: 'Môn học',
        path: config.routes.subject.index,
        icon: <FaBook />,
        tag: 'Học phần',
    },
    {
        title: 'Câu hỏi',
        path: config.routes.question.index,
        icon: <FaCircleQuestion />,
        tag: 'Kiểm tra',
    },
    {
        title: 'Đề kiểm tra',
        path: config.routes.test.index,
        icon: <FaRegFileLines />,
        tag: 'Kiểm tra',
    },
    {
        title: 'Phân công',
        path: config.routes.assignment.index,
        icon: <FaPersonHarassing />,
        tag: 'Quản trị',
    },
    {
        title: 'Người dùng',
        path: config.routes.user.index,
        icon: <FaUserGroup />,
        tag: 'Quản trị',
    },
];

function Sidebar({ isActive }) {
    let currentTag = '';
    return (
        <div className={clsx(style.sidebar, { [style.active]: isActive })}>
            {/* Menu */}
            <Menu isActive={isActive}>
                {dataSidebar.map((item, index) => {
                    if (item.tag && currentTag !== item.tag) {
                        currentTag = item.tag;
                        return (
                            <Fragment key={index}>
                                <span className={clsx(style.tag)}>
                                    <b>{currentTag}</b>
                                </span>
                                <MenuItem
                                    title={item.title}
                                    path={item.path}
                                    icon={item.icon}
                                />
                            </Fragment>
                        );
                    } else if (!item.tag) {
                        // Nếu không có tag, hiển thị mục mặc định
                        return (
                            <MenuItem
                                key={index}
                                title={item.title}
                                path={item.path}
                                icon={item.icon}
                            />
                        );
                    } else {
                        return (
                            <MenuItem
                                key={index}
                                title={item.title}
                                path={item.path}
                                icon={item.icon}
                            />
                        );
                    }
                })}
            </Menu>
            {/* /Menu */}
        </div>
    );
}

export default Sidebar;
