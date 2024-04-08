import clsx from 'clsx';
import { Link } from 'react-router-dom';

// Style css
import style from './Button.module.scss';

function Button({
    to,
    href,
    primary,
    outline,
    submit,
    edit,
    trash,
    destroy,
    onClick,
    children,
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

    const classes = clsx(style.wrapper, {
        [style.primary]: primary,
        [style.outline]: outline,
        [style.edit]: edit,
        [style.delete]: trash,
        [style.submit]: submit,
        [style.destroy]: destroy,
    });

    return (
        <Comp className={classes} {..._props}>
            <span>{children}</span>
        </Comp>
    );
}

export default Button;
