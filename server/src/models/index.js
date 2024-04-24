//server/src/models/index.js
const express = require('express');
const Post = require('./Post')
const Admin = require('./Admin')
const Author = require('./Author');
const Advertisement = require('./Advertisement');
const Newsletter = require('./Newsletter');

module.exports = {
    Post: Post,
    Admin: Admin,
    Author:Author,
    Advertisement:Advertisement,
    Newsletter: Newsletter,
}