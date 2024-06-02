import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import * as request from '~/utils/httpRequest';
import { isTokenExpired, refreshAccessToken } from '~/utils/handleToken';

const useAxiosWithAuth = () => {
    const navigate = useNavigate();
    const [accessToken, setAccessToken] = useState(
        localStorage.getItem('accessToken')
    );

    useEffect(() => {
        const interceptor = axios.interceptors.request.use(
            async (config) => {
                if (isTokenExpired(accessToken)) {
                    const newAccessToken = await refreshAccessToken();
                    if (newAccessToken) {
                        setAccessToken(newAccessToken);
                        localStorage.setItem('accessToken', newAccessToken);
                        config.headers[
                            'Authorization'
                        ] = `Bearer ${newAccessToken}`;
                    } else {
                        // Xử lý khi không lấy được token mới
                        await request.get('/api/auth/logout');
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('user');
                        navigate('/login');
                    }
                } else {
                    config.headers['Authorization'] = `Bearer ${accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        return () => axios.interceptors.request.eject(interceptor);
    }, [accessToken, navigate]);

    return axios;
};

export default useAxiosWithAuth;
