import chai from 'chai';
import supertest from 'supertest';
import accounts from '../models/accounts';
import transactions from '../models/transactions';
import app from '../index';

const { expect } = chai;
const server = supertest(app);


describe('Accounts', () => {
  describe('credit acount', () => {
    it('should create a successful transaction record', async () => {
      const account = accounts[0];
      const oldAmount = account.balance;
      const response = await server.post(`/api/v1/transactions/${account.accountNumber}/credit`)
        .send({
          cashier: 101,
          amount: 1000000,
        });
      expect(response.status).to.equal(200);
      expect(response.body.data.transactionId).to.equal(transactions.length);
      expect(account.balance).to.equal(oldAmount + response.body.data.amount);
    });
  });

  describe('credit acount', () => {
    it('should give the right error message', async () => {
      const account = accounts[0];
      const response = await server.post(`/api/v1/transactions/${account.accountNumber}/credit`)
        .send({
          cashier: 'hello',
          amount: 'two million',
        });
      expect(response.status).to.equal(422);
      const errs = response.body.errors;
      for (let i; i < errs.length; i += 1) {
        expect(errs[i]).to.equal('input cashier id');
        expect(errs[i]).to.equal('input amount');
        expect(errs[i]).to.equal('cashier id should only comprise of numbers');
        expect(errs[i]).to.equal('amount can only be in figures');
      }
    });
  });

  describe('debit acount', () => {
    it('should create a successful transaction record', async () => {
      const account = accounts[0];
      const oldAmount = account.balance;
      const response = await server.post(`/api/v1/transactions/${account.accountNumber}/debit`)
        .send({
          cashier: 101,
          amount: 1000000,
        });
      expect(response.status).to.equal(200);
      expect(response.body.data.transactionId).to.equal(transactions.length);
      expect(account.balance).to.equal(oldAmount - response.body.data.amount);
    });
  });

  describe('debit acount', () => {
    it('should give the right error message', async () => {
      const account = accounts[0];
      const response = await server.post(`/api/v1/transactions/${account.accountNumber}/credit`)
        .send({
          cashier: 'hello',
          amount: 'two million',
        });
      expect(response.status).to.equal(422);
      const errs = response.body.errors;
      for (let i; i < errs.length; i += 1) {
        expect(errs[i]).to.equal('input cashier id');
        expect(errs[i]).to.equal('input amount');
        expect(errs[i]).to.equal('cashier id should only comprise of numbers');
        expect(errs[i]).to.equal('amount can only be in figures');
      }
    });
  });
});
