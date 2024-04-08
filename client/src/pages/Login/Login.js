import './Login.scss';
import { useState } from 'react';
import axios from 'axios';
import Button from '~/components/Button';
import { useNavigate } from 'react-router-dom';

async function loginUser(data) {
    return axios.post(`http://localhost:5200/api/login`, data).then((res) => {
        return res.data;
    });
}

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert('Vui lòng nhập đầy đủ tải khoản và mật khẩu');
            return;
        }

        const res = await loginUser({
            email,
            password,
        });

        if (res.status === 'Thất bại') {
            return alert('Sai mật khẩu hoặc tài khoản');
        }

        localStorage.setItem('user', JSON.stringify(res.user));
        localStorage.setItem('token', JSON.stringify(res.token));
        navigate('/');
    };

    return (
        <div className="login">
            <div className="login__header">
                <div className="login__logo">
                    <div className="logo__link">
                        <b>O</b> TEST
                    </div>
                </div>
                <form className="login__form" onSubmit={handleSubmit}>
                    <div className="form_group">
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-input"
                            type="text"
                            placeholder="Tài khoản"
                        />
                    </div>
                    <div className="form_group">
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-input"
                            type="password"
                            placeholder="Mật khẩu"
                            autoComplete="off"
                        />
                    </div>
                    <div className="login__action">
                        <div className="remember__login">
                            <input type="checkbox" />
                            <label>Lưu mật khẩu</label>
                        </div>
                    </div>
                    <div className="login__btn">
                        <Button primary>Đăng nhập</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
