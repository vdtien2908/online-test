import clsx from 'clsx';
import {
    FaPowerOff,
    FaFilePen,
    FaStopwatch,
    FaCircleExclamation,
} from 'react-icons/fa6';
import { RadioButton } from 'primereact/radiobutton';
import { Dialog } from 'primereact/dialog';
import React, { useState, useRef, useEffect } from 'react';

// Style css
import style from './TakeATest.module.scss';

// Component
import Button from '~/components/Button';

function TakeATest() {
    const questions = [
        {
            id: 1,
            questionContent: 'Đâu là cách khai báo biến của PHP ?',
            answers: [
                { id: 1, name: 'Đáp án A', key: 'A', isAnswer: true },
                { id: 2, name: 'Đáp án B', key: 'B' },
                { id: 3, name: 'Đáp án C', key: 'C' },
                { id: 4, name: 'Đáp án D', key: 'D' },
            ],
        },
        {
            id: 2,
            questionContent: 'OOP là viết tắt của?',
            answers: [
                { id: 5, name: 'Đáp án A', key: 'A' },
                { id: 6, name: 'Đáp án B', key: 'B' },
                { id: 7, name: 'Đáp án C', key: 'C' },
                { id: 8, name: 'Đáp án D', key: 'D', isAnswer: true },
            ],
        },
        {
            id: 3,
            questionContent: 'OOP là viết tắt của?',
            answers: [
                { id: 9, name: 'Đáp án A', key: 'A' },
                { id: 10, name: 'Đáp án B', key: 'B' },
                { id: 11, name: 'Đáp án C', key: 'C' },
                { id: 12, name: 'Đáp án D', key: 'D', isAnswer: true },
            ],
        },
        {
            id: 4,
            questionContent: 'OOP là viết tắt của?',
            answers: [
                { id: 13, name: 'Đáp án A', key: 'A' },
                { id: 14, name: 'Đáp án B', key: 'B' },
                { id: 15, name: 'Đáp án C', key: 'C' },
                { id: 16, name: 'Đáp án D', key: 'D', isAnswer: true },
            ],
        },
    ];

    const [visibleSubmit, setVisibleSubmit] = useState(false);
    const [visibleCancel, setVisibleCancel] = useState(false);
    const [selectedAnswers, setSelectedAnswers] = useState(
        Array(questions.length).fill(null)
    );
    const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes
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
                                    <p>{question.questionContent}</p>
                                </div>
                                <div className={clsx(style.answer_require)}>
                                    Chọn một đáp án đúng
                                </div>
                                <div className={clsx(style.question_answer)}>
                                    {question.answers.map((answer) => (
                                        <div
                                            key={answer.id}
                                            className={clsx(style.answer)}
                                        >
                                            <RadioButton
                                                inputId={answer.id}
                                                name={`answer-${index}`}
                                                value={answer.key}
                                                onChange={() =>
                                                    handleAnswerChange(
                                                        index,
                                                        answer.key
                                                    )
                                                }
                                                checked={
                                                    selectedAnswers[index] ===
                                                    answer.key
                                                }
                                            />
                                            <label
                                                htmlFor={answer.id}
                                                className={clsx(
                                                    style.label_radio
                                                )}
                                            >
                                                {answer.name}
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
                            câu hỏi trắc nghiệm chưa trả lời. Bạn có chắc muốn
                            kết thúc bài thi?
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
