import React, { useState } from "react";
import { sendOtp, signup } from "../api";

const Signup: React.FC = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleSendOtp = async () => {
    try {
      await sendOtp(email, "signup");
      setIsOtpSent(true);
      alert("OTP sent to your email");
    } catch (error) {
      console.error(error);
      alert("Error sending OTP");
    }
  };

  const handleSignup = async () => {
    try {
      await signup(name, dob, email, otp);
      alert("Signup successful!");
      window.location.href = "/login";
    } catch (error) {
      console.error(error);
      alert("Error during signup");
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="date"
        placeholder="Date of Birth"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {isOtpSent && (
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      )}
      {!isOtpSent ? (
        <button onClick={handleSendOtp}>Send OTP</button>
      ) : (
        <button onClick={handleSignup}>Signup</button>
      )}
      <p>
        Already have an account? <a href="/login">Signin</a>
      </p>
    </div>
  );
};

export default Signup;
