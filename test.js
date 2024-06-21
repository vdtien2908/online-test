import clsx from 'clsx';
import React, { useState, useRef, useEffect } from 'react';

// Icon
import {
    FaPowerOff,
    FaFilePen,
    FaStopwatch,
    FaCircleExclamation,
} from 'react-icons/fa6';

// React Prime
import { RadioButton } from 'primereact/radiobutton';
import { Dialog } from 'primereact/dialog';
import { useParams } from 'react-router-dom';
import { Toast } from 'primereact/toast';

// Style css
import style from './TakeATest.module.scss';

// Component
import Button from '~/components/Button';

// Hooks
import { useAxiosWithAuth } from '~/hooks';

const baseUrl = process.env.REACT_APP_BASE_URL;

function TakeATest() {
    const axios = useAxiosWithAuth();
    let { id } = useParams();
    const toastRef = useRef(null);
    const [questions, setQuestions] = useState([]);
    const [test, setTest] = useState({});
    const [timeLeft, setTimeLeft] = useState(0);

    const init = async () => {
        try {
            const req = await axios.get(`${baseUrl}/api/tests/${id}`);
            setQuestions(req.data.data.questions);
            setTest(req.data.data.tests[0]);
            setTimeLeft(req.data.data.tests[0].examTime * 60);
            setSelectedAnswers(
                Array(req.data.data.questions.length).fill(null)
            );
        } catch (error) {
            toastMessage('error', 'Lỗi', error.response.data.message);
        }
    };

    useEffect(() => {
        init();
    }, []);

    const [visibleSubmit, setVisibleSubmit] = useState(false);
    const [visibleCancel, setVisibleCancel] = useState(false);
    const [selectedAnswers, setSelectedAnswers] = useState([]);

    const questionRefs = useRef([]);

    // Handle selected answer
    const handleAnswerChange = (questionIndex, answerKey) => {
        const updatedAnswers = [...selectedAnswers];
        updatedAnswers[questionIndex] = answerKey;
        setSelectedAnswers(updatedAnswers);
    };

    // Scroll to question when click list question
    const scrollToQuestion = (index) => {
        const element = questionRefs.current[index];
        const topOffset = 70 + 20; // Height topbar + padding
        const yPosition =
            element.getBoundingClientRect().top +
            window.pageYOffset -
            topOffset;
        window.scrollTo({ top: yPosition, behavior: 'smooth' });
    };

    const handleSubmit = () => {
        console.log(selectedAnswers);
    };

    const toastMessage = (type, title, message, life = 3000) => {
        toastRef.current.show({
            severity: type,
            summary: title,
            detail: `${message}`,
            life: life,
        });
    };

    // Handle time
    useEffect(() => {
        if (timeLeft === 0) {
            handleSubmit();
            return;
        }

        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearInterval(intervalId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timeLeft]);

    // Format time
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;

        return `${minutes.toString().padStart(2, '0')} : ${secs
            .toString()
            .padStart(2, '0')}`;
    };

    // Notification submit
    const headerContentSubmit = (
        <div className={clsx(style.header_notification)}>
            <FaFilePen />
            <p>Bạn có chắc muốn nộp bài ?</p>
        </div>
    );

    const footerContentSubmit = (
        <div className={clsx(style.footer_notification, 'm-2')}>
            <Button onClick={() => setVisibleSubmit(false)}>Huỷ</Button>
            <Button primary onClick={() => setVisibleSubmit(false)} autoFocus>
                Nộp bài
            </Button>
        </div>
    );

    // Notification Cancel
    const headerContentCancel = (
        <div className={clsx(style.header_notification)}>
            <FaCircleExclamation style={{ color: 'red' }} />
            <p>Bạn có chắc muốn thoát ?</p>
        </div>
    );

    const footerContentCancel = (
        <div className={clsx(style.footer_notification, 'm-2')}>
            <Button onClick={() => setVisibleCancel(false)}>Huỷ</Button>
            <Button primary onClick={() => setVisibleCancel(false)} autoFocus>
                Xác nhận
            </Button>
        </div>
    );

    return (
        <div className={clsx(style.wrapper)}>
            <Toast ref={toastRef} />
            {/* Topbar */}
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
                    <div className={style.name}>Thí sinh 12 - Nguyễn Văn A</div>
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
            {/* /Topbar */}

            {/* Content */}
            <div className={clsx(style.content)}>
                {/* Left content */}
                <div className={clsx(style.left_content)}>
                    {questions.map((question, index) => (
                        <div
                            key={question.id}
                            className={clsx(style.question)}
                            ref={(el) => (questionRefs.current[index] = el)}
                        >
                            <div className={clsx(style.question_content)}>
                                <div className={clsx(style.question_number)}>
                                    <b>Câu {index + 1}</b>
                                    <p>{question.content}</p>
                                </div>
                                <div className={clsx(style.answer_require)}>
                                    Chọn một đáp án đúng
                                </div>
                                <div className={clsx(style.question_answer)}>
                                    {question.AnswerModels.map((answer) => (
                                        <div
                                            key={answer.id}
                                            className={clsx(style.answer)}
                                        >
                                            <RadioButton
                                                inputId={answer.id}
                                                name={`answer-${index}`}
                                                value={answer.id}
                                                onChange={() =>
                                                    handleAnswerChange(
                                                        index,
                                                        answer.id
                                                    )
                                                }
                                                checked={
                                                    selectedAnswers[index] ===
                                                    answer.id
                                                }
                                            />
                                            <label
                                                htmlFor={answer.id}
                                                className={clsx(
                                                    style.label_radio
                                                )}
                                            >
                                                {answer.content}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* /Left content */}

                {/* Right content */}
                <div className={clsx(style.right_content)}>
                    <div className={clsx(style.list_question_container)}>
                        <h2 className={clsx(style.list_question_title)}>
                            Danh sách câu hỏi
                        </h2>
                        <div className={clsx(style.list_question)}>
                            {questions.map((question, index) => (
                                <div
                                    key={question.id}
                                    className={clsx(
                                        style.number_question,
                                        selectedAnswers[index] !== null &&
                                            style.selected
                                    )}
                                    onClick={() => scrollToQuestion(index)}
                                >
                                    {index + 1}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* /Right content */}
            </div>
            {/* /Content */}

            {/* Notification submit  */}
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
                        Thời gian còn lại của bạn còn {formatTime(timeLeft)}
                    </p>
                    {questions.length -
                        selectedAnswers.filter((question) => question !== null)
                            .length !==
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
                        Khi xác nhận nhấn nộp bài, bạn sẽ không thể sửa lại bài
                        thi của mình hãy chắc chắn bạn đã xem lại tất cả đáp án.
                        <br />
                        Chúc bạn may mắn!
                    </p>
                </div>
            </Dialog>
            {/* /Notification submit  */}

            {/* Notification cancel  */}
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
                        Thời gian còn lại của bạn còn {formatTime(timeLeft)}
                    </p>
                    <p className={clsx(style.warning)}>
                        Khi xác nhận nhận thoát bài thi, bạn sẽ không thể tiếp
                        tục ở lần làm bài thi này. Kết quả làm bài của bạn từ
                        lúc bắt đầu vẫn sẽ được nộp lên Online Test.
                        <br />
                        Chúc bạn may mắn!
                    </p>
                </div>
            </Dialog>
            {/* /Notification cancel  */}
        </div>
    );
}

export default TakeATest;
