const express = require('express');
const app = express();

var keyUserFinder = require('./key-user-finder/keyUsers.js');
app.use('/api/vi/', keyUserFinder);

module.exports = app;