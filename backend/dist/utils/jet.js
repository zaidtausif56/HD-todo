"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOtpToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const OTP_SECRET = process.env.OTP_SECRET || 'otp-secret-key';
const generateOtpToken = (email, otp) => {
    return jsonwebtoken_1.default.sign({ email, otp }, OTP_SECRET, { expiresIn: '5m' }); // OTP valid for 5 minutes
};
exports.generateOtpToken = generateOtpToken;
