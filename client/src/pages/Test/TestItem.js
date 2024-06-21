import clsx from 'clsx';
import {
    FaBook,
    FaCodeBranch,
    FaClock,
    FaHourglassStart,
} from 'react-icons/fa6';
import { SpeedDial } from 'primereact/speeddial';

// Style css
import style from './Test.module.scss';

// Component
import Button from '~/components/Button';

// Router
// import routes from '~/configs/routes';

function TestItem({ data, classList, onclickDelete, onClickShow, user }) {
    const items = [
        {
            label: 'Delete',
            icon: 'pi pi-trash',
            command: () => onclickDelete(data.id),
        },
        {
            label: 'Show',
            icon: 'pi pi-external-link',
            command: () => {
                onClickShow(data.id);
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

    const currentTime = new Date();

    const formatTime = (timeString) => {
        const [timePart, datePart] = timeString.split(' ');
        const [hours, minutes, seconds] = timePart.split(':').map(Number);
        const [day, month, year] = datePart.split('/').map(Number);
        const time = new Date(year, month - 1, day, hours, minutes, seconds);

        return time;
    };

    const result = data.ResultModels;

    var resultUser = result.find((obj) => obj.userId === user.id);

    return (
        <>
            <div
                className={clsx(style.test_item, {
                    [style.pending]: currentTime < formatTime(startTime),
                    [style.approved]:
                        currentTime > formatTime(startTime) &&
                        currentTime < formatTime(endTime),
                    [style.cancel]: currentTime > formatTime(endTime),
                })}
            >
                <div className={clsx(style.test_title)}>
                    <h2>{data.title}</h2>
                </div>
                <div className={clsx(style.test_assignment)}>
                    <FaBook />
                    <p>Môn {data.subjectName}</p>
                </div>
                <div className={clsx(style.test_assignment)}>
                    <FaCodeBranch />
                    <p>
                        Giao cho{' '}
                        <b>
                            {classList.map((item) => item.className).join(', ')}
                        </b>
                    </p>
                </div>
                <div className={clsx(style.test_duration)}>
                    <FaHourglassStart />
                    <p>Thời gian thi: {data.examTime} phút</p>
                </div>
                <div className={clsx(style.test_duration)}>
                    <FaClock />
                    <p>Thời gian mở: {startTime}</p>
                </div>
                <div className={clsx(style.test_duration)}>
                    <FaClock />
                    <p>Thời gian đóng: {endTime}</p>
                </div>
                <div className={clsx(style.btn_test_start)}>
                    {resultUser && user.RoleModel.id === 2 && (
                        <div className={clsx(style.submitTest)}>
                            Đã làm bài!
                        </div>
                    )}

                    {currentTime > formatTime(startTime) &&
                        currentTime < formatTime(endTime) &&
                        !resultUser &&
                        user.RoleModel.id === 2 && (
                            <Button primary to={`/take-a-test/${data.id}`}>
                                Bắt đầu làm bài
                            </Button>
                        )}
                </div>
                {(user.RoleModel.id === 1 || user.RoleModel.id === 3) && (
                    <div className={clsx(style.test_action)}>
                        <SpeedDial
                            model={items}
                            radius={80}
                            type="quarter-circle"
                            direction="down-left"
                            style={{ right: '20px', top: '25%' }}
                        />
                    </div>
                )}
            </div>
        </>
    );
}

export default TestItem;
