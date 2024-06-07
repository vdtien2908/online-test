import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState, useRef, useEffect } from 'react';
import {
    FaPencil,
    FaRegTrashCan,
    FaEllipsisVertical,
    FaFilterCircleXmark,
} from 'react-icons/fa6';
import clsx from 'clsx';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { Toast } from 'primereact/toast';
import { Calendar } from 'primereact/calendar';

// Style css
import style from './User.module.scss';

// Import component
import TopPage from '~/components/TopPage';
import Search from '~/components/Search';
import Dropdown from '~/components/Dropdown';
import Button from '~/components/Button';
import Tooltip from '~/components/Tooltip';
import Wrapper from '~/components/Wrapper';
import Loading from '~/components/Loading';
import { useAxiosWithAuth, useDebounce } from '../../hooks';

const baseUrl = process.env.REACT_APP_BASE_URL;

function User() {
    const axios = useAxiosWithAuth();

    // Display
    const [visibleCreate, setVisibleCreate] = useState(false);
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [visibleDelete, setVisibleDelete] = useState(false);

    // Sort
    const [searchValue, setSearchValue] = useState('');
    const [selectedRole, setSelectedRole] = useState({});
    const [loading, setLoading] = useState(false);
    const toastRef = useRef(null);

    const debounce = useDebounce(searchValue, 500);

    // Data
    const [users, setUsers] = useState([]);
    const [fullName, setFullName] = useState(undefined);
    const [gender, setGender] = useState(undefined);
    const [role, setRole] = useState(undefined);
    const [email, setEmail] = useState(undefined);
    const [phoneNumber, setPhoneNumber] = useState(undefined);
    const [dob, setDob] = useState(undefined);
    const [userId, setUserId] = useState(undefined);

    const options = [
        { name: 'Sinh viên', code: 2 },
        { name: 'Giảng viên', code: 3 },
    ];

    const init = async () => {
        try {
            setLoading(true);
            const req = await axios.get(`${baseUrl}/api/users`, {
                params: {
                    search: debounce,
                    roleId: selectedRole.code,
                },
            });
            setLoading(false);
            setUsers(req.data.data);
        } catch (error) {
            toastMessage('error', 'Lỗi', error.response.data.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        init();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedRole, debounce]);

    const onClickEdit = (id) => {
        setVisibleEdit(true);
        (async () => {
            try {
                setLoading(true);
                const req = await axios.get(`${baseUrl}/api/users/${id}`);
                setLoading(false);
                const user = req.data.data;
                console.log(user);

                // Set data edit input
                setUserId(user.id);
                setFullName(user.fullName);
                setDob(new Date(user.dob));
                if (user.gender === true) {
                    setGender({ gender: 'Nữ', code: 1 });
                } else {
                    setGender({ gender: 'Nam', code: 0 });
                }
                if (user.roleId === 2) {
                    setRole({
                        roleName: 'Sinh viên',
                        code: 2,
                    });
                } else {
                    setRole({
                        roleName: 'Giảng viên',
                        code: 3,
                    });
                }
                setPhoneNumber(user.phoneNumber);
                setEmail(user.email);
            } catch (error) {
                toastMessage('error', 'Lỗi', error.response.data.message);
                setLoading(false);
            }
        })();
    };

    const onclickDelete = (id) => {
        setVisibleDelete(true);
        setUserId(id);
    };

    // Handle create
    const handleCreate = (e) => {
        e.preventDefault();
        if (
            !fullName ||
            email === undefined ||
            dob === undefined ||
            gender === undefined ||
            phoneNumber === undefined ||
            role === undefined
        ) {
            return toastMessage(
                'warn',
                'Cảnh báo',
                'Vui lòng nhập đầy đủ dữ liệu'
            );
        }

        (async () => {
            try {
                setVisibleCreate(false);
                setLoading(true);
                await axios.post(`${baseUrl}/api/users`, {
                    fullName,
                    gender: gender.code,
                    roleId: role.code,
                    dob,
                    phoneNumber,
                    email,
                });
                setLoading(false);
                toastMessage(
                    'success',
                    'Thành công',
                    `Người dùng ${fullName} được thêm thành công`
                );
                init();
            } catch (error) {
                toastMessage('error', 'Lỗi', error.response.data.message);
                setLoading(false);
                setVisibleCreate(false);
            }
        })();

        setFullName('');
        setDob(undefined);
        setGender(undefined);
        setRole(undefined);
        setPhoneNumber(undefined);
        setEmail(undefined);
    };

    // Handle Update
    const handleUpdate = (e) => {
        e.preventDefault();

        e.preventDefault();
        if (
            !fullName ||
            email === undefined ||
            dob === undefined ||
            gender === undefined ||
            phoneNumber === undefined ||
            role === undefined
        ) {
            return toastMessage(
                'warn',
                'Cảnh báo',
                'Vui lòng nhập đầy đủ dữ liệu'
            );
        }

        (async () => {
            try {
                setVisibleEdit(false);
                setLoading(true);
                await axios.put(`${baseUrl}/api/users/${userId}`, {
                    fullName,
                    gender: gender.code,
                    roleId: role.code,
                    dob,
                    phoneNumber,
                    email,
                });
                setLoading(false);
                toastMessage(
                    'success',
                    'Thành công',
                    `Người dùng ${fullName} được cập nhật thành công`
                );
                init();
            } catch (error) {
                toastMessage('error', 'Lỗi', error.response.data.message);
                setLoading(false);
                setVisibleEdit(false);
            }
        })();
    };

    // handle delete
    const handleDelete = (e) => {
        e.preventDefault();
        (async () => {
            try {
                setVisibleDelete(false);
                setLoading(true);
                await axios.delete(`${baseUrl}/api/users/${userId}`);
                setLoading(false);
                init(); // Call function init
                toastMessage(
                    'success',
                    'Thành công',
                    'Người dùng được xoá thành công!'
                );
                setSearchValue('');
            } catch (error) {
                toastMessage('error', 'Lỗi', error.response.data.message);
                setVisibleDelete(false);
                setLoading(false);
            }
        })();
    };

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
                            onClick={() => onClickEdit(rowData.id)}
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
                            onClick={() => onclickDelete(rowData.id)}
                        />
                    </span>
                </Tooltip>
            </div>
        );
    };

    const genderBodyTemplate = (rowData) => {
        if (rowData.gender === true) {
            return 'Nữ';
        }
        return 'Nam';
    };

    const indexBodyTemplate = (data, props) => {
        return props.rowIndex + 1;
    };

    const roleBodyTemplate = (rowData) => {
        return rowData.RoleModel.RoleName;
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
        setSelectedRole({});
        setSearchValue('');
    };

    // Header dialog
    const headerDialog = (title) => {
        return (
            <div className="header_dialog">
                <h2>{title}</h2>
            </div>
        );
    };

    return (
        <Wrapper>
            <Toast ref={toastRef} />
            {/* Start Head  */}
            <div className={style.head}>
                <TopPage
                    title="Danh sách người dùng"
                    textButton="Thêm người dùng"
                    onClick={() => {
                        setVisibleCreate(true);
                        setFullName('');
                        setDob(undefined);
                        setGender(undefined);
                        setRole(undefined);
                        setPhoneNumber(undefined);
                        setEmail(undefined);
                    }}
                />
                <div className="head_body">
                    <Dropdown
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        options={options}
                        optionLabel="name"
                        placeholder="Tất cả"
                        className="dropdown"
                    />
                    <Search
                        value={searchValue}
                        placeholder="Tìm kiếm người dùng..."
                        className={clsx(style.search)}
                        onChange={(e) => {
                            setSearchValue(e.target.value);
                        }}
                    />
                    {(Object.keys(selectedRole).length !== 0 ||
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
                        emptyMessage="Không có dữ liệu"
                        value={users}
                        showGridlines
                        stripedRows
                        paginator
                        rowsPerPageOptions={[5, 10, 15, 20]}
                        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                        rows={10}
                        currentPageReportTemplate="Trang {currentPage} / {totalPages}"
                    >
                        <Column
                            body={indexBodyTemplate}
                            header="#"
                            bodyClassName="text-center"
                        />
                        <Column
                            field="code"
                            header="Mã số"
                            bodyClassName="text-center"
                            sortable
                        ></Column>
                        <Column
                            field="fullName"
                            header="Họ tên"
                            bodyClassName="text-center"
                            sortable
                        ></Column>
                        <Column
                            field="gender"
                            header="Giới tính"
                            bodyClassName="text-center"
                            body={genderBodyTemplate}
                            sortable
                        ></Column>
                        <Column
                            body={roleBodyTemplate}
                            header="Quyền"
                            bodyClassName="text-center"
                            sortable
                        ></Column>
                        <Column
                            field="email"
                            header="Email"
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

            {/* Dialog  create */}
            <Dialog
                header={headerDialog('Thêm người dùng mới')}
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
                            id="fullName"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                        <label htmlFor="fullName">Tên Người dùng</label>
                    </FloatLabel>
                    <FloatLabel>
                        <InputText
                            className="input"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="email">Địa chỉ email</label>
                    </FloatLabel>
                    <div className="input-row-2">
                        <FloatLabel>
                            <InputText
                                className="input"
                                id="phoneNumber"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                            <label htmlFor="phoneNumber">Số điện thoại</label>
                        </FloatLabel>
                        <FloatLabel>
                            <Dropdown
                                value={role}
                                onChange={(e) => setRole(e.value)}
                                options={[
                                    {
                                        roleName: 'Sinh viên',
                                        code: 2,
                                    },
                                    {
                                        roleName: 'Giảng viên',
                                        code: 3,
                                    },
                                ]}
                                optionLabel="roleName"
                                placeholder="Chọn quyền"
                                className="input-number dropdown"
                            />
                            <label htmlFor="role">Phân quyền</label>
                        </FloatLabel>
                    </div>
                    <div className="input-row-2">
                        <FloatLabel>
                            <Calendar
                                className="input-number"
                                inputId="dob"
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                                dateFormat="dd/mm/yy"
                            />
                            <label htmlFor="dob">Ngày sinh</label>
                        </FloatLabel>
                        <FloatLabel>
                            <Dropdown
                                value={gender}
                                onChange={(e) => setGender(e.value)}
                                options={[
                                    {
                                        gender: 'Nam',
                                        code: 0,
                                    },
                                    {
                                        gender: 'Nữ',
                                        code: 1,
                                    },
                                ]}
                                optionLabel="gender"
                                placeholder="Chọn giới tính"
                                className="input-number dropdown"
                            />
                            <label htmlFor="gender">Giới tính</label>
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

            {/* Dialog  edit */}
            <Dialog
                header={headerDialog('Cập nhật người dùng')}
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
                            id="fullName"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                        <label htmlFor="fullName">Tên Người dùng</label>
                    </FloatLabel>
                    <FloatLabel>
                        <InputText
                            className="input"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="email">Địa chỉ email</label>
                    </FloatLabel>
                    <FloatLabel>
                        <InputText
                            className="input"
                            id="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <label htmlFor="phoneNumber">Số điện thoại</label>
                    </FloatLabel>
                    <div className="input-row-2">
                        <FloatLabel>
                            <Calendar
                                className="input-number"
                                inputId="dob"
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                                dateFormat="dd/mm/yy"
                            />
                            <label htmlFor="dob">Ngày sinh</label>
                        </FloatLabel>
                        <FloatLabel>
                            <Dropdown
                                value={gender}
                                onChange={(e) => setGender(e.value)}
                                options={[
                                    {
                                        gender: 'Nam',
                                        code: 0,
                                    },
                                    {
                                        gender: 'Nữ',
                                        code: 1,
                                    },
                                ]}
                                optionLabel="gender"
                                placeholder="Chọn giới tính"
                                className="input-number dropdown"
                            />
                            <label htmlFor="gender">Giới tính</label>
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
            {/* /Dialog  edit */}

            {/* Dialog delete */}
            <Dialog
                header={headerDialog('Xoá người dùng')}
                visible={visibleDelete}
                style={{ width: '400px' }}
                onHide={() => {
                    if (!visibleDelete) return;
                    setVisibleDelete(false);
                }}
                draggable={false}
            >
                <form className="form" onSubmit={handleDelete}>
                    <p>Bạn có chắc muốn xoá người dùng này?</p>
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
        </Wrapper>
    );
}

export default User;
