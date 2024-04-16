import clsx from 'clsx';

import style from './Class.module.scss';
import ClassItem from './ClassItem';

function Module({ data }) {
    const dataDemo = [
        {
            id: 1,
            name: 'Lớp KTPM-0220',
            member: 20,
            note: 'Học sáng 2, sáng 3',
            subject: 'Đại số tuyến tính',
        },
        {
            id: 2,
            name: 'Lớp KTPM-0220',
            member: 20,
            note: 'Học sáng 2, sáng 3',
            subject: 'Khoa học máy tính',
        },
        {
            id: 3,
            name: 'Lớp KTPM-0220',
            member: 20,
            note: 'Trí tuyệ nhân tạo',
            subject: 'Đại số tuyến tính',
        },
        {
            id: 4,
            name: 'Lớp KTPM-0220',
            member: 20,
            note: 'Học sáng 2, sáng 3',
            subject: 'Đại số tuyến tính',
        },
        {
            id: 5,
            name: 'Lớp KTPM-0220',
            member: 20,
            note: 'Giải tích 1',
            subject: 'Đại số tuyến tính',
        },
        {
            id: 4,
            name: 'Lớp KTPM-0220',
            member: 20,
            note: 'Học sáng 2, sáng 3',
            subject: 'Đại số tuyến tính',
        },
        {
            id: 5,
            name: 'Lớp KTPM-0220',
            member: 20,
            note: 'Giải tích 1',
            subject: 'Đại số tuyến tính',
        },
        {
            id: 4,
            name: 'Lớp KTPM-0220',
            member: 20,
            note: 'Học sáng 2, sáng 3',
            subject: 'Đại số tuyến tính',
        },
        {
            id: 5,
            name: 'Lớp KTPM-0220',
            member: 20,
            note: 'Giải tích 1',
            subject: 'Đại số tuyến tính',
        },
        {
            id: 4,
            name: 'Lớp KTPM-0220',
            member: 20,
            note: 'Học sáng 2, sáng 3',
            subject: 'Đại số tuyến tính',
        },
        {
            id: 5,
            name: 'Lớp KTPM-0220',
            member: 20,
            note: 'Giải tích 1',
            subject: 'Đại số tuyến tính',
        },
    ];

    return (
        <div className={clsx(style.module)}>
            <div className={style.module_body}>
                {dataDemo.map((item, key) => (
                    <ClassItem item={item} key={key} />
                ))}
            </div>
        </div>
    );
}

export default Module;
