import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState, useRef, useEffect } from 'react';
import {
    FaRegTrashCan,
    FaEllipsisVertical,
    FaFilterCircleXmark,
} from 'react-icons/fa6';

// React prime
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { FloatLabel } from 'primereact/floatlabel';

import clsx from 'clsx';

// Style css
import style from './Assignment.module.scss';

// Import component
import TopPage from '~/components/TopPage';
import Search from '~/components/Search';
import Dropdown from '~/components/Dropdown';
import Button from '~/components/Button';
import Tooltip from '~/components/Tooltip';
import Wrapper from '~/components/Wrapper';
import Loading from '~/components/Loading';

// Hooks
import { useDebounce, useAxiosWithAuth } from '~/hooks';

const baseUrl = process.env.REACT_APP_BASE_URL;
function Assignment() {
    const toastRef = useRef(null);
    const axios = useAxiosWithAuth();

    // Display
    const [loading, setLoading] = useState(false);
    const [loadingSort, setLoadingSort] = useState(false);
    const [visibleCreate, setVisibleCreate] = useState(false);
    const [visibleDelete, setVisibleDelette] = useState(false);

    // Sort
    const [selectedSubjectSort, setSelectedSubjectSort] = useState({});
    const [searchValue, setSearchValue] = useState('');

    // Data
    const [subjects, setSubjects] = useState([]);

    const [selectedSubject, setSelectedSubject] = useState({});
    const [selectedUser, setSelectedUser] = useState({});
    const [users, setUser] = useState([]);
    const [assignments, setAssignments] = useState([]);

    const debounce = useDebounce(searchValue, 500);

    // Init function
    const init = async () => {
        try {
            setLoading(true);
            const req = await axios.get(`${baseUrl}/api/assignments`, {
                params: {
                    userName: debounce,
                    subjectId: selectedSubjectSort.id,
                },
            });
            setLoading(false);
            setAssignments(req.data.data);
        } catch (error) {
            toastMessage('error', 'Lỗi', error.response.data.message);
        }
    };

    useEffect(() => {
        init();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedSubjectSort, debounce]);

    useEffect(() => {
        (async () => {
            try {
                setLoadingSort(true);
                const req = await axios.get(`${baseUrl}/api/subjects`);
                setLoadingSort(false);
                setSubjects(req.data.data);
            } catch (error) {
                toastMessage('error', 'Lỗi', error.response.data.message);
            }
        })();
    }, [axios]);

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="table_action">
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

    const userNameBodyTemplate = (rowData) => {
        return rowData.UserModel.fullName;
    };

    const SubjectNameBodyTemplate = (rowData) => {
        return rowData.SubjectModel.subjectName;
    };

    const subjectIdBodyTemplate = (rowData) => {
        return rowData.SubjectModel.id;
    };

    const toastMessage = (type, title, message, life = 3000) => {
        toastRef.current.show({
            severity: type,
            summary: title,
            detail: `${message}`,
            life: life,
        });
    };

    const handleClearSort = () => {
        setSearchValue('');
        setSelectedSubjectSort({});
    };

    const handleChangSubject = (subject) => {
        console.log(subject);
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
                {/* Start Head  */}
                <div className={style.head}>
                    <TopPage
                        title="Danh sách phân công"
                        textButton="Thêm phân công"
                        onClick={() => setVisibleCreate(true)}
                    />
                    <div className="head_body">
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
                                placeholder="Tất cả"
                                className="dropdown"
                            />
                        )}
                        <Search
                            value={searchValue}
                            placeholder="Tìm kiếm giảng viên..."
                            className={clsx(style.search)}
                            onClear={() => {
                                setSearchValue('');
                            }}
                            onChange={(e) => {
                                setSearchValue(e.target.value);
                            }}
                        />

                        {(Object.keys(selectedSubjectSort).length !== 0 ||
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

                {loading && (
                    <div className="loading-container">
                        <Loading />
                    </div>
                )}

                {/* Start body */}
                {!loading && (
                    <div className={style.body}>
                        <DataTable
                            value={assignments}
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
                                body={userNameBodyTemplate}
                                field="lecturerName"
                                header="Tên giảng viên"
                                bodyClassName="text-center"
                                sortable
                            ></Column>
                            <Column
                                body={subjectIdBodyTemplate}
                                field="subjectCode"
                                header="Mã môn học"
                                bodyClassName="text-center"
                                sortable
                            ></Column>
                            <Column
                                body={SubjectNameBodyTemplate}
                                field="subjectName"
                                header="Tên môn"
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
                header={headerDialog('Thêm Lớp học phần')}
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
                                value={selectedSubject}
                                onChange={(e) =>
                                    handleChangSubject(e.target.value)
                                }
                                options={subjects}
                                optionLabel="subjectName"
                                placeholder="Chọn môn học"
                                className="input-number dropdown"
                            />
                            <label htmlFor="subject">Môn học</label>
                        </FloatLabel>
                        <FloatLabel>
                            <Dropdown
                                value={selectedUser}
                                onChange={(e) => setSelectedUser(e.value)}
                                options={users}
                                optionLabel="semester"
                                placeholder="Chọn giảng viên"
                                className="input-number dropdown"
                            />
                            <label htmlFor="semester">Giảng viên</label>
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
        </>
    );
}

export default Assignment;
