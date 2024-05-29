import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRouter({ children }) {
    const [accessToken, setAccessToken] = useState(() =>
        localStorage.getItem('accessToken')
    );
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        setAccessToken(token);
    }, [location]);

    return accessToken ? children : <Navigate to="/login" />;
}

export default ProtectedRouter;
