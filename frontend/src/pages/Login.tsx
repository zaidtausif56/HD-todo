import React, { useState } from "react";
import { sendOtp, login } from "../api";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleSendOtp = async () => {
    try {
      await sendOtp(email, "login");
      setIsOtpSent(true);
      alert("OTP sent to your email");
    } catch (error) {
      console.error(error);
      alert("Error sending OTP");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await login(email, otp);
      console.log(response);
      localStorage.setItem("user", JSON.stringify(response.data)); // Save user info for dashboard
      alert("Login successful!");
      window.location.href = "/dashboard";
    } catch (error) {
      console.error(error);
      alert("Error during login");
    }
  };

  return (
    <div>
      <h1>Login</h1>
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
        <button onClick={handleLogin}>Login</button>
      )}
      <p>
        Don't have an account? <a href="/">Sign Up</a>
      </p>
    </div>
  );
};

export default Login;
