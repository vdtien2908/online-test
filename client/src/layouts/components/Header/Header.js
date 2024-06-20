import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Avatar } from 'primereact/avatar';
import { FaEllipsisV, FaCogs, FaKey, FaSignInAlt } from 'react-icons/fa';
import clsx from 'clsx';

// React prime
import { InputSwitch } from 'primereact/inputswitch';

import config from '~/configs';

// Style css
import style from './Header.module.scss';

// Component
import Tooltip from '~/components/Tooltip';
import Menu from '~/components/Menu';

// util
import * as request from '~/utils/httpRequest';

function Header({ onClick }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [checked, setChecked] = useState(false);

    const [user, setUser] = useState(() => {
        const userData = localStorage.getItem('user');
        return userData ? JSON.parse(userData) : null;
    });

    const getFirstCharOfLastWord = (fullName) => {
        const words = fullName.trim().split(' ');
        const lastWord = words[words.length - 1];
        return lastWord.charAt(0).toUpperCase();
    };

    const MENU_ITEMS = [
        {
            icon: <FaCogs />,
            title: 'Thông tin tài khoản',
            to: '/demo',
        },
        {
            icon: <FaKey />,
            title: 'Đổi mật khẩu',
            to: '/demo',
        },
        {
            icon: <FaSignInAlt />,
            title: 'Đăng xuất',
            onClick: async () => {
                try {
                    await request.get('/api/auth/logout');
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('user');
                    navigate('/login');
                } catch (error) {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('user');
                    navigate('/login');
                }
            },
        },
    ];

    useEffect(() => {
        const fetchApi = async () => {
            setUser(JSON.parse(localStorage.getItem('user')));
        };

        fetchApi();
    }, [location]);

    return (
        <div className={clsx(style.header)}>
            <div className={clsx(style.headerLeft)}>
                {/* Logo */}
                <div className={clsx(style.headerLogo)}>
                    <Link to={config.routes.dashboard.index}>
                        Online
                        <sup style={{ fontSize: 14 }}>TEST</sup>
                    </Link>
                </div>
                {/* /Logo */}

                {/* Toggle sidebar button */}
                <Tooltip content={'Thu/mở sidebar'}>
                    <div style={{ lineHeight: 0 }}>
                        <InputSwitch
                            checked={checked}
                            onChange={(e) => setChecked(e.value)}
                            onClick={onClick}
                        />
                    </div>
                </Tooltip>

                {/* /Toggle sidebar button */}
            </div>
            <div className={clsx(style.headerRight)}>
                <Menu items={MENU_ITEMS}>
                    <div className={clsx(style.avatar)}>
                        <Avatar
                            label={
                                user
                                    ? getFirstCharOfLastWord(user.fullName)
                                    : 'A'
                            }
                            style={{
                                backgroundColor: '#2196F3',
                                color: '#ffffff',
                            }}
                            shape="circle"
                        />
                        <p>{user?.fullName || 'Admin'}</p>
                        <span>
                            <FaEllipsisV />
                        </span>
                    </div>
                </Menu>
            </div>
            {/* /Bars */}
        </div>
    );
}

export default Header;
