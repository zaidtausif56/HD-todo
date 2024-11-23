import { Request, Response } from "express";
import supabase from "../supabaseClient";
import { generateOTP } from "../services/otpService";
import { sendOTPEmail } from "../services/emailService";

export const sendOTP = async (req: Request, res: Response) => {
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
      const otp = generateOTP();
      req.session.otp = otp;
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
      const otp = generateOTP();
      req.session.otp = otp;
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

  // Check if OTP matches
  if (otp !== req.session.otp) {
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
  if (otp !== req.session.otp) {
    return res.status(400).send({ message: "Invalid OTP" });
  }
  else {
    const { data, error } = await supabase
      .from("hdusers")
      .select("*")
      .eq("email", email)
      .single();
    if (error) return res.status(400).send({ message: "Error in getting user data" });
    res.status(200).send({ message: "OTP sent to email for login", data });
  }
};
