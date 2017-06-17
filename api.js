/**
 * M-Pesa Mwitu
 * Mohammed Sohail <sohail@forfuture.tech>
 */


// npm-installed modules
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");


// own modules
const config = require("./core/config");


// module variables
mongoose.connect(config.db);

const db = mongoose.connection;

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


db.once("open", () => {
    console.log("Successfully connected to DB");
    app.listen(config.server.port, () => {
        onsole.log(`Server started on port ${config.server.port}`);
    });
});

db.on("error", error => {
    console.error("Failed to connect to DB");
});

db.on("disconnected", () => {
    console.log("Cnnection to DB disconnected");
});