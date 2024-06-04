import clsx from 'clsx';

import style from './Class.module.scss';
import ClassItem from './ClassItem';

function Module({ data }) {
    return (
        <div className={clsx(style.module)}>
            <div className={style.module_body}>
                {data.map((item, key) => (
                    <ClassItem item={item} key={key} />
                ))}
            </div>
        </div>
    );
}

export default Module;
