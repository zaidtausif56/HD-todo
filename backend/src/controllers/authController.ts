import { Request, Response } from "express";
import supabase from "../supabaseClient";
import { generateOTP } from "../services/otpService";
import { sendOTPEmail } from "../services/emailService";
import { generateOtpToken } from '../utils/jet';

const otpStore = new Map<string, { otp: string; expiresAt: number }>();
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
  if (page == "login") {
    if (userid.data !== null) {
      console.log("Login otp being sent.");
      const otp = generateOTP();
      const expiresAt = Date.now() + 5 * 60 * 1000;
      otpStore.set(email, { otp, expiresAt });
      // req.session.otp = otp;
      // Send OTP to email
      await sendOTPEmail(email, otp);
      res.status(200).send({ message: "OTP sent to email" });
    }
    else {
      res.status(200).send({ message: "Account does not exist. Create an account" });
    }
  }
  else if (page == "signup") {
    if (userid.data == null) {
      console.log("Signup otp being sent.");
      const otp = generateOTP();
      const expiresAt = Date.now() + 5 * 60 * 1000;
      otpStore.set(email, { otp, expiresAt });
      // req.session.otp = otp;
      // Send OTP to email
      await sendOTPEmail(email, otp);
      res.status(200).send({ message: "OTP sent to email" });
    }
    else {
      res.status(200).send({ message: "Account already exists goto login." });
    }


  }
  else {
    console.log("Invalid request.");
    res.status(400).send({ message: "Invalid Request" });
  }
};

export const signup = async (req: Request, res: Response) => {
  const { name, dob, email, otp } = req.body;
  console.log("Signnnn: ", req.body)

  // Check if OTP matches
  const otpData = otpStore.get(email);
  if (!otpData || otpData.otp !== otp || Date.now() > otpData.expiresAt) {
    console.log(req.session.otp);
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
};

export const login = async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  const otpData = otpStore.get(email);
  if (!otpData || otpData.otp !== otp || Date.now() > otpData.expiresAt) {
    return res.status(400).send({ message: "Invalid OTP" });
  }
  else {
    const { data, error } = await supabase
      .from("hdusers")
      .select("*")
      .eq("email", email)
      .single();
    if (error) return res.status(400).send({ message: "Error in getting user data" });
    res.status(200).send({ message: "User Logged in successfully", data });
  }
};
