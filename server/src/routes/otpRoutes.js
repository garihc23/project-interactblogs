// src/routes/authRoutes.js
const express = require('express');
const { verifyOtp, emailOtp } = require('../controllers/otpController');

const router = express.Router();

// Route for sending OTP Email
router.post('/email-otp', emailOtp);
// Route for OTP verification
router.post('/verify-otp', verifyOtp);

module.exports = router;
