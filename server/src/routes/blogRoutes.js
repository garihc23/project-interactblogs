// src/routes/blogRoutes.js
const express = require('express');
const blogController = require('../controllers/blogController');
const { authenticateUser, authorizeAdmin } = require('../middleware/authMiddleware');
const uploadMiddleware = require('../middleware/uploadMiddleware');

const router = express.Router();

// Get all posts
router.get('/posts', blogController.getAllPosts);

// Get a single post by ID
router.get('/posts/:id', blogController.getPostById);

// // Get all posts belonging to a specific author by authorId
// router.get('/posts/:authorId', blogController.getPostsByAuthorId);

// Get trending posts
router.get('/trendingPosts', blogController.getTrendingPosts);

// Get latest posts
router.get('/latestPosts', blogController.getLatestPosts);

//Get posts by category
router.get('/posts/categories/:category', blogController.getPostsByCategory);

// Protected routes (require authentication)

// Create a new post (only admin can create a post)
router.post('/posts', authenticateUser, authorizeAdmin, blogController.createPost);

// Update a post by ID (only admin can update a post)
router.patch('/posts/:id', authenticateUser, authorizeAdmin, blogController.updatePost);

// Delete a post by ID (only admin can delete a post)
router.delete('/posts/:id', authenticateUser, authorizeAdmin, blogController.deletePost);


// ... (other routes)



module.exports = router;
