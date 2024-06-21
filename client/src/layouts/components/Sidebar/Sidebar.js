import clsx from 'clsx';
import { FaChartBar } from 'react-icons/fa';
import { useState, useEffect } from 'react';
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

function Sidebar({ isActive }) {
    const [user, setUser] = useState(() => {
        return JSON.parse(localStorage.getItem('user'));
    });

    return (
        <div className={clsx(style.sidebar, { [style.active]: isActive })}>
            {/* Menu */}
            <Menu isActive={isActive}>
                <Fragment>
                    {user.RoleModel.id === 1 && (
                        <MenuItem
                            title="Tổng quan"
                            path={config.routes.dashboard.index}
                            icon={<FaChartBar />}
                        />
                    )}
                    <span className={clsx(style.tag)}>
                        <b>Môn học</b>
                    </span>
                    <MenuItem
                        title="Lớp học phần"
                        path={config.routes.class.index}
                        icon={<BiDetail />}
                        tag="Học phần"
                    />
                    {user.RoleModel.id !== 2 && (
                        <MenuItem
                            title="Môn học"
                            path={config.routes.subject.index}
                            icon={<FaBook />}
                            tag="Học phần"
                        />
                    )}
                    <span className={clsx(style.tag)}>
                        <b>Kiểm tra</b>
                    </span>
                    {user.RoleModel.id !== 2 && (
                        <MenuItem
                            title="Câu hỏi"
                            path={config.routes.question.index}
                            icon={<FaCircleQuestion />}
                            tag="Kiểm tra"
                        />
                    )}
                    <MenuItem
                        title="Đề kiểm tra"
                        path={config.routes.test.index}
                        icon={<FaRegFileLines />}
                        tag="Kiểm tra"
                    />
                    {user.RoleModel.id === 1 && (
                        <>
                            <span className={clsx(style.tag)}>
                                <b>Quản trị</b>
                            </span>
                            <MenuItem
                                title="Phân công"
                                path={config.routes.assignment.index}
                                icon={<FaPersonHarassing />}
                                tag="Quản trị"
                            />
                            <MenuItem
                                title="Người dùng"
                                path={config.routes.user.index}
                                icon={<FaUserGroup />}
                                tag="Quản trị"
                            />
                        </>
                    )}
                </Fragment>
            </Menu>
            {/* /Menu */}
        </div>
    );
}

export default Sidebar;
