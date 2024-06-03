import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState, useRef } from 'react';
import {
    FaPencil,
    FaRegTrashCan,
    FaEllipsisVertical,
    FaCircleInfo,
} from 'react-icons/fa6';
import clsx from 'clsx';
// import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { Toast } from 'primereact/toast';
import { InputNumber } from 'primereact/inputnumber';

// Style css
import style from './Subject.module.scss';

// Import component
import TopPage from '~/components/TopPage';
import Search from '~/components/Search';
import Dropdown from '~/components/Dropdown';
import Button from '~/components/Button';
import Tooltip from '~/components/Tooltip';
import Wrapper from '~/components/Wrapper';

// Hooks
import { useAxiosWithAuth, useDebounce } from '~/hooks';

const baseUrl = process.env.REACT_APP_BASE_URL;

function Subject() {
    const axios = useAxiosWithAuth();
    const toastRef = useRef(null);

    // Display state
    const [visibleCreate, setVisibleCreate] = useState(false);
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [visibleDelete, setVisibleDelete] = useState(false);
    const [loading, setLoading] = useState(false);
    const [subjects, setSubjects] = useState([]);

    // Sort search
    const [selectedSubject, setSelectedSubject] = useState({
        name: 'Mới nhất',
        code: 'DESC',
    });
    const [searchValue, setSearchValue] = useState('');

    // Debounce
    const debounce = useDebounce(searchValue, 500);

    // Data row
    const [subjectId, setSubjectID] = useState(undefined);
    const [subjectName, setSubjectName] = useState('');
    const [numberCredits, setNumberCredits] = useState(undefined);
    const [numberOfPracticalLessons, setNumberOfPracticalLessons] =
        useState(undefined);
    const [numberOfTheoryLessons, setNumberOfTheoryLessons] =
        useState(undefined);

    const options = [
        { name: 'Mới nhất', code: 'DESC' },
        { name: 'Cũ nhất', code: 'ASC' },
    ];

    // Init function
    const fetchApi = async () => {
        try {
            setLoading(true);
            const req = await axios.get(`${baseUrl}/api/subjects`, {
                params: {
                    search: debounce,
                    sort: selectedSubject.code,
                },
            });
            setLoading(false);
            setSubjects(req.data.data);
        } catch (error) {
            showError(error.response.data.message);
        }
    };

    useEffect(() => {
        fetchApi();
    }, [selectedSubject, axios, debounce]);

    const handleEdit = (id) => {
        setVisibleEdit(true);
        (async () => {
            try {
                setLoading(true);
                const req = await axios.get(`${baseUrl}/api/subjects/${id}`);
                setLoading(false);
                const [subject] = req.data.data;

                // Set data edit input
                setSubjectID(subject.id);
                setSubjectName(subject.subjectName);
                setNumberCredits(subject.numberCredits);
                setNumberOfPracticalLessons(subject.numberOfPracticalLessons);
                setNumberOfTheoryLessons(subject.numberOfTheoryLessons);
            } catch (error) {
                showError(error.response.data.message);
                setLoading(false);
            }
        })();
    };

    const handleDelete = (id) => {
        setSubjectID(id);
        setVisibleDelete(true);
    };

    const actionBodyTemplate = (rowData, props) => {
        return (
            <div className="table_action">
                <Tooltip content="Chi tiết">
                    <span>
                        <Button
                            className="table_icon"
                            outline
                            show
                            leftIcon={<FaCircleInfo />}
                            onClick={() => {
                                handleEdit(rowData.id);
                            }}
                        />
                    </span>
                </Tooltip>
                <Tooltip content="Chỉnh sửa">
                    <span>
                        <Button
                            className="table_icon"
                            outline
                            edit
                            leftIcon={<FaPencil />}
                            onClick={() => {
                                handleEdit(rowData.id);
                            }}
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
                            onClick={() => {
                                handleDelete(rowData.id);
                            }}
                        />
                    </span>
                </Tooltip>
            </div>
        );
    };

    const indexBodyTemplate = (data, props) => {
        return props.rowIndex + 1;
    };

    // Header dialog create
    const headerDialog = (title) => {
        return (
            <div className="header_dialog">
                <h2>{title}</h2>
            </div>
        );
    };

    // Handle Create
    const handleCreate = (e) => {
        e.preventDefault();

        if (
            !subjectName ||
            numberCredits === undefined ||
            numberOfPracticalLessons === undefined ||
            numberOfTheoryLessons === undefined
        ) {
            return showIsEmptyData();
        }

        const data = {
            subjectName,
            numberCredits,
            numberOfPracticalLessons,
            numberOfTheoryLessons,
        };
        (async () => {
            try {
                setVisibleCreate(false);
                setLoading(true);
                const req = await axios.post(`${baseUrl}/api/subjects`, data);
                setLoading(false);
                const newSubject = req.data.newSubject;
                setSubjects((prevSubjects) => [...prevSubjects, newSubject]);
                showSuccess(newSubject.subjectName);
                setSearchValue('');
            } catch (error) {
                showError(error.response.data.message);
                setVisibleCreate(false);
                setLoading(false);
            }
        })();

        setSubjectName('');
        setNumberCredits(undefined);
        setNumberOfPracticalLessons(undefined);
        setNumberOfTheoryLessons(undefined);
    };

    // Handle Update
    const handleUpdate = (e) => {
        e.preventDefault();
        if (
            !subjectName ||
            numberCredits === undefined ||
            numberOfPracticalLessons === undefined ||
            numberOfTheoryLessons === undefined
        ) {
            return showIsEmptyData();
        }

        const data = {
            subjectName,
            numberCredits,
            numberOfPracticalLessons,
            numberOfTheoryLessons,
        };

        (async () => {
            try {
                setVisibleEdit(false);
                setLoading(true);
                await axios.put(`${baseUrl}/api/subjects/${subjectId}`, data);
                setLoading(false);
                fetchApi(); // Call function init
                showSuccess(subjectName, 'cập nhật');
                setSearchValue('');
            } catch (error) {
                showError(error.response.data.message);
                setVisibleEdit(false);
                setLoading(false);
            }
        })();
    };

    // Submit delete
    const submitDelete = (e) => {
        e.preventDefault();
        (async () => {
            try {
                setVisibleDelete(false);
                setLoading(true);
                await axios.delete(`${baseUrl}/api/subjects/${subjectId}`);
                setLoading(false);
                fetchApi(); // Call function init
                showSuccess('', 'xoá');
                setSearchValue('');
            } catch (error) {
                showError(error.response.data.message);
                setVisibleDelete(false);
                setLoading(false);
            }
        })();
    };

    const showIsEmptyData = () => {
        toastRef.current.show({
            severity: 'warn',
            summary: 'Cảnh báo',
            detail: 'Vui lòng nhập Đầy đủ thông tin!',
            life: 3000,
        });
    };

    const showSuccess = (subjectName, action = 'thêm') => {
        toastRef.current.show({
            severity: 'success',
            summary: 'Thêm thành công',
            detail: `Môn học ${subjectName} được ${action} thành công.`,
            life: 3000,
        });
    };

    const showError = (message) => {
        toastRef.current.show({
            severity: 'error',
            summary: 'Lỗi',
            detail: `${message}`,
            life: 3000,
        });
    };

    return (
        <>
            <Wrapper>
                <Toast ref={toastRef} />

                {/* Start Head  */}
                <div className={style.head}>
                    <TopPage
                        title="Danh sách môn học"
                        textButton="Thêm môn học"
                        onClick={() => {
                            setSubjectName('');
                            setNumberCredits(undefined);
                            setNumberOfPracticalLessons(undefined);
                            setNumberOfTheoryLessons(undefined);
                            setVisibleCreate(true);
                        }}
                    />
                    <div className="head_body">
                        <Dropdown
                            value={selectedSubject}
                            onChange={(e) => setSelectedSubject(e.value)}
                            options={options}
                            optionLabel="name"
                            placeholder="Tất cả"
                            className="dropdown"
                        />
                        <Search
                            value={searchValue}
                            placeholder="Tìm kiếm môn học..."
                            className={clsx(style.search)}
                            onClear={() => {
                                setSearchValue('');
                            }}
                            onChange={(e) => {
                                setSearchValue(e.target.value);
                            }}
                        />
                    </div>
                </div>
                {/* End Head  */}

                {/* Start body */}
                {loading && (
                    <div className={'loading-container'}>
                        <div className="loading"></div>
                    </div>
                )}
                {!loading && (
                    <div className={style.body}>
                        <DataTable
                            value={subjects}
                            showGridlines
                            stripedRows
                            paginator
                            rowsPerPageOptions={[5, 10, 15, 20]}
                            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                            rows={10}
                            currentPageReportTemplate="Trang {currentPage} / {totalPages}"
                            emptyMessage="Không có dữ liệu"
                        >
                            <Column
                                body={indexBodyTemplate}
                                header="#"
                                bodyClassName="text-center"
                            />
                            <Column
                                field="subjectName"
                                header="Tên môn"
                                sortable
                            ></Column>
                            <Column
                                field="numberCredits"
                                header="Số tín chỉ"
                                bodyClassName="text-center"
                                sortable
                            ></Column>
                            <Column
                                field="numberOfPracticalLessons"
                                header="Thực hành"
                                bodyClassName="text-center"
                                sortable
                            ></Column>
                            <Column
                                field="numberOfTheoryLessons"
                                header="Lý thuyết"
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
                header={headerDialog('Thêm môn học mới')}
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
                        <InputText
                            className="input"
                            id="subjectName"
                            value={subjectName}
                            onChange={(e) => setSubjectName(e.target.value)}
                        />
                        <label htmlFor="subjectName">Tên môn học</label>
                    </FloatLabel>
                    <FloatLabel>
                        <InputNumber
                            className="input-number"
                            id="numberCredits"
                            value={numberCredits}
                            onValueChange={(e) => setNumberCredits(e.value)}
                            mode="decimal"
                            showButtons
                            min={1}
                            max={10}
                        />
                        <label htmlFor="numberCredits">Số tín chỉ</label>
                    </FloatLabel>
                    <div className="input-row-2">
                        <FloatLabel>
                            <InputNumber
                                className="input-number"
                                id="numberOfTheoryLessons"
                                value={numberOfTheoryLessons}
                                onValueChange={(e) =>
                                    setNumberOfTheoryLessons(e.value)
                                }
                                mode="decimal"
                                min={30}
                                max={100}
                            />
                            <label htmlFor="numberOfTheoryLessons">
                                Số tiết lý thuyết
                            </label>
                        </FloatLabel>
                        <FloatLabel>
                            <InputNumber
                                className="input-number"
                                id="numberOfPracticalLessons"
                                value={numberOfPracticalLessons}
                                onValueChange={(e) =>
                                    setNumberOfPracticalLessons(e.value)
                                }
                                mode="decimal"
                                min={0}
                                max={100}
                            />
                            <label htmlFor="numberOfPracticalLessons">
                                Số tiết thực hành
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
                            Thêm
                        </Button>
                    </div>
                </form>
            </Dialog>
            {/* /Dialog  create */}

            {/* Dialog edit */}
            <Dialog
                header={headerDialog('Cập nhật môn học')}
                visible={visibleEdit}
                style={{ width: '50vw' }}
                onHide={() => {
                    if (!visibleEdit) return;
                    setVisibleEdit(false);
                }}
                draggable={false}
            >
                <form className="form" onSubmit={handleUpdate}>
                    <FloatLabel>
                        <InputText
                            className="input"
                            id="subjectName"
                            value={subjectName}
                            onChange={(e) => setSubjectName(e.target.value)}
                        />
                        <label htmlFor="subjectName">Tên môn học</label>
                    </FloatLabel>
                    <FloatLabel>
                        <InputNumber
                            className="input-number"
                            id="numberCredits"
                            value={numberCredits}
                            onValueChange={(e) => setNumberCredits(e.value)}
                            mode="decimal"
                            showButtons
                            min={1}
                            max={10}
                        />
                        <label htmlFor="numberCredits">Số tín chỉ</label>
                    </FloatLabel>
                    <div className="input-row-2">
                        <FloatLabel>
                            <InputNumber
                                className="input-number"
                                id="numberOfTheoryLessons"
                                value={numberOfTheoryLessons}
                                onValueChange={(e) =>
                                    setNumberOfTheoryLessons(e.value)
                                }
                                mode="decimal"
                                min={30}
                                max={100}
                            />
                            <label htmlFor="numberOfTheoryLessons">
                                Số tiết lý thuyết
                            </label>
                        </FloatLabel>
                        <FloatLabel>
                            <InputNumber
                                className="input-number"
                                id="numberOfPracticalLessons"
                                value={numberOfPracticalLessons}
                                onValueChange={(e) =>
                                    setNumberOfPracticalLessons(e.value)
                                }
                                mode="decimal"
                                min={0}
                                max={100}
                            />
                            <label htmlFor="numberOfPracticalLessons">
                                Số tiết thực hành
                            </label>
                        </FloatLabel>
                    </div>
                    <div className="form_action">
                        <Button
                            type="button"
                            onClick={() => setVisibleEdit(false)}
                        >
                            Huỷ
                        </Button>
                        <Button primary type="submit">
                            Cập nhật
                        </Button>
                    </div>
                </form>
            </Dialog>
            {/* /Dialog edit */}

            {/* Dialog delete */}
            <Dialog
                header={headerDialog('Xoá môn học')}
                visible={visibleDelete}
                style={{ width: '400px' }}
                onHide={() => {
                    if (!visibleDelete) return;
                    setVisibleDelete(false);
                }}
                draggable={false}
            >
                <form className="form" onSubmit={submitDelete}>
                    <p>Bạn có chắc muốn xoá môn học này?</p>
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

export default Subject;
