import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import * as request from '~/utils/httpRequest';

import { isTokenExpired } from '~/utils/handleToken';

function ProtectedRouter({ children }) {
    const [expiresRefreshToken, setExpiresRefreshToken] = useState(true);

    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');

        // Handle token Expires
        const fetchApi = async () => {
            if (!token || isTokenExpired(token)) {
                try {
                    const req = await request.post('/api/auth/refreshToken');
                    if (req && req.newAccessToken) {
                        setExpiresRefreshToken(true);
                        localStorage.setItem('accessToken', req.newAccessToken);
                    } else {
                        setExpiresRefreshToken(false);
                    }
                } catch (error) {
                    console.error(error);
                    setExpiresRefreshToken(false);
                }
            }
        };

        fetchApi();
    }, [location]);

    return expiresRefreshToken ? children : <Navigate to="/login" />;
}

export default ProtectedRouter;
