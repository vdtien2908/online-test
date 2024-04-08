import clsx from 'clsx';
import { FaCheck, FaTriangleExclamation, FaCircleXmark } from 'react-icons/fa6';

import style from './Alert.module.scss';

function Alert({ message = 'Thành công', type = 'success' }) {
    let Icon = FaCheck;
    if (type === 'warning') {
        Icon = FaTriangleExclamation;
    } else if (type === 'error') {
        Icon = FaCircleXmark;
    }
    return (
        <div
            className={clsx(style.wrapper, {
                [style.success]: type === 'success',
                [style.warning]: type === 'warning',
                [style.error]: type === 'error',
            })}
        >
            <div className={clsx(style.icon)}>
                <Icon />
            </div>
            <div className={clsx(style.title)}>{message}</div>
        </div>
    );
}

export default Alert;
