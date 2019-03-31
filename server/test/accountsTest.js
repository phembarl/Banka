import chai from 'chai';
import supertest from 'supertest';
import accounts from '../models/accounts';
import app from '../index';

const { expect } = chai;
const server = supertest(app);


describe('Accounts', () => {
  describe('create new account', () => {
    it('should create a new account', async () => {
      const accountCount = accounts.length;
      const response = await server.post('/api/v1/accounts')
        .send({
          firstName: 'Bola',
          lastName: 'Gold',
          email: 'bola_gold@andela.com',
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
          firstName: 'Bola',
          lastName: 'Gold',
          email: 'bola_gold@andela.com',
          type: 'javascript',
        });
      expect(response.status).to.equal(422);
      expect(response.body.error).to.equal('type can only be savings or current');
    });
  });
});
