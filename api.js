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
const message = require("./core/message");
const package = require("./package");
const Payment = require("./schemas/payments");


// module variables
mongoose.connect(config.db);

const db = mongoose.connection;

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/transactions/receipt/:receipt", (req, res) => {
    return Payment.findOne({
        receipt: req.params.receipt
    }, {
        __v: 0,
        _id: 0
    }, (err, doc) => {
        if (doc === null) {
            return res.status(400).json({ ok: false, message: "Could not find the specified transaction" });
        } else {
            return res.status(200).json({ ok: true, message: "Transaction found", payload: doc });
        }
    });
});

app.get("*", (req, res) => {
    return res.send({ name: "M-Pesa Mwitu", version: package.version });
})

app.post("/", (req, res) => {
    if (req.body.secret === config.secret && req.body.from === "MPESA") {
        return message.parse(req.body.message, (ctx) => {
            if (ctx.ok === false) {
                return res.status(500).json(ctx);
            } else {
                return res.status(200).json(ctx);
            }
        });
    }
});


db.once("open", () => {
    console.log("Successfully connected to DB");
    app.listen(config.server.port, () => {
        console.log(`Server started on port ${config.server.port}`);
    }); 
});

db.on("error", error => {
    console.error("Failed to connect to DB");
});

db.on("disconnected", () => {
    console.log("Connection to DB disconnected");
});