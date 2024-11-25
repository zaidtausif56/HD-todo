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
<<<<<<< HEAD
const jwt_1 = require("../utils/jwt");
// const otpStore = new Map<string, { otp: string; expiresAt: number }>();
=======
const otpStore = new Map();
>>>>>>> 7688a5730b01e50bce37f34ee9a85579e5b4df96
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
<<<<<<< HEAD
    if ((page === "login" && userid.data !== null) || (page === "signup" && userid.data == null)) {
        const otp = (0, otpService_1.generateOTP)();
        const otpToken = (0, jwt_1.generateOtpToken)(email, otp);
        console.log("Gen token:", otpToken);
        yield (0, emailService_1.sendOTPEmail)(email, otp);
        res.status(200).send({ message: "OTP sent to email", otpToken });
    }
    else {
        res.status(200).send({ message: page === "login" ? "Account does not exist." : "Account already exists." });
=======
    if (page == "login") {
        if (userid.data !== null) {
            console.log("Login otp being sent.");
            const otp = (0, otpService_1.generateOTP)();
            const expiresAt = Date.now() + 5 * 60 * 1000;
            otpStore.set(email, { otp, expiresAt });
            // req.session.otp = otp;
            // Send OTP to email
            yield (0, emailService_1.sendOTPEmail)(email, otp);
            res.status(200).send({ message: "OTP sent to email" });
        }
        else {
            res.status(200).send({ message: "Account does not exist. Create an account" });
        }
    }
    else if (page == "signup") {
        if (userid.data == null) {
            console.log("Signup otp being sent.");
            const otp = (0, otpService_1.generateOTP)();
            const expiresAt = Date.now() + 5 * 60 * 1000;
            otpStore.set(email, { otp, expiresAt });
            // req.session.otp = otp;
            // Send OTP to email
            yield (0, emailService_1.sendOTPEmail)(email, otp);
            res.status(200).send({ message: "OTP sent to email" });
        }
        else {
            res.status(200).send({ message: "Account already exists goto login." });
        }
    }
    else {
        console.log("Invalid request.");
        res.status(400).send({ message: "Invalid Request" });
>>>>>>> 7688a5730b01e50bce37f34ee9a85579e5b4df96
    }
});
exports.sendOTP = sendOTP;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
<<<<<<< HEAD
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
=======
    const { name, dob, email, otp } = req.body;
    console.log("Signnnn: ", req.body);
    // Check if OTP matches
    const otpData = otpStore.get(email);
    if (!otpData || otpData.otp !== otp || Date.now() > otpData.expiresAt) {
        console.log(req.session.otp);
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
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp } = req.body;
    const otpData = otpStore.get(email);
    if (!otpData || otpData.otp !== otp || Date.now() > otpData.expiresAt) {
        return res.status(400).send({ message: "Invalid OTP" });
    }
    else {
>>>>>>> 7688a5730b01e50bce37f34ee9a85579e5b4df96
        const { data, error } = yield supabaseClient_1.default
            .from("hdusers")
            .select("*")
            .eq("email", email)
            .single();
<<<<<<< HEAD
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
=======
        if (error)
            return res.status(400).send({ message: "Error in getting user data" });
        res.status(200).send({ message: "User Logged in successfully", data });
>>>>>>> 7688a5730b01e50bce37f34ee9a85579e5b4df96
    }
});
exports.login = login;
