require("../models/index");
const express = require("express");

const stripeWebhooks = require("./routes/stripeWebhooks");
const healthcheck = require("./routes/healthcheck");

const router = express.Router();

router.use("/", stripeWebhooks);
router.use("/", healthcheck);


module.exports = router;
