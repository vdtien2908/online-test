import clsx from 'clsx';
import style from './Loading.module.scss';

function Loading({ small }) {
    return (
        <div className={clsx(style.loading, { [style.small]: small })}></div>
    );
}

export default Loading;
