// src/controllers/authController.js
const { Admin } = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authenticateUser, authorizeAdmin } = require('../middleware/authMiddleware');

// let cookieParser = require('cookie-parser'); 


// Controller function for user registration
const register = async (req, res) => {
  try {
    // You may want to add validation and error handling here
    const { name, email, password, isAdmin } = req.body;
    console.log(req.body)
    // Check if the email is already registered
    const existingUser = await Admin.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await Admin.create({
      name,
      email,
      password: hashedPassword,
      isAdmin,
    });

    // You can generate a JWT token for the user here if needed

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Controller function for user login
const login = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;

    const user = await Admin.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    req.session.email = email;
    req.session.save();
    req.session.user=user;
    req.session.save();
    req.session.rememberMe=rememberMe;
    req.session.save();
    console.log(req.session);
 
    return res.status(200).json({
      message: 'Credentials Verified Successfully',
      // session: req.session 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function for updating a user's profile
const updateProfile = async (req, res) => {
  try {
    // You may want to add validation and error handling here
    const { name } = req.body;
    const userId = req.user.adminid; // Assuming you have middleware to extract user information from the JWT

    // Check if the user exists
    const user = await Admin.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the user has the right to update their profile
    if (userId !== user.adminid) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Update the user's profile
    await user.update({ name });

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function for initiating password reset
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the user exists
    const user = await Admin.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate a password reset token (for simplicity, you can use a library like `crypto` for a random token)
    const resetToken = jwt.sign({ userId: user.adminid }, 'your-reset-secret-key', {
      expiresIn: '1h', // Token expires in 1 hour
    });

    // Send the password reset email
    await sendPasswordResetEmail(email, resetToken);
    console.log("resetToken: ", resetToken)  //to be removed in production
    res.status(200).json({ message: 'Password reset email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function for resetting password
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Verify the reset token
    const decodedToken = jwt.verify(token, 'your-reset-secret-key');
    const userId = decodedToken.userId;

    // Update the user's password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await Admin.update({ password: hashedPassword }, { where: { id: userId } });

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Add more controller functions for handling authentication and authorization as needed

module.exports = {
  register,
  login,
  updateProfile,
  forgotPassword,
  resetPassword,
  // Add more exported functions as needed
};