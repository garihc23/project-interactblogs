// src/dataAccess/db.js
const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
// require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  dialect: 'mysql',
  host: process.env.DB_HOST,
  define: {
    timestamps: true,
  },
});

 
module.exports = { 
  sequelize/* , // Export the sequelize instance 
  Sequelize, // Export the Sequelize class (optional, but can be useful) */
};

