// server/src/controllers/otpController.js
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { generateOTP } = require('../services/otpGeneratorService')
const { sendOtpVerificationEmail } = require('../services/emailService');
const { authenticateUser, authorizeAdmin } = require('../middleware/authMiddleware');

const adminSecretKey = process.env.ADMIN_JWT_SECRET_KEY;

const emailOtp = async (req, res) => {
    try {
        const generatedOtp = generateOTP();
        // console.log("generatedOtp", generatedOtp)
        console.log("GEN-OTP", generatedOtp);
        const otpToken = jwt.sign({ generatedOtp }, 'otp-secret-key', { expiresIn: '5m' });
        req.session.otpToken = otpToken;
        req.session.save();
        // console.log("AGAIN!", req.session);
        const email = req.session.email;
        await sendOtpVerificationEmail(email, 'Login OTP', `Your OTP for login is: ${generatedOtp}`);
        return res.status(200).json({
            message: 'OTP sent on Email',
        });
    } catch (error) { 
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
} 

// Function to verify the OTP 
const verifyOtp = async (req, res) => {
    try {
        // Retrieve stored OTP token from session
        // console.log("_SESSION!", req)
        const rememberMe = req.session.rememberMe;
        const storedOtpToken = req.session.otpToken;
        // console.log("_Stored_tokken", storedOtpToken)

        // Retrieve entered OTP from the request body
        const enteredOtp = req.body.otp;
        // console.log("enteredOTP",enteredOtp)

        if (!storedOtpToken) {
            return res.status(401).json({ error: 'Problem storing token value' });
        }

        // Convert entered OTP into JWT for comparison
        const storedOtp = jwt.verify(storedOtpToken, 'otp-secret-key');
        // console.log("OTP",storedOtp.generatedOtp)

        // Compare entered OTP token with stored OTP token
        if (storedOtp.generatedOtp === enteredOtp) {
            // OTP verification successful
            const token = await userToken(req);
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : 1 * 60 * 60 * 1000,
                sameSite: 'lax',
            });
            const response = {
                message: 'OTP verification successful',
                success: true,
                token
            };
            return res.status(200).json(response);
            // await userToken(req, res);
            // return res.status(200).json({ message: 'OTP verification successful' });
        }
        // OTP verification failed
        return res.status(401).json({ error: 'Invalid OTP' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const userToken = async (req, res) => {
    try {
        const rememberMe = req.session.rememberMe;
        const user = req.session.user;
        const tokenExpiration = rememberMe ? '30d' : '1h'; // 30 days if rememberMe, 1 hour otherwise
        const token = jwt.sign({ userId: user.adminId, isAdmin: user.isAdmin }, adminSecretKey, {
            expiresIn: tokenExpiration,
        });
        if (!token) {
            return res.status(500).json({ error: 'Error Generating User Token' });
        }
        return token;
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
module.exports = {
    verifyOtp,
    emailOtp
};
