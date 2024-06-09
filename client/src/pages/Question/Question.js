import clsx from 'clsx';
import { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {
    FaPlus,
    FaXmark,
    FaCheck,
    FaPencil,
    FaRegTrashCan,
    FaEllipsisVertical,
    FaFilterCircleXmark,
} from 'react-icons/fa6';

// React Prime
import { Dialog } from 'primereact/dialog';
import { Editor } from 'primereact/editor';
import { FloatLabel } from 'primereact/floatlabel';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import { InputTextarea } from 'primereact/inputtextarea';

// Style css
import style from './Question.module.scss';

// Component
import TopPage from '~/components/TopPage';
import Wrapper from '~/components/Wrapper/Wrapper';
import Dropdown from '~/components/Dropdown';
import Search from '~/components/Search';
import Button from '~/components/Button';
import Tooltip from '~/components/Tooltip';
import Loading from '~/components/Loading';

// Hooks
import { useAxiosWithAuth, useDebounce } from '~/hooks';

const baseUrl = process.env.REACT_APP_BASE_URL;

function Question() {
    const axios = useAxiosWithAuth();

    // Display state
    const toastRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [loadingSort, setLoadingSort] = useState(false);
    const [visibleCreate, setVisibleCreate] = useState(false);
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [visibleDelete, setVisibleDelete] = useState(false);
    const [isUpdateAnswer, setIsUpdateAnswer] = useState(false);

    // Sort
    const [selectedSubjectSort, setSelectedSubjectSort] = useState({});
    const [selectedLeverSort, setSelectedLeverSort] = useState({});
    const [searchValue, setSearchValue] = useState('');
    const debounce = useDebounce(searchValue, 500);

    const optionLevers = [
        { name: 'Cơ bản', code: 1 },
        { name: 'Trung bình', code: 2 },
        { name: 'Nâng cao', code: 3 },
    ];

    // Data
    const [question, setQuestion] = useState({});
    const [questions, setQuestions] = useState([]);
    const [subjects, setSubjects] = useState([]);
    // Row data
    const [questionId, setQuestionId] = useState(undefined);
    const [content, setContent] = useState('');
    const [selectedSubject, setSelectedSubject] = useState({});
    const [lever, setLever] = useState({});
    const [answers, setAnswers] = useState([]);
    const [answer, setAnswer] = useState('');

    const init = async () => {
        try {
            setLoading(true);
            const req = await axios.get(`${baseUrl}/api/questions`, {
                params: {
                    search: searchValue,
                    lever: selectedLeverSort.code,
                    subjectId: selectedSubjectSort.id,
                },
            });
            setQuestions(req.data.data);
            setLoading(false);
        } catch (error) {
            toastMessage('error', 'Lỗi', error.response.data.message);
        }
    };

    useEffect(() => {
        (async () => {
            try {
                setLoadingSort(true);
                const req = await axios.get(`${baseUrl}/api/subjects`);
                setSubjects(req.data.data);
                setLoadingSort(false);
            } catch (error) {
                toastMessage('error', 'Lỗi', error.response.data.message);
            }
        })();
        init();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedSubjectSort, selectedLeverSort, debounce]);

    const onclickEdit = async (id) => {
        setVisibleEdit(true);
        try {
            const req = await axios.get(`${baseUrl}/api/questions/${id}`);
            const question = req.data.data;
            setQuestion(question);
            setLever(optionLevers[question.lever - 1]);
            setSelectedSubject(question.SubjectModel);
            setAnswers(question.AnswerModels);
            setContent(question.content);
        } catch (error) {
            console.error(error);
        }
    };

    const onclickDelete = (id) => {
        setVisibleDelete(true);
        setQuestionId(id);
    };

    const onclickHideUpdate = () => {
        setSelectedSubject({});
        setLever({});
        setContent(undefined);
        setVisibleEdit(false);
        setAnswers([]);
    };

    // Handle create question
    const handleCreate = async (e) => {
        e.preventDefault();
        if (
            Object.keys(selectedSubject).length === 0 ||
            Object.keys(lever).length === 0 ||
            content === undefined ||
            answers.length === 0
        ) {
            return toastMessage(
                'warn',
                'Cảnh báo',
                'Vui lòng nhập đầy đủ thông tin.'
            );
        }

        setVisibleCreate(false);

        setLoading(true);

        try {
            const req = await axios.post(`${baseUrl}/api/questions`, {
                subjectId: selectedSubject.id,
                lever: lever.code,
                content,
            });
            console.log(req);

            await axios.post(
                `${baseUrl}/api/answers/${req.data.newQuestion.id}`,
                {
                    answers,
                }
            );

            toastMessage('success', 'Thành công', 'Tạo câu hỏi thành công');

            setLoading(false);
            init();
        } catch (error) {
            toastMessage('error', 'Lỗi', 'Có lỗi sảy ra');
            setLoading(false);
        }

        setContent('');
        setSelectedSubject({});
        setLever({});
        setAnswers([]);
    };

    // Submit delete
    const submitDelete = (e) => {
        e.preventDefault();
        (async () => {
            try {
                setVisibleDelete(false);
                setLoading(true);
                await axios.delete(`${baseUrl}/api/questions/${questionId}`);
                setLoading(false);
                init(); // Call function init
                toastMessage(
                    'success',
                    'Thành công',
                    'Câu hỏi được xoá thành công!'
                );
                setSearchValue('');
            } catch (error) {
                toastMessage('error', 'Lỗi', error.response.data.message);
                setVisibleDelete(false);
                setLoading(false);
            }
        })();
    };

    // Handle crud answer --------------------
    const [indexAnswer, setIndexAnswer] = useState(undefined);

    const handleEditAnswer = (index) => {
        setAnswer(answers[index].content);
        setIsUpdateAnswer(true);
        setIndexAnswer(index);
    };

    // Handle selected answer
    const handleAnswerChange = (answerKey) => {
        const updatedAnswers = answers.map((ans) => ({
            ...ans,
            isAnswer: ans.key === answerKey,
        }));
        setAnswers(updatedAnswers);
    };

    const closeUpdateAnswer = () => {
        setAnswer('');
        setIsUpdateAnswer(false);
    };

    const handleAddAnswer = () => {
        if (answer.trim()) {
            const newAnswer = {
                key: answers.length + 1,
                content: answer,
                isAnswer: answers.length === 0,
            };
            setAnswers([...answers, newAnswer]);
            setAnswer('');
        }
    };

    const handleUpdateAnswer = () => {
        const answerOld = answers;
        answerOld[indexAnswer].content = answer;
        setAnswers(answerOld);
        setAnswer('');
        setIsUpdateAnswer(false);
    };

    const handleRemoveAnswer = (index) => {
        if (answers[index].isAnswer === true) {
            return toastMessage(
                'warn',
                'Cảnh báo',
                'Vui lòng chọn đáp án khác trước khi xoá đáp án này!'
            );
        }
        setAnswers(answers.filter((_, i) => i !== index));
    };

    const toastMessage = (type, title, message, life = 3000) => {
        toastRef.current.show({
            severity: type,
            summary: title,
            detail: `${message}`,
            life: life,
        });
    };

    const indexBodyTemplate = (data, props) => {
        return props.rowIndex + 1;
    };

    const questionContentBodyTemplate = (rowData) => {
        return <div dangerouslySetInnerHTML={{ __html: rowData.content }} />;
    };

    const leverBodyTemplate = (rowData) => {
        if (rowData.lever === 1) {
            return 'Cơ bản';
        } else if (rowData.lever === 2) {
            return 'Trung bình';
        } else if (rowData.lever === 3) {
            return 'Nâng cao';
        }
    };

    const subjectNameBodyTemplate = (rowData) => {
        if (rowData.SubjectModel && rowData.SubjectModel.subjectName) {
            return rowData.SubjectModel.subjectName;
        }
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="table_action">
                <Tooltip content="Chỉnh sửa">
                    <span>
                        <Button
                            onClick={() => {
                                onclickEdit(rowData.id);
                            }}
                            className="table_icon"
                            outline
                            edit
                            leftIcon={<FaPencil />}
                        />
                    </span>
                </Tooltip>
                <Tooltip content="Xoá">
                    <span>
                        <Button
                            onClick={() => {
                                onclickDelete(rowData.id);
                            }}
                            className="table_icon"
                            outline
                            trash
                            leftIcon={<FaRegTrashCan />}
                        />
                    </span>
                </Tooltip>
            </div>
        );
    };

    // Template content
    // + Header dialog
    const headerDialog = (title) => {
        return (
            <div className="header_dialog">
                <h2>{title}</h2>
            </div>
        );
    };

    const renderHeader = () => {
        return (
            <span className="ql-formats">
                <button className="ql-bold" aria-label="Bold"></button>
                <button className="ql-italic" aria-label="Italic"></button>
                <button
                    className="ql-underline"
                    aria-label="Underline"
                ></button>
            </span>
        );
    };

    const header = renderHeader();

    return (
        <>
            <Wrapper>
                <Toast ref={toastRef} />
                {/* Head start */}
                <div className={style.head}>
                    <TopPage
                        title="Danh sách câu hỏi"
                        textButton="Thêm câu hỏi"
                        onClick={() => setVisibleCreate(true)}
                    />
                    <div className="head_body">
                        {/* Selected subject */}
                        {loadingSort && (
                            <div
                                style={{
                                    width: 150,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Loading small />
                            </div>
                        )}
                        {!loadingSort && (
                            <Dropdown
                                value={selectedSubjectSort}
                                onChange={(e) =>
                                    setSelectedSubjectSort(e.value)
                                }
                                options={subjects}
                                optionLabel="subjectName"
                                placeholder="Chọn môn"
                                className="dropdown"
                            />
                        )}

                        {/* Selected lever */}
                        <Dropdown
                            value={selectedLeverSort}
                            onChange={(e) => setSelectedLeverSort(e.value)}
                            options={optionLevers}
                            optionLabel="name"
                            placeholder="Độ khó"
                            className="dropdown"
                        />
                        {/* form search */}
                        <Search
                            value={searchValue}
                            placeholder="Tìm kiếm câu hỏi..."
                            className={clsx(style.search)}
                            onChange={(e) => {
                                setSearchValue(e.target.value);
                            }}
                            onClear={() => setSearchValue('')}
                        />
                        {(Object.keys(selectedSubjectSort).length !== 0 ||
                            Object.keys(selectedLeverSort).length !== 0 ||
                            searchValue) && (
                            <Button
                                leftIcon={<FaFilterCircleXmark />}
                                onClick={() => {
                                    setSearchValue('');
                                    setSelectedLeverSort({});
                                    setSelectedSubjectSort({});
                                }}
                            >
                                Xoá bộ lọc
                            </Button>
                        )}
                    </div>
                </div>
                {/* Head end */}

                {loading && (
                    <div className="loading-container">
                        <Loading />
                    </div>
                )}

                {/* Start body */}

                {!loading && (
                    <div className={style.body}>
                        <DataTable
                            value={questions}
                            showGridlines
                            stripedRows
                            paginator
                            rowsPerPageOptions={[5, 10, 15, 20]}
                            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                            rows={10}
                            currentPageReportTemplate="Trang {first} / {totalRecords}"
                            emptyMessage="Không có dữ liệu."
                        >
                            <Column
                                body={indexBodyTemplate}
                                header="#"
                                bodyClassName="text-center"
                            />
                            <Column
                                body={questionContentBodyTemplate}
                                field="content"
                                header="Nội dung câu"
                                sortable
                            ></Column>
                            <Column
                                body={subjectNameBodyTemplate}
                                field="subjectName"
                                header="Môn học"
                                bodyClassName="text-center"
                                sortable
                            ></Column>
                            <Column
                                body={leverBodyTemplate}
                                field="lever"
                                header="Độ khó"
                                bodyClassName="text-center"
                                sortable
                            ></Column>
                            <Column
                                body={actionBodyTemplate}
                                header={<FaEllipsisVertical />}
                                bodyClassName="text-center"
                            ></Column>
                        </DataTable>
                    </div>
                )}
                {/* End body */}
            </Wrapper>

            {/* Dialog create */}
            <Dialog
                header={headerDialog('Thêm câu hỏi')}
                visible={visibleCreate}
                className={clsx(style.dialog)}
                modal
                onHide={() => {
                    if (!visibleCreate) return;
                    setVisibleCreate(false);
                }}
                style={{ width: '50vw' }}
                draggable={false}
            >
                <form className="form" onSubmit={handleCreate}>
                    <div className="input-row-2">
                        <FloatLabel>
                            <Dropdown
                                value={selectedSubject}
                                onChange={(e) => setSelectedSubject(e.value)}
                                options={subjects}
                                optionLabel="subjectName"
                                placeholder="Chọn môn"
                                className="dropdown input-number"
                                id="subject"
                            />
                            <label htmlFor="subject">Môn học </label>
                        </FloatLabel>
                        <FloatLabel>
                            <Dropdown
                                value={lever}
                                onChange={(e) => setLever(e.value)}
                                options={optionLevers}
                                optionLabel="name"
                                placeholder="Chọn độ khó"
                                className="dropdown input-number"
                                id="lever"
                            />
                            <label htmlFor="lever">Độ khó </label>
                        </FloatLabel>
                    </div>
                    <div>
                        <FloatLabel>
                            <InputTextarea
                                className="input"
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={5}
                                cols={30}
                            />
                            <label htmlFor="content">
                                Nhập nội dung câu hỏi
                            </label>
                        </FloatLabel>
                    </div>
                    <div className={clsx(style.answers)}>
                        <div className={clsx(style.answer_tag)}>
                            Thêm đáp án
                        </div>
                        <div className={clsx(style.add_answer)}>
                            <div className={clsx(style.input)}>
                                <InputText
                                    placeholder="Vd: câu trả lời 1..."
                                    id="add-answer"
                                    className="input"
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                />
                            </div>
                            <div className={clsx(style.action)}>
                                {isUpdateAnswer ? (
                                    <div
                                        className={clsx(style.button_container)}
                                    >
                                        <Button
                                            destroy
                                            type="button"
                                            onClick={closeUpdateAnswer}
                                        >
                                            <FaXmark />
                                        </Button>
                                        <Button
                                            primary
                                            type="button"
                                            onClick={handleUpdateAnswer}
                                        >
                                            <FaCheck />
                                        </Button>
                                    </div>
                                ) : (
                                    <Button
                                        primary
                                        onClick={handleAddAnswer}
                                        type="button"
                                    >
                                        <FaPlus />
                                    </Button>
                                )}
                            </div>
                        </div>
                        <div className={clsx(style.list_answer)}>
                            {answers.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={clsx(style.answer)}
                                    >
                                        <RadioButton
                                            inputId={item.key}
                                            name="answer"
                                            onChange={() =>
                                                handleAnswerChange(item.key)
                                            }
                                            checked={item.isAnswer === true}
                                        />
                                        <label
                                            htmlFor={item.key}
                                            className={clsx(style.label_radio)}
                                        >
                                            {item.content}
                                        </label>
                                        <div
                                            className={clsx(
                                                style.wrap_edit_answer_button
                                            )}
                                        >
                                            <Button
                                                type="button"
                                                className={clsx(
                                                    style.action_button
                                                )}
                                                edit
                                                outline
                                                onClick={() =>
                                                    handleEditAnswer(index)
                                                }
                                            >
                                                <FaPencil />
                                            </Button>
                                            <Button
                                                type="button"
                                                className={clsx(
                                                    style.action_button
                                                )}
                                                onClick={() =>
                                                    handleRemoveAnswer(index)
                                                }
                                                trash
                                                outline
                                            >
                                                <FaRegTrashCan />
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="form_action">
                        <Button
                            type="button"
                            onClick={() => setVisibleCreate(false)}
                        >
                            Huỷ
                        </Button>
                        <Button primary type="submit">
                            Lưu
                        </Button>
                    </div>
                </form>
            </Dialog>
            {/* /Dialog  create */}

            {/* Dialog edit */}
            <Dialog
                header={headerDialog('Cập nhật câu hỏi')}
                visible={visibleEdit}
                className={clsx(style.dialog)}
                modal
                onHide={onclickHideUpdate}
                style={{ width: '50vw' }}
                draggable={false}
            >
                <form className="form">
                    <div className="input-row-2">
                        <FloatLabel>
                            <Dropdown
                                value={selectedSubject}
                                onChange={(e) => setSelectedSubject(e.value)}
                                options={subjects}
                                optionLabel="subjectName"
                                placeholder="Chọn môn"
                                className="dropdown input-number"
                                id="subject"
                            />
                            <label htmlFor="subject">Môn học </label>
                        </FloatLabel>
                        <FloatLabel>
                            <Dropdown
                                value={lever}
                                onChange={(e) => setLever(e.value)}
                                options={optionLevers}
                                optionLabel="name"
                                placeholder="Chọn độ khó"
                                className="dropdown input-number"
                                id="lever"
                            />
                            <label htmlFor="lever">Độ khó </label>
                        </FloatLabel>
                    </div>
                    <div>
                        <FloatLabel>
                            <InputTextarea
                                className="input"
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                            <label htmlFor="content">
                                Nhập nội dung câu hỏi
                            </label>
                        </FloatLabel>
                    </div>
                    <div className={clsx(style.answers)}>
                        <div className={clsx(style.answer_tag)}>
                            Thêm đáp án
                        </div>
                        <div className={clsx(style.add_answer)}>
                            <div className={clsx(style.input)}>
                                <InputText
                                    placeholder="Vd: câu trả lời 1..."
                                    id="add-answer"
                                    className="input"
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                />
                            </div>
                            <div className={clsx(style.action)}>
                                {isUpdateAnswer ? (
                                    <div
                                        className={clsx(style.button_container)}
                                    >
                                        <Button
                                            destroy
                                            type="button"
                                            onClick={closeUpdateAnswer}
                                        >
                                            <FaXmark />
                                        </Button>
                                        <Button
                                            primary
                                            type="button"
                                            onClick={handleUpdateAnswer}
                                        >
                                            <FaCheck />
                                        </Button>
                                    </div>
                                ) : (
                                    <Button
                                        primary
                                        onClick={handleAddAnswer}
                                        type="button"
                                    >
                                        <FaPlus />
                                    </Button>
                                )}
                            </div>
                        </div>
                        <div className={clsx(style.list_answer)}>
                            {answers.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={clsx(style.answer)}
                                    >
                                        <RadioButton
                                            inputId={item.key}
                                            name="answer"
                                            onChange={() =>
                                                handleAnswerChange(item.key)
                                            }
                                            checked={item.isAnswer === true}
                                        />
                                        <label
                                            htmlFor={item.key}
                                            className={clsx(style.label_radio)}
                                        >
                                            {item.content}
                                        </label>
                                        <div
                                            className={clsx(
                                                style.wrap_edit_answer_button
                                            )}
                                        >
                                            <Button
                                                type="button"
                                                className={clsx(
                                                    style.action_button
                                                )}
                                                edit
                                                outline
                                                onClick={() =>
                                                    handleEditAnswer(index)
                                                }
                                            >
                                                <FaPencil />
                                            </Button>
                                            <Button
                                                type="button"
                                                className={clsx(
                                                    style.action_button
                                                )}
                                                onClick={() =>
                                                    handleRemoveAnswer(index)
                                                }
                                                trash
                                                outline
                                            >
                                                <FaRegTrashCan />
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="form_action">
                        <Button type="button" onClick={onclickHideUpdate}>
                            Huỷ
                        </Button>
                        <Button primary type="submit">
                            Lưu
                        </Button>
                    </div>
                </form>
            </Dialog>
            {/* /Dialog  edit */}

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
                <form className="form" onSubmit={submitDelete}>
                    <p>Bạn có chắc muốn xoá câu hỏi này?</p>
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

export default Question;
