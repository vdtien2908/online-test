import clsx from 'clsx';
import { useState } from 'react';

// Style css
import style from './Class.module.scss';

// Component
import Search from '~/components/Search';
import Module from './Module';
import TopPage from '~/components/TopPage';
import Wrapper from '~/components/Wrapper';
import Dropdown from '~/components/Dropdown';

function Class() {
    const [selectedSubject, setSelectedSubject] = useState(null);
    const subjects = [
        { name: 'Đại số tuyến tính', code: 'NY' },
        { name: 'Giải tích', code: 'RM' },
        { name: 'Máy học', code: 'LDN' },
        { name: 'Trí tuệ nhân tạo', code: 'IST' },
    ];
    return (
        <Wrapper>
            {/* Start Head  */}
            <div className={style.head}>
                <TopPage title="Danh sách lớp học" textButton="Tạo lớp học" />
                <div className={style.head_body}>
                    <Dropdown
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.value)}
                        options={subjects}
                        optionLabel="name"
                        placeholder="Tất cả"
                        className={clsx(style.dropdown)}
                    />
                    <Search
                        placeholder="Tìm kiếm lớp..."
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
                <Module />
            </div>
            {/* End body */}
        </Wrapper>
    );
}

export default Class;
