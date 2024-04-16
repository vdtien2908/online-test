import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState } from 'react';

import clsx from 'clsx';

// Style css
import style from './Subject.module.scss';

// Import component
import TopPage from '~/components/TopPage';
import Search from '~/components/Search';
import Dropdown from '~/components/Dropdown';

function Subject() {
    const [selectedSubject, setSelectedSubject] = useState(null);
    const options = [
        { name: 'Mới nhất', code: 'Desc' },
        { name: 'Cũ nhất', code: 'ASC' },
    ];
    const products = [
        {
            id: 1,
            name: 'Apple Watch',
            price: '₦350,000',
            category: 'Accessories',
            quantity: '7',
            rating: '5',
        },
        {
            id: 2,
            name: 'Fitness watch',
            price: '₦10,000',
            category: 'Fitness',
            quantity: '23',
            rating: '2',
        },
        {
            id: 3,
            name: 'Beach dress',
            price: '₦25,000',
            category: 'Clothing',
            quantity: '5',
            rating: '4',
        },
        {
            id: 4,
            name: 'Washing machine',
            price: '₦260,000',
            category: 'Electronics',
            quantity: '10',
            rating: '4',
        },
        {
            id: 5,
            name: 'Blue Jeans',
            price: '₦10,000',
            category: 'Clothing',
            quantity: '50',
            rating: '5',
        },
        {
            id: 6,
            name: 'Samsung Watch',
            price: '₦270,000',
            category: 'Accessories',
            quantity: '7',
            rating: '3',
        },
        {
            id: 7,
            name: 'Yoga mat',
            price: '₦15,000',
            category: 'Fitness',
            quantity: '15',
            rating: '4',
        },
        {
            id: 8,
            name: 'Jumpsuit',
            price: '₦15,700',
            category: 'Clothing',
            quantity: '30',
            rating: '5',
        },
        {
            id: 9,
            name: 'Hand mixer',
            price: '₦50,000',
            category: 'Electronics',
            quantity: '10',
            rating: '4',
        },
        {
            id: 10,
            name: 'Pallazo',
            price: '₦12,000',
            category: 'Clothing',
            quantity: '4',
            rating: '3',
        },
    ];

    return (
        <div className={clsx(style.wrapper)}>
            {/* Start Head  */}
            <div className={style.head}>
                <TopPage title="Danh sách lớp học" textButton="Tạo lớp học" />
                <div className={style.head_body}>
                    <Dropdown
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.value)}
                        options={options}
                        optionLabel="name"
                        placeholder="Tất cả"
                        className={clsx(style.dropdown)}
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
                    value={products}
                    showGridlines
                    stripedRows
                    paginator
                    rowsPerPageOptions={[5, 10, 15, 20]}
                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                    rows={10}
                    currentPageReportTemplate="Trang {first} / {totalRecords}"
                >
                    <Column field="name" header="Tên môn" sortable></Column>
                    <Column field="price" header="Số tín chỉ" sortable></Column>
                    <Column
                        field="category"
                        header="Thực hành"
                        sortable
                    ></Column>
                    <Column
                        field="quantity"
                        header="Lý thuyết"
                        sortable
                    ></Column>
                    <Column field="rating" header="Hành động"></Column>
                </DataTable>
            </div>
            {/* End body */}
        </div>
    );
}

export default Subject;
