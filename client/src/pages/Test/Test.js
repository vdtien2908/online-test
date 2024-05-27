import clsx from 'clsx';
import { useState } from 'react';
// import { Outlet, useNavigate } from 'react-router-dom';

// Style css
import style from './Test.module.scss';

// Component
import TopPage from '~/components/TopPage';
import Wrapper from '~/components/Wrapper/Wrapper';
import Dropdown from '~/components/Dropdown';
import Search from '~/components/Search';
import TestItem from './TestItem';

function Test() {
    const options = [
        { name: 'Chưa mở', code: 'NY' },
        { name: 'Đang mở', code: 'RM' },
        { name: 'Đã đóng', code: 'LDN' },
        { name: 'Tất cả', code: 'IST' },
    ];
    const [selectedTest, setSelectedTest] = useState(null);
    return (
        <Wrapper>
            {/* Start Head  */}
            <div className={style.head}>
                <TopPage title="Danh sách đề thi" textButton="Tạo đề thi" />
                <div className="head_body">
                    <Dropdown
                        value={selectedTest}
                        onChange={(e) => setSelectedTest(e.value)}
                        options={options}
                        optionLabel="name"
                        placeholder="Tất cả"
                        className="dropdown"
                    />
                    <Search
                        placeholder="Tìm kiếm đề thi..."
                        className={clsx(style.search)}
                        onChange={(e) => {
                            console.log(e.target.value);
                        }}
                    />
                </div>
            </div>
            {/* End Head  */}
            {/* Start body */}

            <div className={clsx(style.body)}>
                <div className={clsx(style.list_test)}>
                    <TestItem pending />
                    <TestItem approved />
                    <TestItem cancel />
                    <TestItem pending />
                </div>
                <div className={clsx(style.note_status)}>
                    <ul>
                        <li>
                            <div
                                className={clsx(
                                    style.status_color,
                                    style.pending
                                )}
                            ></div>
                            <div className={clsx(style.status_text)}>
                                Chưa mở
                            </div>
                        </li>
                        <li>
                            <div
                                className={clsx(
                                    style.status_color,
                                    style.approved
                                )}
                            ></div>
                            <div className={clsx(style.status_text)}>Đã mở</div>
                        </li>
                        <li>
                            <div
                                className={clsx(
                                    style.status_color,
                                    style.cancel
                                )}
                            ></div>
                            <div className={clsx(style.status_text)}>
                                Đã đóng
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            {/* End body */}
        </Wrapper>
    );
}

export default Test;
