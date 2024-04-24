// src/models/Post.js
const { Sequelize, DataTypes, UUIDV4 } = require('sequelize');
const { sequelize } = require('../dataAccess/db');
const Admin = require('./Admin');
const Author = require('./Author');

const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  postId: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4(),
    primaryKey: true,
    allowNull: false,
    unique:true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shortDescription: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  views: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  headerImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

Post.prototype.incrementViews = async function () {
  this.views += 1;
  await this.save();
};


// Define associations
Post.belongsTo(Author, { foreignKey: 'authorId' });
Author.hasMany(Post, { foreignKey: 'authorId' });

// Post.belongsTo(Admin, { foreignKey: 'adminId' });
// Admin.hasMany(Post, { foreignKey: 'adminId' });

module.exports = Post;
