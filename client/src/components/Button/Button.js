import clsx from 'clsx';
import { Link } from 'react-router-dom';

// Style css
import style from './Button.module.scss';

function Button({
    to,
    href,
    primary,
    outline,
    edit,
    trash,
    destroy,
    onClick,
    children,
    leftIcon,
    rightIcon,
    className,
    ...passProps
}) {
    let Comp = 'button';
    const _props = {
        onClick,
        ...passProps,
    };

    if (to) {
        _props.to = to;
        Comp = Link;
    } else if (href) {
        _props.href = href;
        Comp = 'a';
    }

    const classes = clsx(
        style.wrapper,
        {
            [style.primary]: primary,
            [style.outline]: outline,
            [style.edit]: edit,
            [style.delete]: trash,
            // [style.submit]: submit,
            [style.destroy]: destroy,
        },
        className
    );

    return (
        <Comp className={classes} {..._props}>
            {leftIcon && <span className={clsx(style.icon)}>{leftIcon}</span>}
            {children && <span>{children}</span>}
            {rightIcon && <span className={clsx(style.icon)}>{rightIcon}</span>}
        </Comp>
    );
}

export default Button;
