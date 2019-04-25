# Banka
Andela Cycle 43 Developer Challenge

[![Build Status](https://travis-ci.org/phembarl/Banka.svg?branch=develop)](https://travis-ci.org/phembarl/Banka) [![Coverage Status](https://coveralls.io/repos/github/phembarl/Banka/badge.svg?branch=develop)](https://coveralls.io/github/phembarl/Banka?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/e92d8aa3c94fbfe41bbe/maintainability)](https://codeclimate.com/github/phembarl/Banka/maintainability)

Banka is a light-weight core banking application that powers banking operations like account
creation, customer deposit and withdrawals. This app is meant to support a single bank, where
users can signup and create bank accounts online.

## Installing / Getting started

You need to have the following tools installed on your computer before you install and run this project:
- Git
- Node.js

To run:

```shell
git clone https://github.com/phembarl/Banka.git
cd Banka
npm install
npm start
```

The code above gets your server running

### Initial Configuration

Create a `.env` file with key `SECRET` set to a string value like so:
    `SECRET=YOUR_SECRET`

## Features

* User can sign up
* User can sign in
* User can create a bank account
* User can view account history
* User can view a specific account transaction
* User can view a account details
* Admin/Staff can activate or deactivate an account
* Admin/Staff can delete an account
* Staff (cashier) can credit an account
* Staff (cashier) can debit an account
* Admin/Staff can view all users
* Admin/staff can view a list of accounts owned by a specific user
* Admin/Staff can view all bank accounts
* Admin/Staff can view all active bank accounts
* Admin/Staff can view all dormant bank accounts
* Admin/Staff can view all transactions

## API Endpoints
- `POST /api/v1/auth/signup` Create user account
- `POST /api/v1/auth/signin` Login a user
- `POST /api/v1/accounts` Create a bank account
- `GET /accounts/<account-number>/transactions` View account history
- `GET /transactions/<transaction-id>` View specific transaction
- `GET /accounts/<account-number>` View a specific account's details
- `GET /user/<user-email-address>/accounts` View all accounts owned by a specific client
- `GET /accounts` View a list of all bank accounts
- `PATCH /api/v1/account/<account-number>` Activate or deactivate an account
- `DELETE /api/v1/accounts/<account-number>` Delete a specific bank account
- `POST /api/v1/transactions/<account-number>/debit` Debit a bank account
- `POST /transactions/<account-number>/credit` Credit a bank account
- `GET /api/v1/users` Display all users
- `GET /accounts?status=active` View a list of all active bank accounts
- `GET /accounts?status=dormant` View a list of all active dormant accounts
- `GET /api/v1/transactions` Display all transactions



## Contributing

Any contribution is welcome, please fork the repository and use a feature
branch. Please follow the guide of the Pull Request Template provided.

## Links

- Repository: https://github.com/phembarl/Banka/
- Hosted UI: https://phembarl.github.io/Banka/UI/
- Hosted Heroku App: https://banka-andela-43.herokuapp.com/
- Pivotal Tracker: https://www.pivotaltracker.com/n/projects/2320913/

## Author

This ADC project belongs to Oluwafemi Balogun
