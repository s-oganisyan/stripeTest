const express = require("express");
const { makeOnStripe } = require("../../services/stripeService");

const router = express.Router();

router.post("/stripe-webhooks", makeOnStripe);

module.exports = router;
