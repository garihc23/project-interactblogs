// models/Newsletter.js

const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../dataAccess/db');

const Newsletter = sequelize.define('Newsletter', {
  subscribeId: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: "Please enter a valid email address"
      }
    }
  },
  isBlocked: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false, // Default value for isBlocked column
  }
});

module.exports = Newsletter;
