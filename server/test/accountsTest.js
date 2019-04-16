import chai from 'chai';
import supertest from 'supertest';
import accountsList from '../models/accounts';
import app from '../index';

const { accounts } = accountsList;

const { expect } = chai;
const server = supertest(app);


describe('Accounts', () => {
  describe('create new account', () => {
    it('should create a new account', async () => {
      const accountCount = accounts.length;
      const response = await server.post('/api/v1/accounts')
        .send({
          userId: '1',
          type: 'current',
        });
      expect(response.status).to.equal(201);
      expect(response.body.id).to.equal(accounts[accounts.length]);
      expect(accounts.length).to.equal(accountCount + 1);
    });
  });

  describe('create new account', () => {
    it('should give the right error messages', async () => {
      const response = await server.post('/api/v1/accounts')
        .send({
          userId: '1',
          type: 'javascript',
        });
      expect(response.status).to.equal(400);
      expect(response.body.error).to.equal('type can only be savings or current');
    });
  });

  describe('update account status', () => {
    it('should update account status', async () => {
      const response = await server.patch('/api/v1/accounts/5467827301')
        .send({
          status: 'active',
        });
      expect(response.status).to.equal(200);
      expect(response.body.data.status).to.equal('active');
    });
  });

  describe('update account status', () => {
    it('should give the right error message', async () => {
      const account = accounts[0];
      const response = await server.patch(`/api/v1/accounts/${account.accountNumber}`)
        .send({
          status: 'javascript',
        });
      expect(response.status).to.equal(400);
      expect(response.body.error).to.equal('status can only be active or dormant');
    });
  });

  describe('delete bank account', () => {
    it('should delete account', async () => {
      const account = accounts[0];
      const response = await server.delete(`/api/v1/accounts/${account.accountNumber}`);
      expect(response.status).to.equal(200);
      expect(accounts.indexOf(account)).to.equal(-1);
      expect(response.body.message).to.equal('account successfully deleted');
    });
  });

  describe('delete bank account', () => {
    it('should give the right error message', async () => {
      const response = await server.delete('/api/v1/accounts/0001112223');
      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal('account not found');
    });
  });
});
