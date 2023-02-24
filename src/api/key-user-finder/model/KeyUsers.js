const express = require('express');
const router = express.Router();
const isAuthorized = require("../../auth.js");
const controller = require("../controller/keyUsers.js");

router.get("/keyUsers", isAuthorized, controller.keyUsers)
router.post("/keyUsers", isAuthorized, controller.keyUsers)

module.exports = router;
//https://blog.bossabox.com/arquitetura-de-projeto-node-js-prova-de-balas/