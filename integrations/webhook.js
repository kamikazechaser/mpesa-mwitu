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


function push(data, endpoint, callback) {
	request({
		method: "POST",
		uri: endpoint,
		strictSSL: config.webhook.ssl,
		body: data,
		json: true,
		maxAttempts: 5,
		retryDelay: 5000
	}, (error, response, body) => {
		if (!error && response.statusCode === 200) {
			callback(null, { ok: true, message: "POST sent successfully" });
		} else {
			callback({ ok: false, message: "Retry failed" });
		}
	});
}