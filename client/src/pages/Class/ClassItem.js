import clsx from 'clsx';

import style from './Class.module.scss';

import Menu from '~/components/Menu';

import {
    FaGear,
    FaArrowRight,
    FaPlus,
    FaPencil,
    FaRegTrashCan,
} from 'react-icons/fa6';

function ClassItem({ item }) {
    const MENU_ITEMS = [
        {
            icon: <FaPlus />,
            title: 'Thêm thành viên',
            to: `/create/${item.id}`,
        },
        {
            icon: <FaPencil />,
            title: 'Cập nhật lớp học',
            to: `/update/${item.id}`,
        },
        {
            icon: <FaRegTrashCan />,
            title: 'Xoá lớp học',
            to: `/delete/${item.id}`,
        },
    ];
    return (
        <div className={style.classItem}>
            <div className={clsx(style.classItem_top)}>
                <p className={style.classItem_title}>{item.name}</p>
                <Menu placement="bottom-start" items={MENU_ITEMS}>
                    <div className={style.classItem_action}>
                        <FaGear />
                    </div>
                </Menu>
            </div>
            <div className={clsx(style.classItem_body)}>
                <p>
                    <b>Môn:</b> {item.subject}
                </p>
                <p className={style.member}>
                    <b>Thành viên:</b> {item.member} người
                </p>
                <p className={style.note}>
                    <b>Ghi chú:</b> {item.note}
                </p>
                <div className={clsx(style.list_member)}>
                    <p>Thành viên</p>
                    <FaArrowRight />
                </div>
            </div>
        </div>
    );
}

export default ClassItem;
