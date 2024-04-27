import clsx from 'clsx';
import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FaPencil, FaRegTrashCan, FaEllipsisVertical } from 'react-icons/fa6';

// Style css
import style from './Question.module.scss';

// Component
import TopPage from '~/components/TopPage';
import Wrapper from '~/components/Wrapper/Wrapper';
import Dropdown from '~/components/Dropdown';
import Search from '~/components/Search';
import Button from '~/components/Button';
import Tooltip from '~/components/Tooltip';

function Question() {
    const optionSubjects = [
        { name: 'Kiến trúc máy tính', code: 'Desc' },
        { name: 'Khoa học dữ liệu', code: 'ASC' },
    ];

    const optionChapters = [
        { name: 'Chương 1', code: 'Desc' },
        { name: 'Chương 2', code: 'ASC' },
    ];

    const optionLevers = [
        { name: 'Cơ bản', code: 0 },
        { name: 'Trung bình', code: 1 },
        { name: 'Nâng cao', code: 2 },
    ];

    const questions = [
        {
            id: 1,
            questionContent: 'OOP là viết tắt của:',
            subjectName: 'Lập trình web',
            lever: 0,
        },
        {
            id: 2,
            questionContent:
                'Đặc điểm cơ bản của lập trình hướng đối tượng thể hiện ở:',
            subjectName: 'Lập trình hướng đối tượng',
            lever: 1,
        },
        {
            id: 3,
            questionContent: 'PHP là ngôn ngữ lập trình nào sau đây?',
            subjectName: 'Lập trình hướng đối tượng',
            lever: 2,
        },
        {
            id: 4,
            questionContent: 'Đâu là cách khai báo một biến trong PHP?',
            subjectName: 'Lập trình web',
            lever: 1,
        },
    ];

    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [selectedLever, setSelectedLever] = useState(null);

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
        if (rowData.lever === 0) {
            return 'Cơ bản';
        } else if (rowData.lever === 1) {
            return 'Trung bình';
        } else {
            return 'Nâng cao';
        }
    };

    return (
        <Wrapper>
            {/* Head start */}
            <div className={style.head}>
                <TopPage title="Danh sách câu hỏi" textButton="Thêm câu hỏi" />
                <div className="head_body">
                    {/* Selected subject */}
                    <Dropdown
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.value)}
                        options={optionSubjects}
                        optionLabel="name"
                        placeholder="Chọn môn"
                        className="dropdown"
                    />
                    {/* Selected chapter */}
                    <Dropdown
                        value={selectedChapter}
                        onChange={(e) => setSelectedChapter(e.value)}
                        options={optionChapters}
                        optionLabel="name"
                        placeholder="Chọn chương"
                        className="dropdown"
                    />
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
                        placeholder="Tìm kiếm câu hỏi..."
                        className={clsx(style.search)}
                        onChange={(e) => {
                            console.log(e.target.value);
                        }}
                    />
                </div>
            </div>
            {/* Head end */}

            {/* Start body */}
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
                >
                    <Column
                        body={indexBodyTemplate}
                        header="#"
                        bodyClassName="text-center"
                    />
                    <Column
                        field="questionContent"
                        header="Nội dung câu"
                        sortable
                    ></Column>
                    <Column
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
            {/* End body */}
        </Wrapper>
    );
}

export default Question;
