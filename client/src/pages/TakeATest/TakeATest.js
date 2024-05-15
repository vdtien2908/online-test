import clsx from 'clsx';
import { FaPowerOff, FaFilePen, FaStopwatch } from 'react-icons/fa6';
import { RadioButton } from 'primereact/radiobutton';
import React, { useState } from 'react';

// Style css
import style from './TakeATest.module.scss';

// Component
import Button from '~/components/Button';

function TakeATest() {
    const answers = [
        { name: 'Đáp án A', key: 'A' },
        { name: 'Đáp án B', key: 'M' },
        { name: 'Đáp án C', key: 'P' },
        { name: 'Đáp án D', key: 'R' },
    ];
    const [selectedAnswer, setSelectedAnswer] = useState([]);
    return (
        <div className={clsx(style.wrapper)}>
            {/*  Topbar */}
            <div className={clsx(style.topbar_wrapper)}>
                <div className={style.topbar}>
                    <div className={clsx(style.topbar_left)}>
                        <Button
                            className={clsx(style.btn_out)}
                            leftIcon={<FaPowerOff />}
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
                                00 : 19 : 35
                            </div>
                        </div>
                        <Button primary leftIcon={<FaFilePen />}>
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
                    <div className={clsx(style.question)}>
                        <div className={clsx(style.question_content)}>
                            <div className={clsx(style.question_number)}>
                                <b>Câu 1</b>
                                <p>Đâu là cách khai báo một biến trong PHP?</p>
                            </div>
                            <div className={clsx(style.answer_require)}>
                                Chọn một đáp án đúng
                            </div>
                            <div className={clsx(style.question_answer)}>
                                {answers.map((answer) => {
                                    return (
                                        <div
                                            key={answer.key}
                                            className={clsx(style.answer)}
                                        >
                                            <RadioButton
                                                inputId={answer.key}
                                                name="answer"
                                                value={answer}
                                                onChange={(e) =>
                                                    setSelectedAnswer(e.value)
                                                }
                                                checked={
                                                    selectedAnswer.key ===
                                                    answer.key
                                                }
                                            />
                                            <label
                                                htmlFor={answer.key}
                                                className="ml-2"
                                            >
                                                {answer.name}
                                            </label>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                {/* /Left content */}

                {/* Right content */}
                <div className={clsx(style.right_content)}>
                    <div className={clsx(style.list_question_container)}>
                        <h2 className={clsx(style.list_question_title)}>
                            Danh sách câu hỏi
                        </h2>
                        <div className={clsx(style.list_question)}>
                            <div
                                className={clsx(
                                    style.number_question,
                                    style.selected
                                )}
                            >
                                1
                            </div>
                            <div className={clsx(style.number_question)}>2</div>
                            <div className={clsx(style.number_question)}>3</div>
                            <div className={clsx(style.number_question)}>4</div>
                            <div className={clsx(style.number_question)}>5</div>
                            <div className={clsx(style.number_question)}>6</div>
                            <div className={clsx(style.number_question)}>7</div>
                            <div className={clsx(style.number_question)}>8</div>
                            <div className={clsx(style.number_question)}>9</div>
                            <div className={clsx(style.number_question)}>
                                10
                            </div>
                        </div>
                    </div>
                </div>
                {/* /Right content */}
            </div>
            {/* /Content */}
        </div>
    );
}

export default TakeATest;
