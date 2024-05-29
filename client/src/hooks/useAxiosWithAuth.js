import { useEffect, useState } from 'react';
import axios from 'axios';

import { isTokenExpired, refreshAccessToken } from '~/utils/handleToken';

const useAxiosWithAuth = () => {
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
    }, [accessToken]);

    return axios;
};

export default useAxiosWithAuth;
