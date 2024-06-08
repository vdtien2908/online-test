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
    const [isUpdateAnswer, setIsUpdateAnswer] = useState(false);

    // Sort
    const [selectedSubject, setSelectedSubject] = useState({});
    const [selectedLever, setSelectedLever] = useState({});
    const [searchValue, setSearchValue] = useState('');
    const debounce = useDebounce(searchValue, 500);

    const optionLevers = [
        { name: 'Cơ bản', code: 1 },
        { name: 'Trung bình', code: 2 },
        { name: 'Nâng cao', code: 3 },
    ];

    // Data
    const [questions, setQuestions] = useState([]);
    const [subjects, setSubjects] = useState([]);
    // Row data
    const [content, setContent] = useState(undefined);
    const [subjectId, setSubjectId] = useState(undefined);
    const [lever, setLever] = useState({});
    const [answers, setAnswers] = useState([]);
    const [answer, setAnswer] = useState(undefined);

    const init = async () => {
        try {
            setLoading(true);
            const req = await axios.get(`${baseUrl}/api/questions`, {
                params: {
                    search: searchValue,
                    lever: selectedLever.code,
                    subjectId: selectedSubject.id,
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
    }, [selectedSubject, selectedLever, debounce]);

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="table_action">
                <Tooltip content="Chỉnh sửa">
                    <span>
                        <Button
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

    const indexBodyTemplate = (data, props) => {
        return props.rowIndex + 1;
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
        return rowData.SubjectModel.subjectName;
    };

    const toastMessage = (type, title, message, life = 3000) => {
        toastRef.current.show({
            severity: type,
            summary: title,
            detail: `${message}`,
            life: life,
        });
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
                                value={selectedSubject}
                                onChange={(e) => setSelectedSubject(e.value)}
                                options={subjects}
                                optionLabel="subjectName"
                                placeholder="Chọn môn"
                                className="dropdown"
                            />
                        )}

                        {/* Selected lever */}
                        <Dropdown
                            value={selectedLever}
                            onChange={(e) => setSelectedLever(e.value)}
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
                        {(Object.keys(selectedSubject).length !== 0 ||
                            Object.keys(selectedLever).length !== 0 ||
                            searchValue) && (
                            <Button
                                leftIcon={<FaFilterCircleXmark />}
                                onClick={() => {
                                    setSearchValue('');
                                    setSelectedLever({});
                                    setSelectedSubject({});
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

            {/* Dialog  create */}
            <Dialog
                header={headerDialog('Thêm câu hỏi')}
                visible={visibleCreate}
                style={{ width: '50vw' }}
                onHide={() => {
                    if (!visibleCreate) return;
                    setVisibleCreate(false);
                }}
                draggable={false}
            >
                <form className="form">
                    <div className="input-row-2">
                        <FloatLabel>
                            <Dropdown
                                value={lever}
                                onChange={(e) => setLever(e.value)}
                                options={subjects}
                                optionLabel="subjectName"
                                placeholder="Chọn môn"
                                className="dropdown input-number"
                                id="lever"
                            />
                            <label htmlFor="lever">Môn học </label>
                        </FloatLabel>
                        <FloatLabel>
                            <Dropdown
                                value={lever}
                                onChange={(e) => setLever(e.value)}
                                options={optionLevers}
                                optionLabel="name"
                                placeholder="Chọn môn"
                                className="dropdown input-number"
                                id="lever"
                            />
                            <label htmlFor="lever">Độ khó </label>
                        </FloatLabel>
                    </div>
                    <div>
                        <label className="ml-2">Nội dung câu hỏi:</label>
                        <Editor
                            value={content}
                            onTextChange={(e) => setContent(e.htmlValue)}
                            style={{ height: '150px' }}
                        />
                    </div>
                    <div className={clsx(style.answers)}>
                        <div className={clsx(style.add_answer)}>
                            <div className={clsx(style.input)}>
                                <FloatLabel>
                                    <InputText
                                        className="input"
                                        value={answer}
                                        onChange={(e) =>
                                            setAnswer(e.target.value)
                                        }
                                    />
                                    <label htmlFor="lever">Thêm đáp án </label>
                                </FloatLabel>
                            </div>
                            <div className={clsx(style.action)}>
                                {isUpdateAnswer ? (
                                    <div
                                        className={clsx(style.button_container)}
                                    >
                                        <Button destroy>
                                            <FaXmark />
                                        </Button>
                                        <Button primary>
                                            <FaCheck />
                                        </Button>
                                    </div>
                                ) : (
                                    <Button primary>
                                        <FaPlus />
                                    </Button>
                                )}
                            </div>
                        </div>
                        <div className={clsx(style.list_answer)}>
                            <div key={1} className={clsx(style.answer)}>
                                <RadioButton name={`answer`} />
                                <label
                                    htmlFor={1}
                                    className={clsx(style.label_radio)}
                                >
                                    Đáp án 1
                                </label>
                            </div>
                            <div key={1} className={clsx(style.answer)}>
                                <RadioButton name={`answer`} />
                                <label
                                    htmlFor={1}
                                    className={clsx(style.label_radio)}
                                >
                                    Đáp án 2
                                </label>
                            </div>
                            <div key={1} className={clsx(style.answer)}>
                                <RadioButton name={`answer`} />
                                <label
                                    htmlFor={1}
                                    className={clsx(style.label_radio)}
                                >
                                    Đáp án 3
                                </label>
                            </div>
                            <div key={1} className={clsx(style.answer)}>
                                <RadioButton name={`answer`} />
                                <label
                                    htmlFor={1}
                                    className={clsx(style.label_radio)}
                                >
                                    Đáp án 4
                                </label>
                            </div>
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
        </>
    );
}

export default Question;
