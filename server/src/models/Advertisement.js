//server/src/models/Advertisement.js
const { DataTypes, UUIDV4 } = require('sequelize');
const { sequelize } = require('../dataAccess/db');

const Advertisement = sequelize.define('Advertisement', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  advertisementId: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4(), 
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  adImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  targetUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  width: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  height: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  views: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0, // Default value for views
  },
  clicks: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0, // Default value for clicks
  },
  adType: {
    type: DataTypes.STRING, // Assuming adType is a string
    allowNull: true, // Adjust as needed
  },
  // Add any other relevant fields for advertisements
}, {
  timestamps: true, // Enable timestamps for createdAt and updatedAt
});

module.exports = Advertisement;
