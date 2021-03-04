const mongoose = require("mongoose");
const express = require("express");

const router = express.Router();

router.get(
    "/healthcheck",
    async (req, res) => {
        res.status(200).write("Server status : OK \r\n");
        res.write(`MongoDB connect status : ${
            (mongoose.connection.readyState === 1) ? "OK" : "DEAD"
        }`);
        res.end();
    }
);


module.exports = router;

