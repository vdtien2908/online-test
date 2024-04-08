import { Link } from 'react-router-dom';
import {
    FaBars,
    FaEllipsisV,
    FaCogs,
    FaKey,
    FaSignInAlt,
} from 'react-icons/fa';
import clsx from 'clsx';
import Tippy from '@tippyjs/react/headless'; // different import path!
import 'tippy.js/dist/tippy.css'; // optional

// Style css
import style from './Header.module.scss';

// Component
import Tooltip from '~/components/Tooltip';
import Image from '~/components/Image';

function Header({ onClick }) {
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
                <Tooltip content="Thu gọn thanh menu">
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
                <Tippy
                    interactive
                    tabIndex="-1"
                    render={(attrs) => (
                        <div className={style.menu_user}>
                            <ul>
                                <li>
                                    <Link>
                                        <FaCogs />
                                        <span>Thông tin tài khoản</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link>
                                        <FaKey />
                                        <span>Đổi mật khẩu</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link>
                                        <FaSignInAlt />
                                        <span>Đăng xuất</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}
                >
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
                </Tippy>
            </div>
            {/* /Bars */}
        </div>
    );
}

export default Header;
