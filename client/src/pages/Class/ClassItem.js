import clsx from 'clsx';

import style from './Class.module.scss';

import { useState } from 'react';

import Menu from '~/components/Menu';
import Tooltip from '~/components/Tooltip';

import { FaGear, FaArrowRight, FaPencil, FaRegTrashCan } from 'react-icons/fa6';

function ClassItem({ item, onClickEdit, onClickDelete, onClickStudents }) {
    const [user, setUser] = useState(() => {
        return JSON.parse(localStorage.getItem('user'));
    });
    const MENU_ITEMS = [
        {
            icon: <FaPencil />,
            title: 'Cập nhật lớp học',
            onClick: () => onClickEdit(item.id),
        },
        {
            icon: <FaRegTrashCan />,
            title: 'Xoá lớp học',
            onClick: () => onClickDelete(item.id),
        },
    ];
    return (
        <div className={style.classItem}>
            <div className={clsx(style.classItem_top)}>
                <p className={style.classItem_title}>{item.className}</p>
                {user.RoleModel.id !== 2 && (
                    <Menu items={MENU_ITEMS} placement="bottom-end" offset>
                        <div className={style.classItem_action}>
                            <FaGear />
                        </div>
                    </Menu>
                )}
            </div>
            <div className={clsx(style.classItem_body)}>
                <p>
                    <b>Môn:</b> {item.SubjectModel.subjectName}
                </p>
                <p className={clsx(style.member)}>
                    <b>Thành viên:</b> {item.totalMember} người
                </p>
                <p className={clsx(style.note)}>
                    <Tooltip content={item.note}>
                        <span>
                            <b>Ghi chú:</b> {item.note}
                        </span>
                    </Tooltip>
                </p>
                <p className={clsx(style.code)}>
                    <b>Mã mời:</b> {item.invitationCode}
                </p>
                {user.RoleModel.id !== 2 && (
                    <div
                        className={clsx(style.list_member)}
                        onClick={() => onClickStudents(item.id)}
                    >
                        <p>Danh sách sinh viên</p>
                        <FaArrowRight />
                    </div>
                )}
            </div>
        </div>
    );
}

export default ClassItem;
