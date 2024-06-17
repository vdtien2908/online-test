import clsx from 'clsx';
import { useEffect, useState } from 'react';

import { FaCircleQuestion, FaUserGroup, FaBook } from 'react-icons/fa6';

// style css
import style from './Home.module.scss';

// hooks
import { useAxiosWithAuth } from '~/hooks';

// Component
import Loading from '~/components/Loading';

const baseUrl = process.env.REACT_APP_BASE_URL;

function Home() {
    const axios = useAxiosWithAuth();
    const [loading, setLoading] = useState(false);

    const [subjects, setSubjects] = useState(0);
    const [questions, setQuestions] = useState(0);
    const [students, setStudents] = useState(0);
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const subjects = await axios.get(`${baseUrl}/api/subjects`);
                const questions = await axios.get(`${baseUrl}/api/questions`);
                const students = await axios.get(
                    `${baseUrl}/api/users?roleId=2`
                );
                setLoading(false);
                setQuestions(questions.data.data.length);
                setStudents(students.data.data.length);
                setSubjects(subjects.data.data.length);
            } catch (error) {
                console.error(error);
            }
        })();

        document.title = 'Tổng quan';
    }, [axios]);
    return (
        <>
            {loading && (
                <div className="loading-container">
                    <Loading />
                </div>
            )}

            {!loading && (
                <div className={clsx(style.card)}>
                    <div className={clsx(style.card_item)}>
                        <div className={clsx(style.card_item__icon)}>
                            <FaBook />
                        </div>
                        <div className={clsx(style.card_item__desc)}>
                            <p className={clsx(style.desc_name)}>Môn học</p>
                            <p className={clsx(style.desc_total)}>{subjects}</p>
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
                            <p className={clsx(style.desc_total)}>
                                {questions}
                            </p>
                        </div>
                    </div>
                    <div className={style.card_item}>
                        <div className={clsx(style.card_item__icon)}>
                            <FaUserGroup />
                        </div>
                        <div className={clsx(style.card_item__desc)}>
                            <p className={clsx(style.desc_name)}>Sinh viên</p>
                            <p className={clsx(style.desc_total)}>{students}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Home;
