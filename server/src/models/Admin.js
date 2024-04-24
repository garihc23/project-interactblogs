// server/src/models/Admin.js
const { DataTypes, UUIDV4 } = require('sequelize');
const { sequelize } = require('../dataAccess/db');
// const Post = require('./Post');

const Admin = sequelize.define('Admin', {
  id:{
    type: DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement: true,
  },
  adminId: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4(), 
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensure email is unique
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull:true
  },
  // Add any other relevant fields for Admins
}/* , {
  tableName: 'Admin', // Explicitly set the table name
} */);

// Admin.hasMany(Post, { foreignKey: 'AdminId' });

module.exports = Admin;
