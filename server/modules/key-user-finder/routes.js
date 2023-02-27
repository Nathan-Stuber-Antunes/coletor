const express = require('express');
const router = express.Router();
const isAuthorized = require("../../auth/auth");

const keyUser = require("./keyUser/getKeyUser");

router.get("/keyUsers", isAuthorized, keyUser.getKeyUser)

module.exports = router;