import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState } from 'react';
import { FaPencil, FaRegTrashCan, FaEllipsisVertical } from 'react-icons/fa6';
import clsx from 'clsx';

// Style css
import style from './Role.module.scss';

// Import component
import TopPage from '~/components/TopPage';
import Search from '~/components/Search';
import Dropdown from '~/components/Dropdown';
import Button from '~/components/Button';
import Tooltip from '~/components/Tooltip';
import Wrapper from '~/components/Wrapper';

function Role() {
    const [selectedUser, setSelectedUser] = useState(null);
    const options = [
        { name: 'Quản trị viên', code: 'Desc' },
        { name: 'Giảng viên', code: 'ASC' },
        { name: 'Sinh viên', code: 'ASC' },
    ];
    const subjects = [
        {
            id: 1,
            roleCode: '0',
            roleName: 'Admin',
            members: 10,
        },
    ];

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

    return (
        <Wrapper>
            {/* Start Head  */}
            <div className={style.head}>
                <TopPage title="Danh sách quyền" textButton="Thêm mới" />
                <div className="head_body">
                    <Dropdown
                        value={selectedUser}
                        onChange={(e) => setSelectedUser(e.value)}
                        options={options}
                        optionLabel="name"
                        placeholder="Tất cả"
                        className="dropdown"
                    />
                    <Search
                        placeholder="Tìm kiếm nhóm quyền..."
                        className={clsx(style.search)}
                        onChange={(e) => {
                            console.log(e.target.value);
                        }}
                    />
                </div>
            </div>
            {/* End Head  */}

            {/* Start body */}
            <div className={style.body}>
                <DataTable
                    value={subjects}
                    showGridlines
                    stripedRows
                    paginator
                    rowsPerPageOptions={[5, 10, 15, 20]}
                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                    rows={10}
                    currentPageReportTemplate="Trang {first} / {totalRecords}"
                >
                    <Column
                        body={indexBodyTemplate}
                        header="#"
                        bodyClassName="text-center"
                    />
                    <Column
                        field="roleCode"
                        header="Mã nhóm quyền"
                        bodyClassName="text-center"
                        sortable
                    ></Column>
                    <Column
                        field="roleName"
                        header="Tên nhóm quyền"
                        bodyClassName="text-center"
                        sortable
                    ></Column>
                    <Column
                        field="members"
                        header="Số người dùng"
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
            {/* End body */}
        </Wrapper>
    );
}

export default Role;
