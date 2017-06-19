/**
 * M-Pesa Mwitu
 * Mohammed Sohail <sohail@forfuture.tech>
 */


exports = module.exports = {
    server: {
        // Port on which the server will run on
        // defaults to 3000
        port: process.env.PORT || 3000
    },
    // MongoDB url
    db: process.env.MONGO || "",
    // smsSync secret
    secret: process.env.SECRET || ""
}