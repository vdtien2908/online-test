import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';
import {
    FaPowerOff,
    FaFilePen,
    FaStopwatch,
    FaCircleExclamation,
} from 'react-icons/fa6';
import { RadioButton } from 'primereact/radiobutton';
import { Dialog } from 'primereact/dialog';
import { useParams } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import style from './TakeATest.module.scss';
import Button from '~/components/Button';
import Loading from '~/components/Loading';

// Hooks
import { useAxiosWithAuth } from '~/hooks';

const baseUrl = process.env.REACT_APP_BASE_URL;

function TakeATest() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [currentTime, setCurrentTime] = useState(undefined);
    const [user, setUser] = useState({});
    const [visibleCancel, setVisibleCancel] = useState(false);
    const [visibleSubmit, setVisibleSubmit] = useState(false);
    const axios = useAxiosWithAuth();
    let { id } = useParams();
    const toastRef = useRef(null);
    const [questions, setQuestions] = useState([]);
    const [test, setTest] = useState({});
    const [timeLeft, setTimeLeft] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    const init = async () => {
        try {
            setLoading(true);
            const reqUser = await axios.get(`${baseUrl}/api/auth/current-user`);
            const req = await axios.get(`${baseUrl}/api/tests/${id}`);
            setLoading(false);
            setUser(reqUser.data.data);
            const testData = req.data.data;
            setQuestions(testData.questions);
            setTest(testData.tests[0]);
            setTimeLeft(testData.tests[0].examTime * 60);
            setSelectedAnswers(Array(testData.questions.length).fill(null));
        } catch (error) {
            toastMessage('error', 'Lỗi', error.response.data.message);
        }
    };

    useEffect(() => {
        init();
        setCurrentTime(new Date());
    }, []);

    const questionRefs = useRef([]);

    const handleAnswerChange = (questionIndex, answerKey, isAnswer) => {
        const updatedAnswers = [...selectedAnswers];
        updatedAnswers[questionIndex] = {
            questionId: questions[questionIndex].id,
            answerId: answerKey,
            isAnswer,
        };
        setSelectedAnswers(updatedAnswers);
    };

    const scrollToQuestion = (index) => {
        const element = questionRefs.current[index];
        const topOffset = 70 + 20; // Height topbar + padding
        const yPosition =
            element.getBoundingClientRect().top +
            window.pageYOffset -
            topOffset;
        window.scrollTo({ top: yPosition, behavior: 'smooth' });
    };

    const optionAnswers = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    const handleSubmit = () => {
        setVisibleSubmit(false);

        const questionCorrect = selectedAnswers.filter(
            (obj) => obj?.isAnswer === true
        );
        const numberCorrect = questionCorrect.length;
        const resultTest = selectedAnswers
            .filter((obj) => obj !== null)
            .map((obj) => ({
                question: obj.questionId,
                answerId: obj.answerId,
            }));

        if (resultTest.length !== questions.length) {
            toastMessage(
                'warn',
                'Cảnh báo',
                'Bạn còn câu hỏi chưa chọn đáp án.'
            );
            return;
        }

        const totalQuestion =
            test.numberOfBasicQuestion +
            test.numberOfEasyQuestion +
            test.numberOfDifficultQuestion;
        const testScore = (numberCorrect / totalQuestion) * 10;

        (async () => {
            try {
                setLoading(true);
                await axios.post(`${baseUrl}/api/tests/submit/${test.id}`, {
                    testScore,
                    numberOfCorrectAnswer: numberCorrect,
                    resultTest,
                    examTime: timeLeft,
                    testTime: currentTime,
                });
                setLoading(false);
                toastMessage('success', 'Thành công', 'Nộp bài thành công');
                setTimeout(() => {
                    navigate('/test');
                }, 1000);
            } catch (error) {
                toastMessage('error', 'Lỗi', error?.response?.data?.message);
            }
        })();
    };

    const handleCancel = () => {
        setVisibleCancel(false);
        const questionCorrect = selectedAnswers.filter(
            (obj) => obj?.isAnswer === true
        );
        const numberCorrect = questionCorrect.length;
        const resultTest = selectedAnswers
            .filter((obj) => obj !== null)
            .map((obj) => ({
                question: obj.questionId,
                answerId: obj.answerId,
            }));
        const totalQuestion =
            test.numberOfBasicQuestion +
            test.numberOfEasyQuestion +
            test.numberOfDifficultQuestion;
        const testScore = (numberCorrect / totalQuestion) * 10;

        (async () => {
            try {
                setLoading(true);
                await axios.post(`${baseUrl}/api/tests/submit/${test.id}`, {
                    testScore,
                    numberOfCorrectAnswer: numberCorrect,
                    resultTest,
                    examTime: timeLeft,
                    testTime: currentTime,
                });
                setLoading(false);
                toastMessage('success', 'Thành công', 'Đã lưu lại kết quả');
                setTimeout(() => {
                    navigate('/test');
                }, 1000);
            } catch (error) {
                toastMessage('error', 'Lỗi', error.response.data.message);
            }
        })();
    };

    const toastMessage = (type, title, message, life = 3000) => {
        toastRef.current.show({
            severity: type,
            summary: title,
            detail: `${message}`,
            life: life,
        });
    };

    useEffect(() => {
        if (timeLeft === 0 && submitting) {
            setSubmitting(true);
            return;
        }

        const intervalId = setInterval(() => {
            setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft, submitting]);

    useEffect(() => {
        if (submitting) {
            handleSubmit();
            setSubmitting(false);
        }
    }, [submitting]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')} : ${secs
            .toString()
            .padStart(2, '0')}`;
    };

    const headerContentSubmit = (
        <div className={clsx(style.header_notification)}>
            <FaFilePen />
            <p>Bạn có chắc muốn nộp bài ?</p>
        </div>
    );

    const footerContentSubmit = (
        <div className={clsx(style.footer_notification, 'm-2')}>
            <Button onClick={() => setVisibleSubmit(false)}>Huỷ</Button>
            <Button primary onClick={() => setSubmitting(true)} autoFocus>
                Nộp bài
            </Button>
        </div>
    );

    const headerContentCancel = (
        <div className={clsx(style.header_notification)}>
            <FaCircleExclamation style={{ color: 'red' }} />
            <p>Bạn có chắc muốn thoát ?</p>
        </div>
    );

    const footerContentCancel = (
        <div className={clsx(style.footer_notification, 'm-2')}>
            <Button onClick={() => setVisibleCancel(false)}>Huỷ</Button>
            <Button primary autoFocus onClick={handleCancel}>
                Xác nhận
            </Button>
        </div>
    );

    return (
        <>
            <Toast ref={toastRef} />
            {loading && (
                <div className="loading-container">
                    <Loading />
                </div>
            )}
            {!loading && (
                <div className={clsx(style.wrapper)}>
                    <div className={clsx(style.topbar_wrapper)}>
                        <div className={style.topbar}>
                            <div className={clsx(style.topbar_left)}>
                                <Button
                                    className={clsx(style.btn_out)}
                                    leftIcon={<FaPowerOff />}
                                    onClick={() => setVisibleCancel(true)}
                                >
                                    Thoát
                                </Button>
                            </div>
                            <div className={style.name}>
                                Thí sinh {user.id} - {user.fullName}
                            </div>
                            <div className={clsx(style.topbar_right)}>
                                <div className={clsx(style.time)}>
                                    <div className={clsx(style.time_icon)}>
                                        <FaStopwatch />
                                    </div>
                                    <div className={clsx(style.time_text)}>
                                        {formatTime(timeLeft)}
                                    </div>
                                </div>
                                <Button
                                    primary
                                    leftIcon={<FaFilePen />}
                                    onClick={() => setVisibleSubmit(true)}
                                >
                                    Nộp bài
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className={clsx(style.content)}>
                        <div className={clsx(style.left_content)}>
                            {questions.map((question, index) => (
                                <div
                                    key={question.id}
                                    className={clsx(style.question)}
                                    ref={(el) =>
                                        (questionRefs.current[index] = el)
                                    }
                                >
                                    <div
                                        className={clsx(style.question_content)}
                                    >
                                        <div
                                            className={clsx(
                                                style.question_number
                                            )}
                                        >
                                            <b>Câu {index + 1}.</b>
                                            <p>{question.content}</p>
                                        </div>
                                        <div
                                            className={clsx(
                                                style.answer_require
                                            )}
                                        >
                                            Chọn một đáp án đúng
                                        </div>
                                        <div
                                            className={clsx(
                                                style.question_answer
                                            )}
                                        >
                                            {question.AnswerModels.map(
                                                (answer, indexAnswer) => (
                                                    <div
                                                        key={answer.id}
                                                        className={clsx(
                                                            style.answer
                                                        )}
                                                    >
                                                        <RadioButton
                                                            inputId={answer.id}
                                                            name={`answer-${index}`}
                                                            value={answer.id}
                                                            onChange={() =>
                                                                handleAnswerChange(
                                                                    index,
                                                                    answer.id,
                                                                    answer.isAnswer
                                                                )
                                                            }
                                                            checked={
                                                                selectedAnswers[
                                                                    index
                                                                ]?.answerId ===
                                                                answer.id
                                                            }
                                                        />
                                                        <label
                                                            htmlFor={answer.id}
                                                            className={clsx(
                                                                style.label_radio
                                                            )}
                                                        >
                                                            {
                                                                optionAnswers[
                                                                    indexAnswer
                                                                ]
                                                            }
                                                            {'. '}
                                                            {answer.content}
                                                        </label>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={clsx(style.right_content)}>
                            <div
                                className={clsx(style.list_question_container)}
                            >
                                <h2 className={clsx(style.list_question_title)}>
                                    Danh sách câu hỏi
                                </h2>
                                <div className={clsx(style.list_question)}>
                                    {questions.map((question, index) => (
                                        <div
                                            key={question.id}
                                            className={clsx(
                                                style.number_question,
                                                selectedAnswers[index] !==
                                                    null && style.selected
                                            )}
                                            onClick={() =>
                                                scrollToQuestion(index)
                                            }
                                        >
                                            {index + 1}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Dialog
                        header={headerContentSubmit}
                        footer={footerContentSubmit}
                        visible={visibleSubmit}
                        position="center"
                        style={{ width: '40vw' }}
                        onHide={() => setVisibleSubmit(false)}
                        draggable={false}
                        resizable={false}
                    >
                        <div className={clsx(style.content_notification)}>
                            <p className={clsx(style.time)}>
                                Thời gian còn lại của bạn còn{' '}
                                {formatTime(timeLeft)}
                            </p>
                            {questions.length -
                                selectedAnswers.filter(
                                    (question) => question !== null
                                ).length !==
                                0 && (
                                <p className={clsx(style.remaining)}>
                                    <b>Cảnh báo: </b> Bạn còn{' '}
                                    {questions.length -
                                        selectedAnswers.filter(
                                            (question) => question !== null
                                        ).length}{' '}
                                    câu chưa làm
                                </p>
                            )}
                            <p className={clsx(style.warning)}>
                                Khi xác nhận nhấn nộp bài, bạn sẽ không thể sửa
                                lại bài thi của mình hãy chắc chắn bạn đã xem
                                lại tất cả đáp án.
                                <br />
                                Chúc bạn may mắn!
                            </p>
                        </div>
                    </Dialog>
                    <Dialog
                        header={headerContentCancel}
                        footer={footerContentCancel}
                        visible={visibleCancel}
                        position="center"
                        style={{ width: '40vw' }}
                        onHide={() => setVisibleCancel(false)}
                        draggable={false}
                        resizable={false}
                    >
                        <div className={clsx(style.content_notification)}>
                            <p className={clsx(style.time)}>
                                Thời gian còn lại của bạn còn{' '}
                                {formatTime(timeLeft)}
                            </p>
                            <p className={clsx(style.warning)}>
                                Khi xác nhận nhận thoát bài thi, bạn sẽ không
                                thể tiếp tục ở lần làm bài thi này. Kết quả làm
                                bài của bạn từ lúc bắt đầu vẫn sẽ được nộp lên
                                Online Test.
                                <br />
                                Chúc bạn may mắn!
                            </p>
                        </div>
                    </Dialog>
                </div>
            )}
        </>
    );
}

export default TakeATest;
