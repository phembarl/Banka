import chai from 'chai';
import supertest from 'supertest';
import db from '../models/db';
import app from '../index';

const { expect } = chai;
const server = supertest(app);

const createAccounts = `CREATE TABLE IF NOT EXISTS accounts(
    id SERIAL PRIMARY KEY,
    accountNumber INT NOT NULL,
    createdOn TIMESTAMP DEFAULT NOW(),
    owner INT NOT NULL,
    type VARCHAR NOT NULL,
    status VARCHAR NOT NULL DEFAULT 'draft',
    balance FLOAT NOT NULL
);`;

const dropAccounts = 'DROP TABLE IF EXISTS accounts;';

const createTransactions = `CREATE TABLE IF NOT EXISTS transactions(
    id SERIAL PRIMARY KEY,
    createdOn TIMESTAMP DEFAULT NOW(),
    type VARCHAR NOT NULL,
    amount FLOAT NOT NULL,
    accountNumber INT NOT NULL,
    cashier INT NOT NULL,
    oldBalance FLOAT NOT NULL,
    newBalance FLOAT NOT NULL
);`;

const dropTransactions = 'DROP TABLE IF EXISTS transactions;';

const signup = {
  firstName: 'test',
  lastName: 'testAgain',
  email: 'transact@test.com',
  password: 'awesometest',
  type: 'staff',
};

const login = {
  email: 'test@test.com',
  password: 'awesometest',
};


describe('Accounts', () => {
  before('hooks', async () => {
    await db.query(dropAccounts);
    await db.query(createAccounts);
    await db.query(dropTransactions);
    await db.query(createTransactions);
    await server.post('/api/v1/auth/signup')
      .send(signup);
  });

  describe('credit account', () => {
    it('should create a successful transaction record', async () => {
      const loginResponse = await server.post('/api/v1/auth/signin')
        .send(login);
      const { token } = loginResponse.body.data[0];

      await server.post('/api/v1/accounts')
        .send({
          userId: '1',
          type: 'current',
        })
        .set('x-access-token', token);

      const { rows } = await db.query('SELECT * FROM accounts WHERE id = $1;', [1]);
      const oldAmount = rows[0].balance;
      const response = await server.post(`/api/v1/transactions/${rows[0].accountnumber}/credit`)
        .send({
          cashier: 1,
          amount: 1000,
        })
        .set('x-access-token', token);
      expect(response.status).to.equal(200);
      expect(response.body.data[0].transactionId).to.equal(rows.length);
      expect(Number(response.body.data[0].accountBalance))
        .to.equal(oldAmount + Number(response.body.data[0].amount));
    });
  });

  describe('credit account', () => {
    it('should give the right error message', async () => {
      const loginResponse = await server.post('/api/v1/auth/signin')
        .send(login);
      const { token } = loginResponse.body.data[0];
      const { rows } = await db.query('SELECT * FROM accounts WHERE id = $1;', [1]);
      const response = await server.post(`/api/v1/transactions/${rows[0].accountnumber}/credit`)
        .send({
          cashier: 'hello',
          amount: 'two million',
        })
        .set('x-access-token', token);
      expect(response.status).to.equal(400);
      const errorMessages = response.body.errors;
      for (let i; i < errorMessages.length; i += 1) {
        expect(errorMessages[i]).to.equal('input cashier id');
        expect(errorMessages[i]).to.equal('input amount');
        expect(errorMessages[i]).to.equal('cashier id should contain only numbers');
        expect(errorMessages[i]).to.equal('amount can only be in figures');
      }
    });
  });

  describe('debit account', () => {
    it('should create a successful transaction record', async () => {
      const loginResponse = await server.post('/api/v1/auth/signin')
        .send(login);
      const { token } = loginResponse.body.data[0];

      await server.post('/api/v1/accounts')
        .send({
          userId: '1',
          type: 'current',
        })
        .set('x-access-token', token);

      const { rows } = await db.query('SELECT * FROM accounts WHERE id = $1;', [1]);
      const oldAmount = rows[0].balance;
      const response = await server.post(`/api/v1/transactions/${rows[0].accountnumber}/debit`)
        .send({
          cashier: 1,
          amount: 1000,
        })
        .set('x-access-token', token);
      expect(response.status).to.equal(200);
      expect(response.body.data[0].transactionId).to.equal(rows.length + 1);
      expect(Number(response.body.data[0].accountBalance))
        .to.equal(oldAmount - Number(response.body.data[0].amount));
    });
  });

  describe('debit acount', () => {
    it('should give the right error message', async () => {
      const loginResponse = await server.post('/api/v1/auth/signin')
        .send(login);
      const { token } = loginResponse.body.data[0];
      const { rows } = await db.query('SELECT * FROM accounts WHERE id = $1;', [1]);
      const response = await server.post(`/api/v1/transactions/${rows[0].accountnumber}/credit`)
        .send({
          cashier: 'hello',
          amount: 'two million',
        })
        .set('x-access-token', token);
      expect(response.status).to.equal(400);
      const errorMessages = response.body.errors;
      for (let i; i < errorMessages.length; i += 1) {
        expect(errorMessages[i]).to.equal('input cashier id');
        expect(errorMessages[i]).to.equal('input amount');
        expect(errorMessages[i]).to.equal('cashier id should only comprise of numbers');
        expect(errorMessages[i]).to.equal('amount can only be in figures');
      }
    });
  });
});
