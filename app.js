/* eslint-disable camelcase */
const express = require("express"),
    bodyParser = require("body-parser"),
    cors = require("cors"),
    path = require("path"),
    errorHandler = require("errorhandler"),
    app = express(),
    mongoose = require("mongoose"),
    router = require("./api");

const dev_db_url = "mongodb://localhost:27017/users";
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);


const isProduction = process.env.NODE_ENV === "production";
app.use(express.static(path.join(__dirname, "public")));

if (!isProduction) {
    app.use(errorHandler());
}

mongoose.set("debug", true);

const port = 3001;
app.listen(port, () => {
    console.log(`Server is up and running on port numner ${port}`);
});

module.exports = app;
