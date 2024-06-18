import clsx from 'clsx';
import { useState, useEffect, useRef } from 'react';
// import { Outlet, useNavigate } from 'react-router-dom';

// Style css
import style from './Test.module.scss';

// React prime
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { FloatLabel } from 'primereact/floatlabel';
import { Toast } from 'primereact/toast';

// Component
import TopPage from '~/components/TopPage';
import Wrapper from '~/components/Wrapper/Wrapper';
import Dropdown from '~/components/Dropdown';
import Search from '~/components/Search';
import TestItem from './TestItem';
import Loading from '~/components/Loading';

// Hooks
import { useDebounce, useAxiosWithAuth } from '~/hooks';

const baseUrl = process.env.REACT_APP_BASE_URL;

function Test() {
    const axios = useAxiosWithAuth();

    const toastRef = useRef(null);

    // State display
    const [loading, setLoading] = useState(false);

    // State display
    useEffect(() => {
        document.title = 'Đề kiểm tra';
    }, []);

    // Data
    const [tests, setTests] = useState([]);

    const init = async () => {
        try {
            setLoading(true);
            const req = await axios.get(`${baseUrl}/api/tests`);
            setLoading(false);
            setTests(req.data.data);
        } catch (error) {
            toastMessage('error', 'Lỗi', error.response.data.message);
        }
    };

    useEffect(() => {
        init();
    }, []);

    const options = [
        { name: 'Chưa mở', code: 'NY' },
        { name: 'Đang mở', code: 'RM' },
        { name: 'Đã đóng', code: 'LDN' },
        { name: 'Tất cả', code: 'IST' },
    ];

    const subjects = [
        { name: 'Giải tích 1', code: 'NY' },
        { name: 'Đại số tuyến tính', code: 'RM' },
    ];
    const [selectedTest, setSelectedTest] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);

    const toastMessage = (type, title, message, life = 3000) => {
        toastRef.current.show({
            severity: type,
            summary: title,
            detail: `${message}`,
            life: life,
        });
    };

    return (
        <Wrapper>
            <Toast ref={toastRef} />
            {/* Start Head  */}
            <div className={style.head}>
                <TopPage title="Danh sách đề thi" textButton="Tạo đề thi" />
                <div className="head_body">
                    <Dropdown
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.value)}
                        options={subjects}
                        optionLabel="name"
                        placeholder="Chọn môn"
                        className="dropdown"
                    />
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
            {loading && (
                <div className="loading-container">
                    <Loading />
                </div>
            )}

            {!loading && (
                <div className={clsx(style.body)}>
                    <div className={clsx(style.list_test)}>
                        {tests.map((test, index) => {
                            const classList = test.AssignExamQuestionModels.map(
                                (item) => {
                                    return {
                                        className: item.ClassModel.className,
                                    };
                                }
                            );

                            return (
                                <TestItem
                                    key={index}
                                    data={test}
                                    classList={classList}
                                />
                            );
                        })}
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
                                <div className={clsx(style.status_text)}>
                                    Đã mở
                                </div>
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
            )}
            {/* End body */}
        </Wrapper>
    );
}

export default Test;
