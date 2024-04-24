// src/routes/authRoutes.js
const express = require('express');
const { register, login, updateProfile, forgotPassword, resetPassword } = require('../controllers/authController');
const { authenticateUser } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.patch('/updateProfile', authenticateUser, updateProfile); // Requires authentication
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword', resetPassword);
// app.post('/api/auth/logout', (req, res) => {
//     res.clearCookie('userToken');
//     res.json({ success: true });
//   });
module.exports = router;
