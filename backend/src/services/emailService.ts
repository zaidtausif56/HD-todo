import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: process.env.SMTP_HOST,
  // port: parseInt(process.env.SMTP_PORT!),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendOTPEmail = async (to: string, otp: string) => {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'Your OTP from HD Notes',
      text: `Hello,
       
${otp} is your one-time passcode (OTP) for signup/login to HD Notes.
      
The OTP will be valid for 5 minutes.`,
    });
  } catch (error) {
    console.error('Error sending OTP email:', error);
  }
};
