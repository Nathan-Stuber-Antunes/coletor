const express = require('express');
const router = express.Router();
const isAuthorized = require("../auth.js");
const controller = require("./getKeyUsers.js");

router.get("/keyUsers", isAuthorized, controller.getKeyUsers)

module.exports = router;