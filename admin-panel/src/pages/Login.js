//admin-panel/src/pages/Login.js

import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.js';
import { loginUser } from '../api/authApi.js';
import { emailOTPApi, verifyOTPApi } from '../api/otpApi.js';
import Cookies from 'js-cookie';
import VerifyOTP from '../components/login/VerifyOTP'; // Import OTP verification component
import '../assets/css/Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '', rememberMe: false });
  const [otpToken, setOtpToken] = useState(null); // State to store OTP token
  const [showOTPInput, setShowOTPInput] = useState(false); // State to control OTP input field visibility
  const [loginError, setLoginError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(credentials);
      console.log("logininfo", response);

      if (response) {
        setShowOTPInput(true);
        handleOtpSend();
      }
    } catch (error) {
      setLoginError('Login error: ' + error.message);
    }
  };

  const handleOtpSend = async (email) => {
    try {
      const response = await emailOTPApi(email);
      console.log("OTP sent:", response);
      // Handle response as needed
      if (response) {
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      // Handle error
    }
  }

  const handleOTPVerification = async (otp) => {
    try {
      const otpVerified = await verifyOTPApi(otp);
      console.log("VERIF RESPONSE", otpVerified);
  
      if (otpVerified.success) {
        // Store token in local storage
        console.log("USerLOGGEDIN")
        localStorage.setItem('token', otpVerified.token);
        login();
        navigate('/admin-panel');
      } else {
        setLoginError('OTP verification failed');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      setLoginError('OTP verification failed: ' + error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Handle checkbox separately
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className="login-container">
      {!showOTPInput &&
        <>
          <h2>Login</h2>
          <form className="login-form" onSubmit={handleLogin}>
            <label className="login-label">
              Email:
              <input
                type="text"
                name="email"
                className="login-input"
                value={credentials.email}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label className="login-label">
              Password:
              <input
                type="password"
                name="password"
                className="login-input"
                value={credentials.password}
                onChange={handleInputChange}
              />
            </label>
            <br />
            {/* Remember Me checkbox */}
            <label className="login-label">
              <input
                type="checkbox"
                name="rememberMe"
                checked={credentials.rememberMe}
                onChange={handleInputChange}
              />
              Remember Me
            </label>
            <br />
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </>
      }
      {showOTPInput &&
        <VerifyOTP onVerify={
          (otp) => {
            handleOTPVerification(otp);
          }}
        />}
      {loginError && <p className="error-message">{loginError}</p>}
    </div>
  );
};

export default Login;









// import { logoutUser } from '../api/authApi';

// const LogoutComponent = () => {
//   const handleLogout = async () => {
//     try {
//       await logoutUser();
//       // Perform any additional cleanup or navigation as needed
//     } catch (error) {
//       console.error('Logout error:', error);
//       // Handle error
//     }
//   };

//   return (
//     <button onClick={handleLogout}>Logout</button>
//   );
// };
