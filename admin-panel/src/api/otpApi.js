// admin-panel/src/api/otpApi.js
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// API endpoint for OTP Email
export const emailOTPApi = async () => {
  try {
    // Include credentials: 'include' to ensure cookies (including session ID) are sent
    const response = await axios.post(`${BASE_URL}/auth/email-otp`, {}, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  }
};
// API endpoint for OTP verification
export const verifyOTPApi = async (otp) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/verify-otp`, {otp}, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  }
};
