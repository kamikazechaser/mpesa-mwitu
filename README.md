> 🏛 M-Pesa Mwitu

A simple personal M-Pesa API gateway accesible via REST


## About

This project allows you to proccess payments receieved on your personal M-Pesa account via REST. It is heavily inspired by PesaPI.

**Important Information**

- You will need the smsSync App installed on your phone.
- This is not a library, and will need to be deployed independently.
- This project uses MongoDB as its primary (and only) database.

**REST API Information**

Every request returns actual status codes, an "ok" status, a short message and payload (if available).


## Installation

```bash
$ git clone https://github.com/kamikazechaser/mpesa-mwitu.git
$ cd mpesa-mwitu
$ npm install

# Populate the config file with the relevant information

# Start the server with a process manager
```

## API Reference

**GET /api/transactions/receipt/:receipt**

Get a transaction by receipt

**GET /api/transactions/phone/:phone**

Get all transactions linked to a specific phone number

**GET /api/transactions/validate/:receipt**

Validate the "used" field. Useful in cases such as online shops and digital goods


## Issues And Contribution

Fork the repository and submit a pull request for whatever change you want to be added to this project. If you have any questions, just open an issue.

## License

Released under AGPL-3.0