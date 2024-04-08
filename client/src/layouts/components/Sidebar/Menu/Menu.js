import clsx from 'clsx';
import style from './Menu.module.scss';
function Menu({ children, isActive }) {
    const classes = clsx(style.menu, { [style.isActive]: isActive });

    return <div className={classes}>{children}</div>;
}

export default Menu;
