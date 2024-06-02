import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState, useRef } from 'react';
import { FaPencil, FaRegTrashCan, FaEllipsisVertical } from 'react-icons/fa6';
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

function Subject() {
    const axios = useAxiosWithAuth();
    const toastRef = useRef(null);
    const [visible, setVisible] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState({
        name: 'Cũ nhất',
        code: 'ASC',
    });
    const [searchValue, setSearchValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [subjects, setSubjects] = useState([]);

    // Debounce
    const debounce = useDebounce(searchValue, 500);

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

    useEffect(() => {
        const fetchApi = async () => {
            try {
                setLoading(true);
                const req = await axios.get(
                    `${process.env.REACT_APP_BASE_URL}/api/subjects`,
                    {
                        params: {
                            search: debounce,
                            sort: selectedSubject.code,
                        },
                    }
                );
                setLoading(false);
                setSubjects(req.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchApi();
    }, [selectedSubject, axios, debounce]);

    const handleEdit = (id) => {
        console.log(id);
    };

    const handleDelete = (id) => {
        console.log(id);
    };

    const actionBodyTemplate = (rowData, props) => {
        return (
            <div className="table_action">
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

    // Header dialog
    const headerDialog = (
        <div className="header_dialog">
            <h2>Thêm môn học mới</h2>
        </div>
    );

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
        const fetchApi = async () => {
            try {
                setVisible(false);
                setLoading(true);
                const req = await axios.post(
                    `${process.env.REACT_APP_BASE_URL}/api/subjects`,
                    data
                );
                setLoading(false);
                const newSubject = req.data.newSubject;
                setSubjects((prevSubjects) => [...prevSubjects, newSubject]);
                showSuccess(newSubject.subjectName);
                setSearchValue('');
            } catch (error) {
                if (
                    error.response.data.message ===
                    'The subject name already exists!'
                ) {
                    showExists();
                } else {
                    showError();
                }
                setVisible(false);
                setLoading(false);
            }
        };

        fetchApi();
        setSubjectName('');
        setNumberCredits(undefined);
        setNumberOfPracticalLessons(undefined);
        setNumberOfTheoryLessons(undefined);
    };

    const showIsEmptyData = () => {
        toastRef.current.show({
            severity: 'warn',
            summary: 'Cảnh báo',
            detail: 'Vui lòng nhập Đầy đủ thông tin!',
            life: 3000,
        });
    };

    const showExists = () => {
        toastRef.current.show({
            severity: 'error',
            summary: 'Cảnh báo',
            detail: 'Tên môn học đã tồn tại!',
            life: 3000,
        });
    };

    const showSuccess = (subjectName) => {
        toastRef.current.show({
            severity: 'success',
            summary: 'Thêm thành công',
            detail: `Môn học ${subjectName} được thêm thành công.`,
            life: 3000,
        });
    };

    const showError = () => {
        toastRef.current.show({
            severity: 'error',
            summary: 'Lỗi máy chủ',
            detail: 'Lỗi máy chủ vui lòng thử lại sau',
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
                            setVisible(true);
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
            <Dialog
                header={headerDialog}
                visible={visible}
                style={{ width: '50vw' }}
                onHide={() => {
                    if (!visible) return;
                    setVisible(false);
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
                        <Button type="button" onClick={() => setVisible(false)}>
                            Huỷ
                        </Button>
                        <Button primary type="submit">
                            Thêm
                        </Button>
                    </div>
                </form>
            </Dialog>
        </>
    );
}

export default Subject;
