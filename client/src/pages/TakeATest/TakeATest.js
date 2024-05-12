import clsx from 'clsx';
import { FaPowerOff, FaFilePen, FaStopwatch } from 'react-icons/fa6';

// Style css
import style from './TakeATest.module.scss';

// Component
import Button from '~/components/Button';

function TakeATest() {
    return (
        <div className={clsx(style.wrapper)}>
            {/*  Topbar */}
            <div className={clsx(style.topbar_wrapper)}>
                <div className={style.topbar}>
                    <div className={clsx(style.topbar_left)}>
                        <Button
                            className={clsx(style.btn_out)}
                            leftIcon={<FaPowerOff />}
                        >
                            Thoát
                        </Button>
                    </div>
                    <div className={style.name}>Thí sinh 12 - Nguyễn Văn A</div>
                    <div className={clsx(style.topbar_right)}>
                        <div className={clsx(style.time)}>
                            <div className={clsx(style.time_icon)}>
                                <FaStopwatch />
                            </div>
                            <div className={clsx(style.time_text)}>
                                00 : 19 : 35
                            </div>
                        </div>
                        <Button primary leftIcon={<FaFilePen />}>
                            Nộp bài
                        </Button>
                    </div>
                </div>
            </div>
            {/* /Topbar */}
        </div>
    );
}

export default TakeATest;
