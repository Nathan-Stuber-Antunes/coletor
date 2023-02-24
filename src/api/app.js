const express = require('express');
const app = express();

var keyUsers = require('./key-user-finder/index.js');
app.use('/api/v1', keyUsers);

module.exports = app;