import axios from 'axios';
import jwtDecode from 'jwt-decode';

// Decode token
const decodeToken = (token) => {
    try {
        return jwtDecode(token);
    } catch (error) {
        return null;
    }
};

// Check expired token
const isTokenExpired = (token) => {
    const decodedToken = decodeToken(token);
    if (!decodedToken) return true;
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
};

// Call refresh-token get accessToken
const refreshAccessToken = async () => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/auth/refreshToken`
        );
        return response.data.newAccessToken;
    } catch (error) {
        console.error('Failed to refresh access token:', error);
        return null;
    }
};

export { isTokenExpired, refreshAccessToken };
