import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendOtp, login } from "../api";
import "./Login.css";
import logo from "../images/logo.png";
import placeholder from "../images/placeholder.jpg";
import { useAuth } from "../context/AuthContext";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpToken, setOtpToken] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [response, setResponse] = useState("");
  const { setAccessToken, setUserData, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleSendOtp = async () => {
    try {
      if (email === "") {
        setResponse("Email Required!");
        return;
      }
      setResponse("Sending OTP. Please wait!");
      const res = await sendOtp(email, "login");
      if (res.message === "OTP sent to email.") {
        setOtpToken(res.otpToken);
        setIsOtpSent(true);
        setResponse(res.message);
      } else {
        setResponse(res.message);
      }
    } catch (error) {
      console.error(error);
      setResponse("Error sending OTP");
    }
  };

  const handleClear = async () => {
    setIsOtpSent(false);
    setEmail("");
    setOtp("");
  };

  const handleLogin = async () => {
    try {
      const response = await login(email, otp, otpToken);
      const { authToken, userData } = response;
      if (!authToken) {
        setResponse(response.message);
        return;
      }

      // Use the enhanced setAccessToken with persistence option
      setAccessToken(authToken, keepLoggedIn);
      setUserData(userData);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setResponse("Error during login");
    }
  };

  return (
    <div className="signin-container">
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
            <h1>Sign in</h1>
            <p>Please login to continue to your account.</p>
          </div>

          <div className="form">
            <div className="input-group">
              <label>
                <input
                  type="email"
                  placeholder=" "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  placeholder=" "
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  disabled={!isOtpSent}
                  required
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

            <label className="keep-logged-in">
              <input
                type="checkbox"
                checked={keepLoggedIn}
                onChange={(e) => setKeepLoggedIn(e.target.checked)}
              />
              <span>Keep me logged in</span>
            </label>

            {!isOtpSent ? (
              <button className="primary-button" onClick={handleSendOtp}>
                Send OTP
              </button>
            ) : (
              <button className="primary-button" onClick={handleLogin}>
                Sign in
              </button>
            )}
            {response && <p className="response-message">{response}</p>}
          </div>
          {/* <div className="divider"></div> */}
          <p className="signup-link">
            Need an account? <a href="/">Create one</a>
          </p>
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

export default Login;
