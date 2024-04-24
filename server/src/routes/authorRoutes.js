// src/routes/authorRoutes.js
const express = require('express');
const authorController = require('../controllers/authorController');
const { authenticateUser, authorizeAdmin } = require('../middleware/authMiddleware');
const uploadMiddleware = require('../middleware/uploadMiddleware');

const router = express.Router();

// Get all authors
router.get('/authors', authorController.getAllAuthors);

// Protected routes (require authentication)

// Create a new author (only admin can create an author)
router.post('/authors', authenticateUser, authorizeAdmin, authorController.createAuthor);

// Update an author by ID (only admin can update an author)
router.patch('/authors/:authorId', authenticateUser, authorizeAdmin, authorController.updateAuthor);

// Delete an author by ID (only admin can delete an author)
router.delete('/authors/:authorId', authenticateUser, authorizeAdmin, authorController.deleteAuthor);

// Get all posts belonging to a specific author by authorId
// router.get('/authors/:authorId/posts', authorController.getPostsByAuthor);

// ... (other routes)

module.exports = router;
