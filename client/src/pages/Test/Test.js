import clsx from 'clsx';
import { useState } from 'react';

// Style css
import style from './Test.modul.scss';

// Component
import TopPage from '~/components/TopPage';
import Wrapper from '~/components/Wrapper/Wrapper';
import Dropdown from '~/components/Dropdown';
import Search from '~/components/Search';

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
                    <div className={clsx(style.test_item)}>
                        <h1>test 1</h1>
                    </div>
                </div>
            </div>
            {/* End body */}
        </Wrapper>
    );
}

export default Test;
