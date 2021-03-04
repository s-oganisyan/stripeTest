const express = require("express");
const { makeOnStripe } = require("../../services/stripeService");

const router = express.Router();

console.log(typeof makeOnStripe, "makeOnStripe")
router.post("/stripe-webhooks", makeOnStripe);

module.exports = router;
