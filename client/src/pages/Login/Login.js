import clsx from 'clsx';
import { useEffect, useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { Toast } from 'primereact/toast';
import { useNavigate, Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

// Style
import style from './Login.module.scss';
import bgr_login from '~/assets/images/bgr-login-1.png';

// Component
import Button from '~/components/Button';
import Loading from '~/components/Loading';

// Utils
import * as request from '~/utils/httpRequest';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const toastRef = useRef(null);

    const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.1 });

    useEffect(() => {
        document.title = 'Đăng nhập';

        const fetchApi = async () => {
            try {
                setLoading(true);
                const req = await request.post('/api/auth/refreshToken');
                setLoading(false);
                if (req && req.newAccessToken) {
                    navigate('/dashboard');
                }
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchApi();
    }, [navigate]);

    const fetchApi = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            showWarn();
            return;
        }

        try {
            const req = await request.post('/api/auth/login', {
                email,
                password,
            });

            if (req && req.data) {
                const data = req.data;
                const accessToken = data.accessToken;

                // Save the accessToken to local storage
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate('/dashboard');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                const req = error.response.data;
                if (req.message === 'Invalid credentials') {
                    showInvalid();
                } else {
                    showError();
                }
            } else {
                showError();
            }
        }
    };

    const showWarn = () => {
        toastRef.current.show({
            severity: 'warn',
            summary: 'Cảnh báo',
            detail: 'Vui lòng nhập email hoặc mật khẩu.',
            life: 3000,
        });
    };

    const showInvalid = () => {
        toastRef.current.show({
            severity: 'error',
            summary: 'Cảnh báo',
            detail: 'Email hoặc mật khẩu không chỉnh xác!',
            life: 3000,
        });
    };

    const showError = () => {
        toastRef.current.show({
            severity: 'error',
            summary: 'Lỗi máy chủ',
            detail: 'Lỗi máy chủ vui lòng thử lại sau',
            life: 3000,
        });
    };

    return (
        <div className="loading_relative">
            {loading && (
                <div className="loading-container">
                    <Loading />
                </div>
            )}
            {!loading && (
                <div
                    className={clsx(style.wrapper)}
                    style={{ backgroundImage: `url(${bgr_login})` }}
                >
                    <Toast ref={toastRef} />
                    <div className={clsx(style.login_container)}>
                        <div className={clsx(style.left)}>
                            <div
                                className={clsx(
                                    style.form_login,
                                    style.fadeIn,
                                    {
                                        [style.visible]: inView1,
                                    }
                                )}
                                ref={ref1}
                            >
                                <div className={clsx(style.logo)}>
                                    <p>
                                        Online
                                        <sup>TEST</sup>
                                    </p>
                                </div>
                                <h2 className={clsx(style.title)}>Đăng nhập</h2>
                                <form
                                    className={clsx(style.form)}
                                    onSubmit={fetchApi}
                                >
                                    <FloatLabel>
                                        <InputText
                                            className={clsx(style.input)}
                                            id="email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                        />
                                        <label htmlFor="email">Email</label>
                                    </FloatLabel>
                                    <FloatLabel>
                                        <InputText
                                            className={clsx(style.input)}
                                            type="password"
                                            id="password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                        />
                                        <label htmlFor="password">
                                            Mật khẩu
                                        </label>
                                    </FloatLabel>
                                    <div>
                                        <Button primary type="submit">
                                            Đăng nhập
                                        </Button>
                                        <Link
                                            className={clsx(style.read_more)}
                                            to="/"
                                        >
                                            Xem thêm thông tin ?
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className={clsx(style.right)}>
                            <div
                                className={clsx(style.fadeIn, {
                                    [style.visible]: inView2,
                                })}
                                ref={ref2}
                            >
                                <h1>
                                    Chào mừng bạn đến với <b>Online Test</b>
                                </h1>
                                <div className={clsx(style.copyright)}>
                                    Copyright © 2024
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Login;
