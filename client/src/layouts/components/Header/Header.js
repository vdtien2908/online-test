import { Link } from 'react-router-dom';
import {
    FaBars,
    FaEllipsisV,
    FaCogs,
    FaKey,
    FaSignInAlt,
} from 'react-icons/fa';
import clsx from 'clsx';

// Style css
import style from './Header.module.scss';

// Component
import Tooltip from '~/components/Tooltip';
import Image from '~/components/Image';
import Menu from '~/components/Menu';

function Header({ onClick }) {
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
            to: '/demo',
        },
    ];
    return (
        <div className={clsx(style.header)}>
            <div className={clsx(style.headerLeft)}>
                {/* Logo */}
                <div className={clsx(style.headerLogo)}>
                    <Link to="/">
                        Online
                        <sup style={{ fontSize: 14 }}>TEST</sup>
                    </Link>
                </div>
                {/* /Logo */}

                {/* Toggle sidebar button */}
                <Tooltip content="Thu gọn">
                    <span
                        onClick={onClick}
                        className={clsx(style.toggleSidebar)}
                    >
                        <FaBars />
                    </span>
                </Tooltip>
                {/* /Toggle sidebar button */}
            </div>
            <div className={clsx(style.headerRight)}>
                <Menu items={MENU_ITEMS}>
                    <div className={clsx(style.avatar)}>
                        <Image
                            src="abc"
                            className={style.avatar_img}
                            alt="Avatar"
                        />
                        <p>Admin</p>
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
