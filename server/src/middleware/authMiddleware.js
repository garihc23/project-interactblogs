// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const { Admin } = require('../models/index');

const authenticateUser = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', ''); // || req.cookies.token;

        console.log("Middleware Token Log:", token);

        if (!token) {
            throw new Error('Token not provided');
        }

        const decodedToken = jwt.verify(token, 'your-jwt-secret-key');

        if (!decodedToken.userId) {
            throw new Error('Invalid token format');
        }

        const user = await Admin.findOne({ where: { adminId: decodedToken.userId } });

        if (!user) {
            throw new Error('User not found');
        }

        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        console.error('Authentication error:', error.message);
        res.status(401).json({ error: error.message || 'Authentication failed' });
    }
};

const authorizeAdmin = (req, res, next) => {
    try {
        if (!req.user || !req.user.isAdmin) {
            throw new Error('User is not an admin');
        }
        next();
    } catch (error) {
        console.error('Authorization error:', error.message);
        res.status(403).json({ error: error.message || 'Unauthorized' });
    }
};

module.exports = {
    authenticateUser,
    authorizeAdmin,
};

