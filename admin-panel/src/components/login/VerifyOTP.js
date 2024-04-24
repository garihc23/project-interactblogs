// src/components/admin/VerifyOTP.js
import React, { useState } from 'react';

const VerifyOTP = ({ onVerify }) => {
  const [otp, setOTP] = useState('');
  const [error, setError] = useState('');

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      // Call the onVerify callback function with the entered OTP
      await onVerify(otp);
    } catch (error) {
      setError('Error verifying OTP: ' + error.message);
    }
  };

  const handleInputChange = (e) => {
    setOTP(e.target.value);
  };

  return (
    <div className="verify-otp-container">
      <h2>Verify OTP</h2>
      <form className="verify-otp-form" onSubmit={handleVerifyOTP}>
        <label className="verify-otp-label">
          Enter OTP:
          <input
            type="text"
            name="otp"
            className="verify-otp-input"
            value={otp}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit" className="verify-otp-button">
          Verify OTP
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default VerifyOTP;
