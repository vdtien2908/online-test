/* eslint-disable react-hooks/exhaustive-deps */
import clsx from 'clsx';
import { useState, useEffect, useRef } from 'react';
// Prime react components
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { FloatLabel } from 'primereact/floatlabel';
import { Calendar } from 'primereact/calendar';

// React icon
import { FaFilterCircleXmark } from 'react-icons/fa6';

// Style css
import style from './Class.module.scss';

// Component
import Search from '~/components/Search';
import Module from './Module';
import TopPage from '~/components/TopPage';
import Wrapper from '~/components/Wrapper';
import Dropdown from '~/components/Dropdown';
import Loading from '~/components/Loading';
import Button from '~/components/Button';

// Hooks
import { useAxiosWithAuth, useDebounce } from '~/hooks';

// Define base url
const baseUrl = process.env.REACT_APP_BASE_URL;
function Class() {
    const toastRef = useRef(null);

    // Sort
    const [selectedSubject, setSelectedSubject] = useState({});
    const [searchValue, setSearchValue] = useState('');

    // Option select
    const [subjects, setSubjects] = useState([]);

    // Hooks customs
    const axios = useAxiosWithAuth();
    const debounce = useDebounce(searchValue, 500);

    // State
    const [loading, setLoading] = useState(false);
    const [visibleCreate, setVisibleCreate] = useState(false);
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [visibleDelete, setVisibleDelete] = useState(false);

    // Data rows
    const [modules, setModules] = useState([]);
    const [classId, setClassId] = useState(undefined);
    const [className, setClassName] = useState('');
    const [schoolYear, setSchoolYear] = useState(undefined);
    const [semester, setSemester] = useState(undefined);
    const [subject, setSubject] = useState(undefined);
    const [note, setNote] = useState(undefined);

    const init = async () => {
        try {
            setLoading(true);
            const req = await axios.get(`${baseUrl}/api/class`, {
                params: {
                    search: debounce,
                    subjectId: selectedSubject.id,
                },
            });
            setLoading(false);
            setModules(req.data.data);
        } catch (error) {
            toastMessage('error', 'Lỗi', error.response.data.message);
        }
    };

    useEffect(() => {
        (async () => {
            try {
                const req = await axios.get(`${baseUrl}/api/subjects`);
                setSubjects(req.data.data);
            } catch (error) {
                toastMessage('error', 'Lỗi', error.response.data.message);
            }
        })();

        init();
    }, [selectedSubject, debounce]);

    const onclickEdit = (id) => {
        (async () => {
            try {
                setLoading(true);
                const req = await axios.get(`${baseUrl}/api/class/${id}`);
                setVisibleEdit(true);
                setLoading(false);
                const [module] = req.data.data;
                setClassId(module.id);
                setClassName(module.className);
                setNote(module.note);
                setSchoolYear(new Date(module.schoolYear));
                setSemester({
                    semester: module.semester,
                    code: module.semester,
                });
                setSubject(module.SubjectModel);
            } catch (error) {
                toastMessage('error', 'Lỗi', error.response.data.message);
            }
        })();
    };

    const onClickDelete = (id) => {
        setVisibleDelete(true);
        (async () => {
            try {
                setLoading(true);
                const req = await axios.get(`${baseUrl}/api/class/${id}`);
                setLoading(false);
                const [module] = req.data.data;
                setClassId(module.id);
            } catch (error) {
                toastMessage('error', 'Lỗi', error.response.data.message);
            }
        })();
    };

    // Handle create
    const handleCreate = (e) => {
        e.preventDefault();
        if (
            !className ||
            schoolYear === undefined ||
            semester === undefined ||
            note === undefined ||
            subject === undefined
        ) {
            return toastMessage(
                'warn',
                'Cảnh báo',
                'Vui lòng nhập đầy đủ dữ liệu'
            );
        }

        (async () => {
            try {
                setVisibleCreate(false);
                setLoading(true);
                await axios.post(`${baseUrl}/api/class`, {
                    className,
                    semester: semester.code,
                    subjectId: subject.id,
                    note,
                    schoolYear: schoolYear.getFullYear().toString(),
                });
                setLoading(false);
                toastMessage(
                    'success',
                    'Thành công',
                    `Lớp học ${className} được thêm thành công`
                );
                init();
            } catch (error) {
                toastMessage('error', 'Lỗi', error.response.data.message);
                setLoading(false);
                setVisibleCreate(false);
            }
        })();

        setClassName('');
        setSchoolYear(undefined);
        setSemester(undefined);
        setSubject(undefined);
        setNote(undefined);
    };

    // Handle edit
    const handleUpdate = (e) => {
        e.preventDefault();

        if (
            !className ||
            schoolYear === undefined ||
            semester === undefined ||
            note === undefined ||
            subject === undefined
        ) {
            return toastMessage(
                'warn',
                'Cảnh báo',
                'Vui lòng nhập đầy đủ dữ liệu'
            );
        }

        (async () => {
            try {
                setVisibleEdit(false);
                setLoading(true);
                await axios.put(`${baseUrl}/api/class/${classId}`, {
                    className,
                    semester: semester.code,
                    subjectId: subject.id,
                    note,
                    schoolYear: schoolYear.getFullYear().toString(),
                });
                setLoading(false);
                toastMessage(
                    'success',
                    'Thành công',
                    `Lớp học ${className} được cập nhật thành công`
                );
                init();
            } catch (error) {
                toastMessage('error', 'Lỗi', error.response.data.message);
                setLoading(false);
                setVisibleEdit(false);
            }
        })();
    };

    // Handle delete
    const handleDelete = (e) => {
        e.preventDefault();
        (async () => {
            try {
                setVisibleDelete(false);
                setLoading(true);
                await axios.delete(`${baseUrl}/api/class/${classId}`);
                setLoading(false);
                init(); // Call function init
                toastMessage(
                    'success',
                    'Thành công',
                    'Lớp học được xoá thành công!'
                );
                setSearchValue('');
            } catch (error) {
                toastMessage('error', 'Lỗi', error.response.data.message);
                setVisibleDelete(false);
                setLoading(false);
            }
        })();
    };

    // Handle clear sort
    const handleClearSort = () => {
        setSelectedSubject({});
        setSearchValue('');
    };

    // Function handle notification
    const toastMessage = (type, title, message, life = 3000) => {
        toastRef.current.show({
            severity: type,
            summary: title,
            detail: `${message}`,
            life: life,
        });
    };

    // Template content
    // + Header dialog
    const headerDialog = (title) => {
        return (
            <div className="header_dialog">
                <h2>{title}</h2>
            </div>
        );
    };

    return (
        <>
            <Wrapper>
                <Toast ref={toastRef} />
                {/* Start Head  */}
                <div className={style.head}>
                    <TopPage
                        title="Danh sách lớp học"
                        textButton="Tạo lớp học"
                        onClick={() => {
                            setVisibleCreate(true);
                            setClassName('');
                            setSchoolYear(undefined);
                            setSemester(undefined);
                            setSubject(undefined);
                            setNote(undefined);
                        }}
                    />
                    <div className="head_body">
                        <Dropdown
                            value={selectedSubject}
                            onChange={(e) => setSelectedSubject(e.value)}
                            options={subjects}
                            optionLabel="subjectName"
                            placeholder="Chọn môn"
                            className="dropdown"
                        />
                        <Search
                            value={searchValue}
                            placeholder="Tìm kiếm lớp..."
                            className={clsx(style.search)}
                            onChange={(e) => {
                                setSearchValue(e.target.value);
                            }}
                            onClear={() => setSearchValue('')}
                        />
                        {(Object.keys(selectedSubject).length !== 0 ||
                            searchValue) && (
                            <Button
                                leftIcon={<FaFilterCircleXmark />}
                                onClick={handleClearSort}
                            >
                                Xoá bộ lọc
                            </Button>
                        )}
                    </div>
                </div>
                {/* End Head  */}
                {loading && (
                    <div className="loading-container">
                        <Loading />
                    </div>
                )}

                {/* Start body */}
                {!loading && (
                    <div className={style.body}>
                        <Module
                            data={modules}
                            onClickEdit={onclickEdit}
                            onClickDelete={onClickDelete}
                        />
                    </div>
                )}
                {/* End body */}
            </Wrapper>

            {/* Dialog  create */}
            <Dialog
                header={headerDialog('Thêm Lớp học phần')}
                visible={visibleCreate}
                style={{ width: '50vw' }}
                onHide={() => {
                    if (!visibleCreate) return;
                    setVisibleCreate(false);
                }}
                draggable={false}
            >
                <form className="form" onSubmit={handleCreate}>
                    <FloatLabel>
                        <InputText
                            className="input"
                            id="className"
                            value={className}
                            onChange={(e) => setClassName(e.target.value)}
                        />
                        <label htmlFor="className">Tên lớp học</label>
                    </FloatLabel>
                    <div className="input-row-2">
                        <FloatLabel>
                            <Calendar
                                className="input-number"
                                inputId="schoolYear"
                                value={schoolYear}
                                onChange={(e) => setSchoolYear(e.target.value)}
                                view="year"
                                dateFormat="yy"
                            />
                            <label htmlFor="schoolYear">Năm học</label>
                        </FloatLabel>
                        <FloatLabel>
                            <Dropdown
                                value={semester}
                                onChange={(e) => setSemester(e.value)}
                                options={[
                                    {
                                        semester: 1,
                                        code: 1,
                                    },
                                    {
                                        semester: 2,
                                        code: 2,
                                    },
                                    {
                                        semester: 3,
                                        code: 3,
                                    },
                                ]}
                                optionLabel="semester"
                                placeholder="Chọn kỳ học"
                                className="input-number dropdown"
                            />
                            <label htmlFor="semester">Kỳ học</label>
                        </FloatLabel>
                    </div>
                    <FloatLabel>
                        <Dropdown
                            value={subject}
                            onChange={(e) => setSubject(e.value)}
                            options={subjects}
                            optionLabel="subjectName"
                            placeholder="Chọn môn"
                            className="dropdown input-number"
                            id="subject"
                        />
                        <label htmlFor="subject">Môn học</label>
                    </FloatLabel>
                    <FloatLabel>
                        <InputTextarea
                            className="input"
                            id="numberCredits"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        />
                        <label htmlFor="numberCredits">Ghi chú</label>
                    </FloatLabel>

                    <div className="form_action">
                        <Button
                            type="button"
                            onClick={() => setVisibleCreate(false)}
                        >
                            Huỷ
                        </Button>
                        <Button primary type="submit">
                            Thêm
                        </Button>
                    </div>
                </form>
            </Dialog>
            {/* /Dialog  create */}

            {/* Dialog  create */}
            <Dialog
                header={headerDialog('Cập nhật lớp học phần')}
                visible={visibleEdit}
                style={{ width: '50vw' }}
                onHide={() => {
                    if (!visibleEdit) return;
                    setVisibleEdit(false);
                }}
                draggable={false}
            >
                <form className="form" onSubmit={handleUpdate}>
                    <FloatLabel>
                        <InputText
                            className="input"
                            id="className"
                            value={className}
                            onChange={(e) => setClassName(e.target.value)}
                        />
                        <label htmlFor="className">Tên lớp học</label>
                    </FloatLabel>
                    <div className="input-row-2">
                        <FloatLabel>
                            <Calendar
                                className="input-number"
                                inputId="schoolYear"
                                value={schoolYear}
                                onChange={(e) => setSchoolYear(e.target.value)}
                                view="year"
                                dateFormat="yy"
                            />
                            <label htmlFor="schoolYear">Năm học</label>
                        </FloatLabel>
                        <FloatLabel>
                            <Dropdown
                                value={semester}
                                onChange={(e) => setSemester(e.value)}
                                options={[
                                    {
                                        semester: 1,
                                        code: 1,
                                    },
                                    {
                                        semester: 2,
                                        code: 2,
                                    },
                                    {
                                        semester: 3,
                                        code: 3,
                                    },
                                ]}
                                optionLabel="semester"
                                placeholder="Chọn kỳ học"
                                className="input-number dropdown"
                            />
                            <label htmlFor="semester">Kỳ học</label>
                        </FloatLabel>
                    </div>
                    <FloatLabel>
                        <Dropdown
                            value={subject}
                            onChange={(e) => setSubject(e.value)}
                            options={subjects}
                            optionLabel="subjectName"
                            placeholder="Chọn môn"
                            className="dropdown input-number"
                            id="subject"
                        />
                        <label htmlFor="subject">Môn học</label>
                    </FloatLabel>
                    <FloatLabel>
                        <InputTextarea
                            className="input"
                            id="numberCredits"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        />
                        <label htmlFor="numberCredits">Ghi chú</label>
                    </FloatLabel>

                    <div className="form_action">
                        <Button
                            type="button"
                            onClick={() => setVisibleEdit(false)}
                        >
                            Huỷ
                        </Button>
                        <Button primary type="submit">
                            Cập nhật
                        </Button>
                    </div>
                </form>
            </Dialog>
            {/* /Dialog  create */}

            {/* Dialog delete */}
            <Dialog
                header={headerDialog('Xoá lớp học phần')}
                visible={visibleDelete}
                style={{ width: '400px' }}
                onHide={() => {
                    if (!visibleDelete) return;
                    setVisibleDelete(false);
                }}
                draggable={false}
            >
                <form className="form" onSubmit={handleDelete}>
                    <p>Bạn có chắc muốn xoá lớp học học này?</p>
                    <div className="form_action">
                        <Button
                            type="button"
                            onClick={() => setVisibleDelete(false)}
                        >
                            Huỷ
                        </Button>
                        <Button destroy type="submit">
                            Xoá
                        </Button>
                    </div>
                </form>
            </Dialog>
            {/* /Dialog delete */}
        </>
    );
}

export default Class;
