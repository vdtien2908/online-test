import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateAccessToken = (uid, role) => {
    const secretKey = process.env.JWT_SECRET;
    const payload = { id: uid, role };
    return jwt.sign(payload, secretKey, { expiresIn: '30m' });
};

const generateRefreshToken = (uid) => {
    const secretKey = process.env.JWT_SECRET;
    const payload = { id: uid };
    return jwt.sign(payload, secretKey, { expiresIn: '7d' });
};

export { generateAccessToken, generateRefreshToken };
