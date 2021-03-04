const express = require("express");
//const stripeController = require('../../cors/subsription/stripeController');

const router = express.Router();

router.get("/helth-check", ({res}) => res.send("API is OK!"));

module.exports = router;
