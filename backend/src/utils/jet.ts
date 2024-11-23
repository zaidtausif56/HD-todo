import jwt from 'jsonwebtoken';

const OTP_SECRET = process.env.OTP_SECRET || 'otp-secret-key';

export const generateOtpToken = (email: string, otp: string): string => {
    return jwt.sign({ email, otp }, OTP_SECRET, { expiresIn: '5m' }); // OTP valid for 5 minutes
};
