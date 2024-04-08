import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

import style from './Menu.module.scss';

function MenuItem({ title, path, icon, isActive }) {
    return (
        <NavLink
            to={path}
            className={(nav) =>
                clsx(style.menuItem, {
                    [style.active]: nav.isActive,
                })
            }
        >
            <span className={clsx(style.icon)}>{icon}</span>
            <span className={clsx(style.title)}>{title}</span>
        </NavLink>
    );
}

export default MenuItem;
