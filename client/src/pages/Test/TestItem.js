import clsx from 'clsx';
import { FaBook, FaBusinessTime } from 'react-icons/fa6';
import { SpeedDial } from 'primereact/speeddial';

// Style css
import style from './Test.module.scss';

// Component
import Button from '~/components/Button';

// Router
// import routes from '~/configs/routes';

function TestItem({ pending, approved, cancel, data }) {
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

    const formattedDate = (input) => {
        let date = new Date(input);
        let formattedDate = date.toLocaleString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });

        return formattedDate;
    };

    const startTime = formattedDate(data.startTime);
    const endTime = formattedDate(data.endTime);

    return (
        <div
            className={clsx(style.test_item, {
                [style.pending]: pending,
                [style.approved]: approved,
                [style.cancel]: cancel,
            })}
        >
            <div className={clsx(style.test_title)}>
                <h2>{data.title}</h2>
            </div>
            <div className={clsx(style.test_assignment)}>
                <FaBook />
                <p>
                    Môn {data.subjectName} Lớp{' '}
                    <b>
                        {data.AssignExamQuestionModels[0].ClassModel.className}
                    </b>
                </p>
            </div>
            <div className={clsx(style.test_duration)}>
                <FaBusinessTime />
                <p>Thời gian thi: {data.examTime} phút</p>
            </div>
            <div className={clsx(style.test_duration)}>
                <FaBusinessTime />
                <p>Thời gian mở: {startTime}</p>
            </div>
            <div className={clsx(style.test_duration)}>
                <FaBusinessTime />
                <p>Thời gian đóng: {endTime}</p>
            </div>
            <div className={clsx(style.btn_test_start)}>
                {approved && (
                    <Button primary to={`/take-a-test/${data.id}`}>
                        Bắt đầu làm bài
                    </Button>
                )}
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
