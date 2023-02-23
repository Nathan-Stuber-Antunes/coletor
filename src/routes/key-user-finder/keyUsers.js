const express = require('express');
const router = express.Router();
const isAuthorized = require("../auth.js")

router.get("/keyUsers", isAuthorized, (req, res) => {
    const products = [
        {
          id: 1,
          name: "hammer",
        },
        {
          id: 2,
          name: "screwdriver",
        },
        {
          id: 3, 
          name: "wrench",
        },
       ];
    res.json(products)
})

module.exports = router;