// src/controllers/blogController.js
const { Op } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const { Post, Author } = require('../models/index');

// Create a new blog post
const createPost = async (req, res) => {
  try {
    // Extract necessary data from the request body
    const { title, shortDescription, content, category, date, time, author, authorId } = req.body;
 
      const headerImage = req.file ? req.file.filename : null;

    // Create the post
    const newPost = await Post.create({
      postId: uuidv4(), // Generate a unique postId 
      title,
      shortDescription,
      content,
      category,
      date,
      time,
      author,
      authorId,
      headerImage,
    });

    return res.status(201).json(newPost);
  // });
  } catch (error) {
    // Inside the catch block of createPost function
    console.error('Error creating post:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all blog posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    // console.log(posts);
    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a single post by ID
const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    console.log("BAKPID",postId)
    const post = await Post.findOne({ where: { postId } });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    await post.incrementViews();
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all posts belonging to a specific author by authorId
const getPostsByAuthorId = async (req, res) => {
  const { authorId } = req.params;
  try {
    // Check if the author exists
    const author = await Author.findByPk(authorId);
    if (!author) {
      return res.status(404).json({ error: 'Author not found' });
    }

    // Get all posts belonging to the author
    const posts = await Post.findAll({ where: { authorId } });

    res.json(posts);
  } catch (error) {
    console.error('Error getting posts by author:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a blog post by ID
const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, shortDescription, content, category, date, time, author, authorId } = req.body;

    const existingPost = await Post.findOne({ where: { postId } });

    if (!existingPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Update the post with the new data
    const updatedPost = await existingPost.update({
      title,
      shortDescription,
      content,
      category,
      date,
      time,
      author,
      authorId,
    });

    return res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a blog post by ID
const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    // Check if the post exists
    const existingPost = await Post.findOne({ where: { postId } });

    if (!existingPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Delete the post
    await existingPost.destroy();

    return res.status(204).send(); // 204 No Content for successful deletion
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get trending blog posts based on views
const getTrendingPosts = async (req, res) => {
  console.log("TRENDING POSTS-------");
  try {
    console.log('Executing getTrendingPosts');
    const trendingPosts = await Post.findAll({
      where: null, // Empty condition, no WHERE clause
      order: [['views', 'DESC']],
      limit: 6,

    });
    console.log(trendingPosts);
    return res.status(200).json(trendingPosts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Get latest blog posts based on date and time
const getLatestPosts = async (req, res) => {
  try {
    const latestPosts = await Post.findAll({
      order: [['date', 'DESC'], ['time', 'DESC']],
      limit: 6, // You can adjust the limit based on your preference
    });
    // latestPosts.reverse();
    return res.status(200).json(latestPosts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getPostsByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const posts = await Post.findAll({
      where: { category },
      order: [['date', 'DESC'], ['time', 'DESC']],
    });

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Add more controller functions based on your requirements (updatePost, deletePost, getTrendingPosts, getLatestPosts, etc.)

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  getPostsByAuthorId,
  updatePost,
  deletePost,
  getTrendingPosts,
  getLatestPosts,
  getPostsByCategory,
  // Add other functions as needed
};
