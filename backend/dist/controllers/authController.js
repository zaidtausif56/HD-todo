"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = exports.sendOTP = void 0;
const supabaseClient_1 = __importDefault(require("../supabaseClient"));
const otpService_1 = require("../services/otpService");
const emailService_1 = require("../services/emailService");
const jwt_1 = require("../utils/jwt");
// const otpStore = new Map<string, { otp: string; expiresAt: number }>();
const sendOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Auth :", req.body);
    const { email, page } = req.body;
    console.log(page);
    const userid = yield supabaseClient_1.default
        .from("hdusers")
        .select("id")
        .eq("email", email)
        .single();
    console.log(userid);
    if ((page === "login" && userid.data !== null) || (page === "signup" && userid.data == null)) {
        const otp = (0, otpService_1.generateOTP)();
        const otpToken = (0, jwt_1.generateOtpToken)(email, otp);
        console.log("Gen token:", otpToken);
        yield (0, emailService_1.sendOTPEmail)(email, otp);
        res.status(200).send({ message: "OTP sent to email", otpToken });
    }
    else {
        res.status(200).send({ message: page === "login" ? "Account does not exist." : "Account already exists." });
    }
});
exports.sendOTP = sendOTP;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, dob, email, otp, otpToken } = req.body;
    console.log("Signnnn: ", req.body);
    try {
        const decoded = (0, jwt_1.verifyToken)(otpToken);
        console.log(decoded);
        if (decoded.email !== email || decoded.otp !== otp) {
            return res.status(400).send({ message: "Invalid OTP" });
        }
        // Insert user into Supabase database
        const { data, error } = yield supabaseClient_1.default
            .from("hdusers")
            .insert([{ name, dob, email }]);
        if (error) {
            return res.status(500).send({ message: "Error creating user", error });
        }
        res.status(201).send({ message: "User created successfully", data });
    }
    catch (error) {
        res.status(400).send({ message: "Invalid OTP token" });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp, otpToken } = req.body;
    try {
        const decoded = (0, jwt_1.verifyToken)(otpToken);
        if (decoded.email !== email || decoded.otp !== otp) {
            return res.status(400).send({ message: "Invalid OTP" });
        }
        const { data, error } = yield supabaseClient_1.default
            .from("hdusers")
            .select("*")
            .eq("email", email)
            .single();
        const authToken = (0, jwt_1.generateAuthToken)(data.id, email);
        const userData = {
            id: data.id,
            name: data.name,
            email: data.email,
            dob: data.dob
        };
        res.status(200).send({ message: "User Logged in successfully", authToken, userData });
    }
    catch (error) {
        res.status(400).send({ message: "Invalid OTP token" });
    }
});
exports.login = login;
