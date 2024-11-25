import { Request, Response } from "express";
import supabase from "../supabaseClient";
import { generateOTP } from "../services/otpService";
import { sendOTPEmail } from "../services/emailService";
import { generateOtpToken, verifyToken, generateAuthToken } from '../utils/jwt';

// const otpStore = new Map<string, { otp: string; expiresAt: number }>();

export const sendOTP = async (req: Request, res: Response) => {
  console.log("Auth :", req.body);

  const { email, page } = req.body;
  console.log(page);

  const userid = await supabase
    .from("hdusers")
    .select("id")
    .eq("email", email)
    .single();
  console.log(userid);

  if ((page === "login" && userid.data !== null) || (page === "signup" && userid.data == null)) {
    const otp = generateOTP();
    const otpToken = generateOtpToken(email, otp);
    console.log("Gen token:", otpToken);
    await sendOTPEmail(email, otp);
    res.status(200).send({ message: "OTP sent to email", otpToken });
  } else {
    res.status(200).send({ message: page === "login" ? "Account does not exist." : "Account already exists." });
  }
};

export const signup = async (req: Request, res: Response) => {
  const { name, dob, email, otp, otpToken } = req.body;
  console.log("Signnnn: ", req.body)

  try {
    const decoded = verifyToken(otpToken);
    console.log(decoded);
    if (decoded.email !== email || decoded.otp !== otp) {
      return res.status(400).send({ message: "Invalid OTP" });
    }

    // Insert user into Supabase database
    const { data, error } = await supabase
      .from("hdusers")
      .insert([{ name, dob, email }]);

    if (error) {
      return res.status(500).send({ message: "Error creating user", error });
    }

    res.status(201).send({ message: "User created successfully", data });
  } catch (error) {
    res.status(400).send({ message: "Invalid OTP token" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, otp, otpToken } = req.body;
  try {
    const decoded = verifyToken(otpToken);
    if (decoded.email !== email || decoded.otp !== otp) {
      return res.status(400).send({ message: "Invalid OTP" });
    }

    const { data, error } = await supabase
      .from("hdusers")
      .select("*")
      .eq("email", email)
      .single();

    const authToken = generateAuthToken(data.id, email);
    const userData = {
      id: data.id,
      name: data.name,
      email: data.email,
      dob: data.dob
    };
    res.status(200).send({ message: "User Logged in successfully", authToken, userData });
  } catch (error) {
    res.status(400).send({ message: "Invalid OTP token" });
  }
};
