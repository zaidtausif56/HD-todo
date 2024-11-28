import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const OTP_SECRET = process.env.OTP_SECRET || 'otp-secret-key';

export const generateOtpToken = (email: string): string => {
    return jwt.sign({ email }, OTP_SECRET, { expiresIn: '5m' });
};

export const generateAuthToken = (userId: string, email: string): string => {
    return jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string): any => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid token');
    }
};