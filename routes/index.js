const express = require('express');
const app = express();

var keyUserFinder = require('./api/key-user-finder/key-user-finder.js');
app.use('/key-user-finder', keyUserFinder);

module.exports = app;