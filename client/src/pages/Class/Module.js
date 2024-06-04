import clsx from 'clsx';

import style from './Class.module.scss';
import ClassItem from './ClassItem';

function Module({ data, onClickAddUser, onClickEdit, onClickDelete }) {
    return (
        <div className={clsx(style.module)}>
            {data.length === 0 && (
                <h2 className="empty-data">Không có dữ liệu hiển thị.</h2>
            )}
            {data.length > 0 && (
                <div className={style.module_body}>
                    {data.map((item, key) => (
                        <ClassItem
                            item={item}
                            key={key}
                            onClickAddUser={onClickAddUser}
                            onClickEdit={onClickEdit}
                            onClickDelete={onClickDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Module;
