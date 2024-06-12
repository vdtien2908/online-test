import clsx from 'clsx';
import { useEffect } from 'react';

import { FaCircleQuestion, FaUserGroup, FaBook } from 'react-icons/fa6';

// style css
import style from './Home.module.scss';

function Home() {
    useEffect(() => {
        document.title = 'Tổng quan';
    }, []);
    return (
        <div className={clsx(style.card)}>
            <div className={clsx(style.card_item)}>
                <div className={clsx(style.card_item__icon)}>
                    <FaBook />
                </div>
                <div className={clsx(style.card_item__desc)}>
                    <p className={clsx(style.desc_name)}>Môn học</p>
                    <p className={clsx(style.desc_total)}>0</p>
                </div>
            </div>
            <div className={style.card_item}>
                <div className={clsx(style.card_item__icon)}>
                    <i className="fa-solid fa-user">
                        <FaCircleQuestion />
                    </i>
                </div>
                <div className={clsx(style.card_item__desc)}>
                    <p className={clsx(style.desc_name)}>Câu hỏi</p>
                    <p className={clsx(style.desc_total)}>0</p>
                </div>
            </div>
            <div className={style.card_item}>
                <div className={clsx(style.card_item__icon)}>
                    <FaUserGroup />
                </div>
                <div className={clsx(style.card_item__desc)}>
                    <p className={clsx(style.desc_name)}>Sinh viên</p>
                    <p className={clsx(style.desc_total)}>0</p>
                </div>
            </div>
        </div>
    );
}

export default Home;
