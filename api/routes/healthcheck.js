import mongoose from "mongoose";
const express = require("express");

const router = express.Router();

export default () => {
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
};

module.exports = router;

