import clsx from 'clsx';
import { FaXmark } from 'react-icons/fa6';

// Style css
import style from './Modal.module.scss';

function Modal({
    title,
    width = 400,
    height = 200,
    overLayClick,
    closeClick,
    children,
}) {
    return (
        <div className={clsx(style.wrapper)}>
            {/* Content */}
            <div
                className={clsx(style.content)}
                style={{ minWidth: width, minHeight: height }}
            >
                <span className={clsx(style.close_btn)} onClick={closeClick}>
                    <FaXmark />
                </span>
                <h1 className={clsx(style.title)}>{title}</h1>
                {children}
            </div>

            {/* Overlay */}
            <div className={clsx(style.overlay)} onClick={overLayClick}></div>
        </div>
    );
}

export default Modal;
