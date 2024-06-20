/* eslint-disable react-hooks/exhaustive-deps */
import clsx from 'clsx';
import { useState, useEffect, useRef } from 'react';
// import { Outlet, useNavigate } from 'react-router-dom';

// Style css
import style from './Test.module.scss';

// React prime
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { FloatLabel } from 'primereact/floatlabel';
import { Toast } from 'primereact/toast';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import { RadioButton } from 'primereact/radiobutton';
import { Tag } from 'primereact/tag';

// Component
import TopPage from '~/components/TopPage';
import Wrapper from '~/components/Wrapper/Wrapper';
import Dropdown from '~/components/Dropdown';
import Search from '~/components/Search';
import TestItem from './TestItem';
import Loading from '~/components/Loading';
import Button from '~/components/Button';

// Hooks
import { useDebounce, useAxiosWithAuth } from '~/hooks';

// React icon
import { FaFilterCircleXmark } from 'react-icons/fa6';

const baseUrl = process.env.REACT_APP_BASE_URL;

function Test() {
    const axios = useAxiosWithAuth();

    const toastRef = useRef(null);

    // State display
    const [loading, setLoading] = useState(false);
    const [visibleCreate, setVisibleCreate] = useState(false);
    const [visibleDelete, setVisibleDelete] = useState(false);
    const [visibleShow, setVisibleShow] = useState(false);

    // Sort
    const [selectedSubject, setSelectedSubject] = useState({});
    const [selectedTypeTest, setSelectedTypeTest] = useState({});
    const [searchValue, setSearchValue] = useState('');

    const debounce = useDebounce(searchValue, 500);

    // State display
    useEffect(() => {
        document.title = 'Đề kiểm tra';
    }, []);

    // Data
    const [tests, setTests] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [modules, setModules] = useState([]);
    const options = [
        { title: 'không', code: 0 },
        { title: 'Có', code: 1 },
    ];

    // Number limit questions
    const [easyNumber, setEastNumber] = useState(0);
    const [basicNumber, setBasicNumber] = useState(0);
    const [difficultNumber, setDifficultNumber] = useState(0);

    // Data row
    const [testId, setTestId] = useState(undefined);
    const [questions, setQuestions] = useState([]);
    const [subject, setSubject] = useState({});
    const [title, setTitle] = useState('');
    const [listClass, setListClass] = useState(undefined);
    const [examTime, setExamTime] = useState(undefined);
    const [startTime, setStartTime] = useState(undefined);
    const [endTime, setEndTime] = useState(undefined);
    const [seeTestScores, setSeeTestScores] = useState(options[1]);
    const [reviewTheTest, setReviewTheTest] = useState(options[1]);
    const [submitTestWhenChangeTab, setSubmitTestWhenChangeTab] = useState(
        options[0]
    );
    const [numberOfBasicQuestion, setNumberOfBasicQuestion] =
        useState(undefined);
    const [numberOfEasyQuestion, setNumberOfEasyQuestion] = useState(undefined);
    const [numberOfDifficultQuestion, setNumberOfDifficultQuestion] =
        useState(undefined);

    const init = async () => {
        try {
            setLoading(true);
            const req = await axios.get(`${baseUrl}/api/tests`, {
                params: {
                    search: debounce,
                    subjectName: selectedSubject.subjectName,
                    typeTest: selectedTypeTest.code,
                },
            });
            setLoading(false);
            setTests(req.data.data);
        } catch (error) {
            toastMessage('error', 'Lỗi', error.response.data.message);
        }
    };

    useEffect(() => {
        (async () => {
            try {
                const req = await axios.get(`${baseUrl}/api/subjects`);
                const reqClass = await axios.get(`${baseUrl}/api/class`);
                setSubjects(req.data.data);
                setModules(reqClass.data.data);
            } catch (error) {
                toastMessage('error', 'Lỗi', error.response.data.message);
            }
        })();
    }, []);

    useEffect(() => {
        init();
    }, [debounce, selectedSubject, selectedTypeTest]);

    const handleCreate = async (e) => {
        e.preventDefault();
        if (
            Object.keys(subject).length === 0 ||
            !title ||
            listClass.length === 0 ||
            !examTime ||
            !startTime ||
            !endTime ||
            numberOfEasyQuestion === undefined ||
            numberOfBasicQuestion === undefined ||
            numberOfDifficultQuestion === undefined
        ) {
            return toastMessage(
                'warn',
                'Cảnh báo',
                'Vui lòng nhập đầy đủ dữ liệu'
            );
        }

        const data = {
            subject: subject,
            title,
            examTime,
            startTime,
            endTime,
            listClass: listClass,
            seeTestScores: seeTestScores.code,
            reviewTheTest: reviewTheTest.code,
            submitTestWhenChangeTab: submitTestWhenChangeTab.code,
            numberOfEasyQuestion,
            numberOfBasicQuestion,
            numberOfDifficultQuestion,
        };
        setVisibleCreate(false);
        try {
            setLoading(true);
            await axios.post(`${baseUrl}/api/tests`, data);
            setLoading(false);
            toastMessage(
                'success',
                'Thành công',
                `Đề thi ${title} được tạo thành công`
            );
            init();
            // Clear input when create data successfully
            setSubject({});
            setTitle('');
            setListClass([]);
            setExamTime(undefined);
            setStartTime(undefined);
            setEndTime(undefined);
            setSeeTestScores(options[1]);
            setReviewTheTest(options[1]);
            setSubmitTestWhenChangeTab(options[0]);
            setNumberOfEasyQuestion(undefined);
            setNumberOfBasicQuestion(undefined);
            setNumberOfDifficultQuestion(undefined);
        } catch (error) {
            toastMessage('error', 'Lỗi', error.response.data.message);
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        setVisibleDelete(false);
        try {
            await axios.delete(`${baseUrl}/api/tests/${testId}`);
            init();
            toastMessage('success', 'Thành công', 'Xoá đề thi thành công');
        } catch (error) {
            toastMessage('error', 'Lỗi', error.response.data.message);
        }
    };

    const types = [
        { name: 'Chưa mở', code: 0 },
        { name: 'Đang mở', code: 1 },
        { name: 'Đã đóng', code: 2 },
        { name: 'Tất cả', code: 3 },
    ];

    const toastMessage = (type, title, message, life = 3000) => {
        toastRef.current.show({
            severity: type,
            summary: title,
            detail: `${message}`,
            life: life,
        });
    };

    // Header dialog
    const headerDialog = (title) => {
        return (
            <div className="header_dialog">
                <h2>{title}</h2>
            </div>
        );
    };

    const handleChangeSubject = (e) => {
        setSubject(e.value);
        (async () => {
            try {
                const easy = await axios.get(`${baseUrl}/api/questions`, {
                    params: {
                        subjectId: e.value.id,
                        lever: 1,
                    },
                });
                const basic = await axios.get(`${baseUrl}/api/questions`, {
                    params: {
                        subjectId: e.value.id,
                        lever: 2,
                    },
                });
                const difficult = await axios.get(`${baseUrl}/api/questions`, {
                    params: {
                        subjectId: e.value.id,
                        lever: 3,
                    },
                });
                setEastNumber(easy.data.data.length);
                setBasicNumber(basic.data.data.length);
                setDifficultNumber(difficult.data.data.length);
            } catch (error) {
                toastMessage('error', 'Lỗi', error.response.data.message);
            }
        })();
    };

    const onclickDelete = (id) => {
        setTestId(id);
        setVisibleDelete(true);
    };

    const onClickShow = async (id) => {
        setVisibleShow(true);

        try {
            const req = await axios.get(`${baseUrl}/api/tests/${id}`);
            setQuestions(req.data.data.questions);
        } catch (error) {
            toastMessage('error', 'Lỗi', error.response.data.message);
        }
    };

    const handleClearSort = () => {
        setSelectedSubject({});
        setSearchValue('');
        setSelectedTypeTest({});
    };

    const optionAnswers = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    return (
        <>
            <Wrapper>
                <Toast ref={toastRef} />
                {/* Start Head  */}
                <div className={style.head}>
                    <TopPage
                        title="Danh sách đề thi"
                        textButton="Tạo đề thi"
                        onClick={() => setVisibleCreate(true)}
                    />
                    <div className="head_body">
                        <Dropdown
                            value={selectedSubject}
                            onChange={(e) => setSelectedSubject(e.value)}
                            options={subjects}
                            optionLabel="subjectName"
                            placeholder="Chọn môn"
                            className="dropdown"
                        />
                        <Dropdown
                            value={selectedTypeTest}
                            onChange={(e) => setSelectedTypeTest(e.value)}
                            options={types}
                            optionLabel="name"
                            placeholder="Tất cả"
                            className="dropdown"
                        />
                        <Search
                            onClear={() => setSearchValue('')}
                            value={searchValue}
                            placeholder="Tìm kiếm đề thi..."
                            className={clsx(style.search)}
                            onChange={(e) => {
                                setSearchValue(e.target.value);
                            }}
                        />
                        {(Object.keys(selectedSubject).length !== 0 ||
                            Object.keys(selectedTypeTest).length !== 0 ||
                            searchValue) && (
                            <Button
                                leftIcon={<FaFilterCircleXmark />}
                                onClick={handleClearSort}
                            >
                                Xoá bộ lọc
                            </Button>
                        )}
                    </div>
                </div>
                {/* End Head  */}

                {/* Start body */}
                {loading && (
                    <div className="loading-container">
                        <Loading />
                    </div>
                )}

                {!loading && (
                    <div className={clsx(style.body)}>
                        <div className={clsx(style.list_test)}>
                            {tests.map((test, index) => {
                                const classList =
                                    test.AssignExamQuestionModels.map(
                                        (item) => {
                                            return {
                                                className:
                                                    item.ClassModel.className,
                                            };
                                        }
                                    );

                                return (
                                    <TestItem
                                        onClickShow={onClickShow}
                                        onclickDelete={onclickDelete}
                                        key={index}
                                        data={test}
                                        classList={classList}
                                    />
                                );
                            })}
                        </div>
                        <div className={clsx(style.note_status)}>
                            <ul>
                                <li>
                                    <div
                                        className={clsx(
                                            style.status_color,
                                            style.pending
                                        )}
                                    ></div>
                                    <div className={clsx(style.status_text)}>
                                        Chưa mở
                                    </div>
                                </li>
                                <li>
                                    <div
                                        className={clsx(
                                            style.status_color,
                                            style.approved
                                        )}
                                    ></div>
                                    <div className={clsx(style.status_text)}>
                                        Đã mở
                                    </div>
                                </li>
                                <li>
                                    <div
                                        className={clsx(
                                            style.status_color,
                                            style.cancel
                                        )}
                                    ></div>
                                    <div className={clsx(style.status_text)}>
                                        Đã đóng
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
                {/* End body */}
            </Wrapper>

            {/* Dialog  create */}
            <Dialog
                header={headerDialog('Tạo đề thi')}
                visible={visibleCreate}
                style={{ width: '50vw' }}
                onHide={() => {
                    if (!visibleCreate) return;
                    setVisibleCreate(false);
                }}
                draggable={false}
            >
                <form className="form" onSubmit={handleCreate}>
                    <FloatLabel>
                        <Dropdown
                            value={subject}
                            onChange={handleChangeSubject}
                            options={subjects}
                            optionLabel="subjectName"
                            placeholder="Chọn môn"
                            className="dropdown input-number"
                            id="subject"
                        />
                        <label htmlFor="subjectName">Môn học</label>
                    </FloatLabel>
                    <FloatLabel>
                        <InputText
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            className="input"
                            id="title"
                            mode="decimal"
                        />
                        <label htmlFor="title">Tiêu đề bài thi</label>
                    </FloatLabel>
                    <FloatLabel>
                        <MultiSelect
                            value={listClass}
                            onChange={(e) => setListClass(e.value)}
                            optionLabel="className"
                            placeholder="Chọn lớp"
                            maxSelectedLabels={4}
                            className="input"
                            display="chip"
                            options={modules}
                        />
                        <label htmlFor="numberCredits">Giao cho lớp</label>
                    </FloatLabel>
                    <div className="input-row-2">
                        <FloatLabel>
                            <InputNumber
                                value={examTime}
                                onValueChange={(e) => setExamTime(e.value)}
                                className="input-number"
                                id="examTest"
                                mode="decimal"
                                min={15}
                                max={180}
                            />
                            <label htmlFor="examTest">
                                Thời gian thi (phút)
                            </label>
                        </FloatLabel>
                        <FloatLabel>
                            <Calendar
                                value={startTime}
                                onChange={(e) => setStartTime(e.value)}
                                className="input-number"
                                inputId="dobStart"
                                showTime
                                hourFormat="24"
                            />
                            <label htmlFor="dobStart">Thời gian mở đề</label>
                        </FloatLabel>
                        <FloatLabel>
                            <Calendar
                                value={endTime}
                                onChange={(e) => setEndTime(e.value)}
                                className="input-number"
                                inputId="dobEnd"
                                showTime
                                hourFormat="24"
                                minDate={startTime}
                            />
                            <label htmlFor="dobEnd">Thời gian đóng đề</label>
                        </FloatLabel>
                    </div>
                    <div className="input-row-2">
                        <FloatLabel>
                            <Dropdown
                                value={seeTestScores}
                                onChange={(e) => setSeeTestScores(e.value)}
                                options={options}
                                optionLabel="title"
                                placeholder="Chọn xem kết quả"
                                className="dropdown input-number"
                                id="seeTestScores"
                            />
                            <label htmlFor="seeTestScores">
                                Cho xem kết quả
                            </label>
                        </FloatLabel>
                        <FloatLabel>
                            <Dropdown
                                value={reviewTheTest}
                                onChange={(e) => setReviewTheTest(e.value)}
                                options={options}
                                optionLabel="title"
                                placeholder="Chọn xem lại bài thi"
                                className="dropdown input-number"
                                id="review"
                            />
                            <label htmlFor="review">
                                Cho phép xem lại bài thi
                            </label>
                        </FloatLabel>
                        <FloatLabel>
                            <Dropdown
                                value={submitTestWhenChangeTab}
                                onChange={(e) =>
                                    setSubmitTestWhenChangeTab(e.value)
                                }
                                options={options}
                                optionLabel="title"
                                placeholder="Nộp bài khi chuyển tab"
                                className="dropdown input-number"
                                id="submitTestOnchangeTab"
                            />
                            <label htmlFor="submitTestOnchangeTab">
                                Nộp bài khi chuyển tab
                            </label>
                        </FloatLabel>
                    </div>
                    <div className="input-row-2">
                        <FloatLabel>
                            <InputNumber
                                value={numberOfEasyQuestion}
                                onValueChange={(e) =>
                                    setNumberOfEasyQuestion(e.value)
                                }
                                className="input-number"
                                id="numberOfEasyQuestion"
                                min={0}
                                max={easyNumber}
                            />
                            <label htmlFor="numberOfEasyQuestion">
                                Số câu dễ
                            </label>
                        </FloatLabel>
                        <FloatLabel>
                            <InputNumber
                                value={numberOfBasicQuestion}
                                onValueChange={(e) =>
                                    setNumberOfBasicQuestion(e.value)
                                }
                                className="input-number"
                                id="numberOfBasicQuestion"
                                min={0}
                                max={basicNumber}
                            />
                            <label htmlFor="numberOfBasicQuestion">
                                Số câu trung bình
                            </label>
                        </FloatLabel>
                        <FloatLabel>
                            <InputNumber
                                value={numberOfDifficultQuestion}
                                onValueChange={(e) =>
                                    setNumberOfDifficultQuestion(e.value)
                                }
                                className="input-number"
                                id="numberOfDifficultQuestion"
                                min={0}
                                max={difficultNumber}
                            />
                            <label htmlFor="numberOfDifficultQuestion">
                                Số câu khó
                            </label>
                        </FloatLabel>
                    </div>
                    <div className="form_action">
                        <Button
                            type="button"
                            onClick={() => setVisibleCreate(false)}
                        >
                            Huỷ
                        </Button>
                        <Button primary type="submit">
                            Tạo
                        </Button>
                    </div>
                </form>
            </Dialog>
            {/* /Dialog  create */}

            {/* Dialog show */}
            <Dialog
                header={headerDialog('Xem đề thi')}
                visible={visibleShow}
                style={{ width: '900px' }}
                onHide={() => {
                    if (!visibleShow) return;
                    setVisibleShow(false);
                }}
                draggable={false}
            >
                <form className="form">
                    {questions.map((question, index) => (
                        <div key={question.id} className={clsx(style.question)}>
                            <div className={clsx(style.question_content)}>
                                <div className={clsx(style.question_number)}>
                                    <b>Câu {index + 1}.</b>
                                    <p>
                                        {question.content}
                                        {question.lever === 1 && (
                                            <Tag
                                                severity="primary"
                                                value="Dễ"
                                            ></Tag>
                                        )}
                                        {question.lever === 2 && (
                                            <Tag
                                                severity="warning"
                                                value="Trung bình"
                                            ></Tag>
                                        )}
                                        {question.lever === 3 && (
                                            <Tag
                                                severity="danger"
                                                value="Khó"
                                            ></Tag>
                                        )}
                                    </p>
                                </div>
                                <div className={clsx(style.answer_require)}>
                                    Chọn một đáp án đúng
                                </div>
                                <div className={clsx(style.question_answer)}>
                                    {question.AnswerModels.map(
                                        (answer, index) => (
                                            <div
                                                key={answer.id}
                                                className={clsx(style.answer)}
                                            >
                                                <RadioButton
                                                    inputId={answer.id}
                                                    name={`answer-${index}`}
                                                    value={answer.key}
                                                    checked={
                                                        answer.isAnswer === true
                                                    }
                                                />
                                                <label
                                                    htmlFor={answer.id}
                                                    className={clsx(
                                                        style.label_radio
                                                    )}
                                                >
                                                    {optionAnswers[index]}
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
                </form>
            </Dialog>
            {/* /Dialog show */}

            {/* Dialog delete */}
            <Dialog
                header={headerDialog('Thông báo')}
                visible={visibleDelete}
                style={{ width: '400px' }}
                onHide={() => {
                    if (!visibleDelete) return;
                    setVisibleDelete(false);
                }}
                draggable={false}
            >
                <form className="form" onSubmit={handleDelete}>
                    <p>Bạn có chắc muốn xoá đề thi này?</p>
                    <div className="form_action">
                        <Button
                            type="button"
                            onClick={() => setVisibleDelete(false)}
                        >
                            Huỷ
                        </Button>
                        <Button destroy type="submit">
                            Xoá
                        </Button>
                    </div>
                </form>
            </Dialog>
            {/* /Dialog delete */}
        </>
    );
}

export default Test;
