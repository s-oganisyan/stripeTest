require("../models/index");
const express = require("express");

const stripeWebhooks = require("./routes/stripeWebhooks");

const router = express.Router();

router.use("/", stripeWebhooks);

module.exports = router;
