/**
 * M-Pesa Mwitu
 * Mohammed Sohail <sohail@forfuture.tech>
 */


exports = module.exports = {
    parse
}


// own modules
const Payment = require("../schemas/payments");
const webhook = require("../integrations/webhook");


function parse(message, callback) {
    const regex = new RegExp(/([A-Z0-9]+) Confirmed\.[\s\n]*You have received Ksh([0-9\.\,]+00) from[\s\n]+([0-9A-Z '\.]+) ([0-9]+)[\s\n]*on (\d\d?\/\d\d?\/\d\d) at (\d\d?:\d\d [AP]M)[\s\n]*New M-PESA balance is Ksh([0-9\.\,]+00)/mi);
    const match = message.match(regex);

    if (match) {
        const tx = new Payment({
            receipt: match[1],
            amount: parseInt(match[2].replace(/[^0-9 | ^.]/g, "")),
            phone: match[4],
            name: match[3],
            timestamp: `${match[6]} ${match[5]}`
        });
        return tx.save((error, result) => {
            if (error) {
                return callback({ ok: false, message: "Transaction could not be saved", payload: error.message });
            }
            callback({ ok:true, message: "Transaction successfully saved", payload: result });
            return webhook.push(result);
        })
    } else {
        return callback({ type: "DONT_PROCESS" });
    }
}