//server/src/services/emailService.js
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const { response } = require('express');
dotenv.config();

const sendOtpVerificationEmail = async (to, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMPT_PASSWORD,
            },
            authMethod: 'PLAIN', // Specify the authentication method (PLAIN, LOGIN, XOAUTH2, etc.)
            tls: {
                // Do not fail on invalid certificates
                rejectUnauthorized: false,
            },
        });

        const mailOptions = {
            from: process.env.SMTP_MAIL,
            to: to,
            subject: subject,
            text: text,
        };

        const response = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        // return response;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

module.exports = {
    sendOtpVerificationEmail,
};


