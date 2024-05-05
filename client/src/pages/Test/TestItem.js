import clsx from 'clsx';
import { FaBook, FaBusinessTime } from 'react-icons/fa6';
import { SpeedDial } from 'primereact/speeddial';

// Style css
import style from './Test.module.scss';

function TestItem({ pending, approved, cancel }) {
    const items = [
        {
            label: 'Delete',
            icon: 'pi pi-trash',
            command: () => {
                // toast.current.show({
                //     severity: 'error',
                //     summary: 'Delete',
                //     detail: 'Data Deleted',
                // });
            },
        },
        {
            label: 'Update',
            icon: 'pi pi-pencil',
            command: () => {
                // toast.current.show({
                //     severity: 'success',
                //     summary: 'Update',
                //     detail: 'Data Updated',
                // });
            },
        },
        {
            label: 'Show',
            icon: 'pi pi-external-link',
            command: () => {
                // toast.current.show({
                //     severity: 'success',
                //     summary: 'Update',
                //     detail: 'Data Updated',
                // });
            },
        },
    ];
    return (
        <div
            className={clsx(style.test_item, {
                [style.pending]: pending,
                [style.approved]: approved,
                [style.cancel]: cancel,
            })}
        >
            <div className={clsx(style.test_title)}>
                <h2>Đề thi 100 câu</h2>
            </div>
            <div className={clsx(style.test_assignment)}>
                <FaBook />
                <p>Giao cho lớp KTPM</p>
            </div>
            <div className={clsx(style.test_duration)}>
                <FaBusinessTime />
                <p>Diễn ra từ 6h20 5/5/2024 tới 8h20 6/5/2024</p>
            </div>

            <div className={clsx(style.test_action)}>
                <SpeedDial
                    model={items}
                    radius={80}
                    type="quarter-circle"
                    direction="down-left"
                    style={{ right: '20px', top: '25%' }}
                />
            </div>
        </div>
    );
}

export default TestItem;
