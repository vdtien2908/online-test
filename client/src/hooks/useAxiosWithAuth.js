import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { isTokenExpired, refreshAccessToken } from '~/utils/checkToken';

const useAxiosWithAuth = () => {
    const [accessToken, setAccessToken] = useState(
        localStorage.getItem('accessToken')
    );
    const [refreshToken, setRefreshToken] = useState(
        localStorage.getItem('refreshToken')
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
                        // Handel when don't get access token
                        console.error(
                            'Failed to refresh access token, please log in again.'
                        );
                    }
                } else {
                    config.headers['Authorization'] = `Bearer ${accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        return () => axios.interceptors.request.eject(interceptor);
    }, [accessToken, refreshToken]);

    return axios;
};

export default useAxiosWithAuth;
