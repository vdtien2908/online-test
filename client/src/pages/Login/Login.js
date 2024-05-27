import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';

// Style
import style from './Login.module.scss';
import bgr_login from '~/assets/images/bgr-login-1.png';

// Component
import Button from '~/components/Button';

function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    useEffect(() => {
        document.title = 'Đăng nhập';
    }, []);

    return (
        <div
            className={clsx(style.wrapper)}
            style={{ backgroundImage: `url(${bgr_login})` }}
        >
            <div className={clsx(style.login_container)}>
                <div className={clsx(style.left)}>
                    <div className={clsx(style.form_login)}>
                        <div className={clsx(style.logo)}>
                            <p>
                                Online
                                <sup>TEST</sup>
                            </p>
                        </div>
                        <h2 className={clsx(style.title)}>Đăng nhập</h2>
                        <div className={clsx(style.form)}>
                            <FloatLabel>
                                <InputText
                                    className={clsx(style.input)}
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label for="email">Email</label>
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
                                <label for="password">Mật khẩu</label>
                            </FloatLabel>
                            <Button primary>Đăng nhập</Button>
                        </div>
                    </div>
                </div>
                <div className={clsx(style.right)}>
                    <h1>
                        Chào mừng bạn đến với <b>Online Test</b>
                    </h1>
                    <div className={clsx(style.copyright)}>
                        Copyright © 2024
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
