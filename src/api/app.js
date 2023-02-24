const express = require('express');
const app = express();

var keyUsers = require('./key-user-finder/model/KeyUsers');
app.use('/api/v1', keyUsers);

module.exports = app;