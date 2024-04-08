import clsx from 'clsx';
import { FaRegTrashCan, FaPenToSquare } from 'react-icons/fa6';
// Style css
import style from './Table.module.scss';

// Component
import Button from '~/components/Button';

import React from 'react';

function Table({ title, column, data, addClick, editClick, deleteClick }) {
    const getDisplayValue = (field, value) => {
        if (field === 'sex') {
            return value === 1 ? 'Nam' : value === 2 ? 'Nữ' : '';
        }
        return value;
    };

    return (
        <>
            <div className={clsx(style.table)}>
                <div className={clsx(style.table_header)}>
                    <h1>Danh sách {title}</h1>
                    <Button primary onClick={addClick}>
                        Thêm
                    </Button>
                </div>
                <div className={clsx(style.table_main)}>
                    <table>
                        <thead>
                            <tr>
                                <th>STT</th>
                                {column.map((col, index) => (
                                    <th key={index}>{col.title}</th>
                                ))}
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    <td className={clsx(style.text_center)}>
                                        {rowIndex + 1}
                                    </td>
                                    {column.map((col, colIndex) => (
                                        <td key={colIndex}>
                                            {col.fieldName === 'img' ? (
                                                <img
                                                    src={row[col.fieldName]}
                                                    alt={row[col.fieldName]}
                                                />
                                            ) : (
                                                getDisplayValue(
                                                    col.fieldName,
                                                    row[col.fieldName]
                                                )
                                            )}
                                        </td>
                                    ))}
                                    <td className={clsx(style.text_center)}>
                                        <Button
                                            outline
                                            edit
                                            onClick={() => editClick(row.id)}
                                        >
                                            <FaPenToSquare />
                                        </Button>
                                        <Button
                                            outline
                                            trash
                                            onClick={() => deleteClick(row.id)}
                                        >
                                            <FaRegTrashCan />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Table;
