// src/routes/index.js
const { sequelize } = require('../dataAccess/db')
const express = require('express');
const blogRoutes = require('./blogRoutes');
const authRoutes = require('./authRoutes');
const otpRoutes = require('./otpRoutes');
const authorRoutes = require('./authorRoutes');
const adsRoutes = require('./adsRoutes');
const newsletterRoutes = require('./newsletterRoutes');

const router = express.Router();

// Aggregate all routes
router.use('/api', blogRoutes);
router.use('/api/auth', authRoutes);
router.use('/api/auth', otpRoutes);
router.use('/api', authorRoutes);
router.use('/api', adsRoutes);
router.use('/api/newsletter', newsletterRoutes);

module.exports = router;
