/**
 * M-Pesa Mwitu
 * Mohammed Sohail <sohail@forfuture.tech>
 */


exports = module.exports = {
    push
}


// npm-installed modules
const request = require("requestretry");


// own modules
const config = require("./config");


function push(data, callback) {
	request({
		method: "POST",
		uri: config.webhook.endpoint,
		strictSSL: config.webhook.ssl,
		body: data,
		json: true,
		maxAttempts: 5,
		retryDelay: 5000
	});
}