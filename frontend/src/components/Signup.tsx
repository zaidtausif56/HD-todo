import React, { useState, useEffect } from "react";
import { sendOtp, signup } from "../api";
import placeholder from "../images/placeholder.jpg";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import "./SignUp.css";

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    otp: "",
  });

  const [otpToken, setOtpToken] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [response, setResponse] = useState("");
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSendOtp = async () => {
    try {
      if (
        formData.email === "" ||
        formData.name === "" ||
        formData.dob === ""
      ) {
        setResponse("All feilds required!");
      }
      else {
        setResponse("Sending OTP. Please wait!");
        const res = await sendOtp(formData.email, "signup");
        if (res.message === "OTP sent to email.") {
          setOtpToken(res.otpToken);
          setIsOtpSent(true);
          setResponse(res.message);
        } else {
          setResponse(res.message);
        }
      }
    } catch (error) {
      console.error(error);
      setResponse("Error sending OTP");
    }
  };

  const handleClear = async () => {
    setIsOtpSent(false);
    setFormData({
      ...formData,
      name: "",
      dob: "",
      email: "",
      otp: ""
    });
  };

  const handleSignup = async () => {
    try {
      await signup(
        formData.name,
        formData.dob,
        formData.email,
        formData.otp,
        otpToken
      );
      setResponse("Signup successful!");
      window.location.href = "/login";
    } catch (error) {
      console.error(error);
      setResponse("Error during signup");
    }
  };

  return (
    <div className="signup-container">
      <div className="left-column">
        <div className="top">
          <div className="logo">
            <div>
              <img src={logo} alt="favicon" className="logo-image"></img>
            </div>
            <div className="icon">HD</div>
          </div>
        </div>

        <div className="content">
          <div className="text">
            <h1>Sign up</h1>
            <p>Sign up to enjoy the feature of HD</p>
          </div>

          <div className="form">
            <div className="input-group">
              <label>
                <input
                  type="text"
                  name="name"
                  placeholder=" "
                  value={formData.name}
                  disabled={isOtpSent}
                  onChange={handleInputChange}
                  required
                />
                <span>Your Name</span>
              </label>
            </div>

            <div className="input-group">
              <label>
                <input
                  type="date"
                  name="dob"
                  placeholder="yyyy-mm-dd"
                  value={formData.dob}
                  disabled={isOtpSent}
                  onChange={handleInputChange}
                  required
                />
                <span></span>
              </label>
            </div>

            <div className="input-group">
              <label>
                <input
                  type="email"
                  name="email"
                  placeholder=" "
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isOtpSent}
                  required
                />
                <span>Email</span>
              </label>
            </div>

            <div className="input-group">
              <label>
                <input
                  type="text"
                  name="otp"
                  placeholder=" "
                  value={formData.otp}
                  onChange={handleInputChange}
                  disabled={!isOtpSent}
                />
                <span>OTP</span>
              </label>
            </div>
            {isOtpSent ? (
              <div>
                <p onClick={handleSendOtp} className="forgot-password" id="p2">
                  Resend OTP
                </p>

                <p onClick={handleClear} className="forgot-password">
                  Clear
                </p> </div>

            ) : (
              <></>
            )}
            {!isOtpSent ? (
              <button className="primary-button" onClick={handleSendOtp}>
                Send OTP
              </button>
            ) : (
              <button className="primary-button" onClick={handleSignup}>
                Sign up
              </button>
            )}
            {response && <p className="response-message">{response}</p>}

            {/* <div className="divider"></div> */}
            <p className="signin-link">
              Already have an account? <a href="/login">Sign in</a>
            </p>
          </div>
        </div>
      </div>

      <div className="right-column">
        <div className="container">
          <img
            src={placeholder}
            alt="Decorative waves"
            className="decorative-image"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
