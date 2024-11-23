import otpGenerator from 'otp-generator';

export const generateOTP = () => {
  return otpGenerator.generate(6, { lowerCaseAlphabets: false,upperCaseAlphabets: false, specialChars: false, digits: true });
};
