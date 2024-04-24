//server/src/services/otpGeneratorService.js
const otpGenerator = require('otp-generator');

const generateOTP = () => {
    // Generate a 6-digit OTP
    return otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });
};

module.exports = {
    generateOTP,
};
