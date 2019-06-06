import db from '../models/db';

const users = `CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR NOT NULL,
    lastname VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    avatar VARCHAR NOT NULL DEFAULT 'https://ui-avatars.com/api/?name=John+Doe&size=200&background=99e6e6&color=000',
    password VARCHAR NOT NULL,
    type VARCHAR NOT NULL,
    isAdmin BOOLEAN DEFAULT false
);`;

const accounts = `CREATE TABLE IF NOT EXISTS accounts(
    id SERIAL PRIMARY KEY,
    accountNumber INT NOT NULL,
    createdOn TIMESTAMP DEFAULT NOW(),
    owner INT UNIQUE NOT NULL,
    type VARCHAR NOT NULL,
    status VARCHAR NOT NULL DEFAULT 'draft',
    balance NUMERIC(15, 2) NOT NULL
);`;

const transactions = `CREATE TABLE IF NOT EXISTS transactions(
    id SERIAL PRIMARY KEY,
    createdOn TIMESTAMP DEFAULT NOW(),
    type VARCHAR NOT NULL,
    amount NUMERIC(15, 2) NOT NULL,
    transactioncurrency VARCHAR NOT NULL DEFAULT 'NGN',
    accountNumber INT NOT NULL,
    cashier INT NOT NULL,
    oldBalance NUMERIC(15, 2) NOT NULL,
    newBalance NUMERIC(15, 2) NOT NULL
);`;

db.query(users, (error) => {
  if (error) {
    return console.error('error creating users table');
  }
  console.log('users table created successfully');
});

db.query(accounts, (error) => {
  if (error) {
    return console.error('error creating accounts table');
  }
  console.log('accounts table created successfully');
});

db.query(transactions, (error) => {
  if (error) {
    return console.error('error creating transactions table');
  }
  console.log('transactions table created successfully');
});

db.end();
