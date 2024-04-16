import clsx from 'clsx';

// Styler css
import style from './Wrapper.module.scss';

function wrapper({ children }) {
    return <div className={clsx(style.wrapper)}>{children}</div>;
}

export default wrapper;
