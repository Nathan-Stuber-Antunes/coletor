const express = require('express');
const app = express();
const router = express.Router();

const index = require('./routes/index')
const personRoute = require('./routes/personRouter')
app.use('/', index)
app.use('/persons', personRoute);
module.exports = app;