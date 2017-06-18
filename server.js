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
const config = require("./config");
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
    }, (error, doc) => {
        if (doc === null) {
            return res.status(404).json({ ok: false, message: "Could not find the specified transaction" });
        } 
        if (error) {
            return res.status(500).json({ ok: false, message: "Internal server error" });
        }
        return res.status(200).json({ ok: true, message: "Transaction found", payload: doc });
    });
});

app.get("/api/transactions/phone/:phone", (req, res) => {
    return Payment.find({
        phone: req.params.phone
    }, {
        __v: 0,
        _id: 0
    }, (error, doc) => {
        if (doc === null) {
            return res.status(404).json({ ok: false, message: "Could not find the specified transaction" });
        }
        if (error) {
            return res.status(500).json({ ok: false, message: "Internal server error" });
        }
        return res.status(200).json({ ok: true, message: "Transaction(s) found", payload: doc });
    });
});

app.get("/api/transactions/validate/:receipt", (req, res) => {
    return Payment.findOneAndUpdate({
        receipt: req.params.receipt
    }, {
        $set: {
            used: true
        }
    }, (error, doc) => {
        if (error) {
            return res.status(500).json({ ok: false, message: "Could not update transaction status" });
        } else {
            return res.status(200).json({ ok: true, message: "Transaction status updated" });
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
            } 
            if (ctx.type === "DONT_PROCESS") {
                return res.status(200).json(ctx);
            }
            return res.status(200).json(ctx);
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