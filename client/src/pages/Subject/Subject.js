import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState } from 'react';
import { FaPencil, FaRegTrashCan, FaEllipsisVertical } from 'react-icons/fa6';
import clsx from 'clsx';

// Style css
import style from './Subject.module.scss';

// Import component
import TopPage from '~/components/TopPage';
import Search from '~/components/Search';
import Dropdown from '~/components/Dropdown';
import Button from '~/components/Button';
import Tooltip from '~/components/Tooltip';
import Wrapper from '~/components/Wrapper';

function Subject() {
    const [selectedSubject, setSelectedSubject] = useState(null);
    const options = [
        { name: 'Mới nhất', code: 'Desc' },
        { name: 'Cũ nhất', code: 'ASC' },
    ];
    const subjects = [
        {
            id: 1,
            subjectName: 'Đại số tuyến tính',
            numberCredits: 3,
            practice: 30,
            theory: 15,
        },
        {
            id: 2,
            subjectName: 'Trí tuệ nhân tạo',
            numberCredits: 2,
            practice: 30,
            theory: 15,
        },
        {
            id: 3,
            subjectName: 'Gải tích 3',
            numberCredits: 7,
            practice: 30,
            theory: 15,
        },
        {
            id: 4,
            subjectName: 'Cấu trúc dữ liệu',
            numberCredits: 10,
            practice: 30,
            theory: 15,
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
                <TopPage title="Danh sách lớp học" textButton="Thêm môn học" />
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
                        placeholder="Tìm kiếm môn học..."
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
                        field="practice"
                        header="Thực hành"
                        bodyClassName="text-center"
                        sortable
                    ></Column>
                    <Column
                        field="theory"
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
            {/* End body */}
        </Wrapper>
    );
}

export default Subject;
