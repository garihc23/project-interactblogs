// src/controllers/authorController.js
const { Author, Post } = require('../models/index');
const { Op } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

// Create a new author
const createAuthor = async (req, res) => {
    try {
        const { name, email } = req.body;
        const authorDP = req.file ? req.file.filename : null;

        const newAuthor = await Author.create({
            authorId: uuidv4(),
            name,
            email,
            authorDP,
        });
        res.status(201).json(newAuthor);
    } catch (error) {
        console.error('Error creating author:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}; 

// Get all authors
const getAllAuthors = async (req, res) => {
    try {
        const { name } = req.query;
        const whereCondition = name ? { name: { [Op.like]: `%${name}%` } } : {};

        const authors = await Author.findAll({
            where: whereCondition,
        });

        res.json(authors);
    } catch (error) {
        console.error('Error getting all authors:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update an author by ID
const updateAuthor = async (req, res) => {
    const { authorId } = req.params;
    const { name, email, authorDP } = req.body;
    try {
        const author = await Author.findByPk(authorId);
        if (!author) {
            return res.status(404).json({ error: 'Author not found' });
        }
        await author.update({ name, email, authorDP });
        res.json(author);
    } catch (error) {
        console.error('Error updating author:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete an author by ID
const deleteAuthor = async (req, res) => {
    const { authorId } = req.params;
    try {
        const author = await Author.findByPk(authorId);
        if (!author) {
            return res.status(404).json({ error: 'Author not found' });
        }
        await author.destroy();
        res.json({ message: 'Author deleted successfully' });
    } catch (error) {
        console.error('Error deleting author:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAllAuthors,
    createAuthor,
    updateAuthor,
    deleteAuthor,
};