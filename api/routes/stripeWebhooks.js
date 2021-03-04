const express = require("express");

const router = express.Router();

router.post("/stripe-webhooks", ({res}) => res.send("API is OK!"));

module.exports = router;
