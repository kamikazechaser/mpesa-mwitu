> 📲 M-Pesa Mwitu

A simple personal M-Pesa API gateway accesible via REST


## About

This project allows you to proccess payments receieved on your personal M-Pesa account via REST. It is heavily inspired by PesaPI.

**Important Information**

- You will need the [smsSync app](https://play.google.com/store/apps/details?id=org.addhen.smssync) installed on your Android phone.
- This project will need to be deployed independently.
- This project uses MongoDB as its primary (and only) database.

**REST API Information**

Every request returns:
 
- Actual server status codes
- An "ok" status
- A short message
- Payload (if available).


## Configuration

Prior to running the server, you need to populate the [configuration](https://github.com/kamikazechaser/mpesa-mwitu/blob/master/config.dist.js) file.

smsSync configuration

- Data format should be JSON
- HTTP method should be POST
- Secret should be the same you enter in the config file above

## Easy Deployment

You can easily deploy a instance of M-Pesa Mwitu on Heroku. Simply click on the button below.

If you need a MongoDB instance, head over [here](https://mlab.com) to get one.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## API Reference

GET /api/transactions/receipt/:receipt

> Get a transaction by receipt

GET /api/transactions/phone/:phone

> Get all transactions linked to a specific phone number

GET /api/transactions/validate/:receipt

> Validate the "used" field. Useful in cases such as online shops and digital goods


## Issues And Contribution

Fork the repository and submit a pull request for whatever change you want to be added to this project. If you have any questions, just open an issue.

## License

Released under AGPL-3.0