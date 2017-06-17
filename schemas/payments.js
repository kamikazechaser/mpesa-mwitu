/**
 * M-Pesa Mwitu
 * Mohammed Sohail <sohail@forfuture.tech>
 */


// npm installed modules
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const paymentSchema = new Schema({
    receipt: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    time: {
        type: String,
        require: true
    },
    used: {
        type: Boolean,
        required: true,
        default: false
    }
});

const Payment = mongoose.model("Payment", paymentSchema, "payments");

module.exports = Payment;