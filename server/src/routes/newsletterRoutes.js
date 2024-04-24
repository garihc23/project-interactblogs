// src/routes/newsletterRoutes.js
const express = require('express');
const router = express.Router();
const { authenticateUser, authorizeAdmin } = require('../middleware/authMiddleware');
const {
    subscribeToNewsletter,
    getAllSubscriptions,
    blockSubscription,
    deleteSubscription,
} = require('../controllers/newsletterController');
const { downloadActiveSubscribers } = require('../controllers/newsletterController');

// Subscribe to newsletter
router.post('/subscribe', subscribeToNewsletter);

// Get all subscriptions
router.get('/subscriptions', authenticateUser, authorizeAdmin, getAllSubscriptions);

// Block subscription
router.patch('/subscriptions/block/:subscribeId', authenticateUser, authorizeAdmin, blockSubscription);

// Delete subscription
router.delete('/subscriptions/:subscribeId', authenticateUser, authorizeAdmin, deleteSubscription);

// Download active subscribers as CSV
router.get('/subscriptions/download', authenticateUser, authorizeAdmin, downloadActiveSubscribers);

module.exports = router;
