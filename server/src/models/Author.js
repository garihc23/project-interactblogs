// src/models/Author.js
const { Sequelize, DataTypes, UUIDV4 } = require('sequelize');
const { sequelize } = require('../dataAccess/db');

const Author = sequelize.define('Author', {
  authorId: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4(),
    primaryKey: true,
    allowNull:false,
    unique:true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  authorDP: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  // Add any other relevant fields for Authors
});

module.exports = Author;