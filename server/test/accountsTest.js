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

const signup = {
  firstName: 'test',
  lastName: 'testAgain',
  email: 'test@test.com',
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
    await server.post('/api/v1/auth/signup')
      .send(signup);
  });

  describe('create new account', () => {
    it('should create a new account', async () => {
      const loginResponse = await server.post('/api/v1/auth/signin')
        .send(login);
      const { token } = loginResponse.body.data[0];
      const response = await server.post('/api/v1/accounts')
        .send({
          type: 'current',
        })
        .set('x-access-token', token);
      expect(response.status).to.equal(201);
    });
  });

  describe('create new account', () => {
    it('should give the right error messages', async () => {
      const loginResponse = await server.post('/api/v1/auth/signin')
        .send(login);
      const { token } = loginResponse.body.data[0];
      const response = await server.post('/api/v1/accounts')
        .send({
          type: 'javascript',
        })
        .set('x-access-token', token);
      expect(response.status).to.equal(400);
      expect(response.body.error).to.equal('type can only be savings or current');
    });
  });

  describe('get all acounts of a user', () => {
    it('should return all accounts that belong to a user', async () => {
      const loginResponse = await server.post('/api/v1/auth/signin')
        .send(login);
      const { token } = loginResponse.body.data[0];
      const response = await server.get('/api/v1/user/test@test.com/accounts')
        .set('x-access-token', token);
      expect(response.status).to.equal(200);
      expect(response.body.data).to.be.an('array');
    });
  });

  describe('get all acounts of a user', () => {
    it('should return the right error message', async () => {
      const loginResponse = await server.post('/api/v1/auth/signin')
        .send(login);
      const { token } = loginResponse.body.data[0];
      const response = await server.get('/api/v1/user/test@tests.com/accounts')
        .set('x-access-token', token);
      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal('user not found');
    });
  });

  describe('display account details', () => {
    it('should return specific account details', async () => {
      const loginResponse = await server.post('/api/v1/auth/signin')
        .send(login);
      const { token } = loginResponse.body.data[0];
      const { rows } = await db.query('SELECT * FROM accounts WHERE id = $1;', [1]);
      const response = await server
        .get(`/api/v1/accounts/${rows[0].accountnumber}`)
        .set('x-access-token', token);
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object');
    });
  });

  describe('display account details', () => {
    it('should give the right error message', async () => {
      const loginResponse = await server.post('/api/v1/auth/signin')
        .send(login);
      const { token } = loginResponse.body.data[0];
      const response = await server
        .get('/api/v1/accounts/1234')
        .set('x-access-token', token);
      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal('account not found');
      expect(response.body).to.be.an('object');
    });
  });

  describe('update account status', () => {
    it('should update account status', async () => {
      const loginResponse = await server.post('/api/v1/auth/signin')
        .send(login);
      const { token } = loginResponse.body.data[0];
      const { rows } = await db.query('SELECT * FROM accounts WHERE id = $1;', [1]);
      const response = await server.patch(`/api/v1/accounts/${rows[0].accountnumber}`)
        .send({
          status: 'active',
        })
        .set('x-access-token', token);
      expect(response.status).to.equal(200);
      expect(response.body.data[0].status).to.equal('active');
    });
  });

  describe('update account status', () => {
    it('should give the right error message', async () => {
      const loginResponse = await server.post('/api/v1/auth/signin')
        .send(login);
      const { token } = loginResponse.body.data[0];
      const { rows } = await db.query('SELECT * FROM accounts WHERE id = $1;', [1]);
      const response = await server.patch(`/api/v1/accounts/${rows[0].accountnumber}`)
        .send({
          status: 'javascript',
        })
        .set('x-access-token', token);
      expect(response.status).to.equal(400);
      expect(response.body.error).to.equal('status can only be active or dormant');
    });
  });

  describe('all accounts', () => {
    it('should give display all accounts', async () => {
      const loginResponse = await server.post('/api/v1/auth/signin')
        .send(login);
      const { token } = loginResponse.body.data[0];
      const response = await server
        .get('/api/v1/accounts')
        .set('x-access-token', token);
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object');
      expect(response.body.data).to.be.an('array');
    });
  });

  describe('delete bank account', () => {
    it('should delete account', async () => {
      const loginResponse = await server.post('/api/v1/auth/signin')
        .send(login);
      const { token } = loginResponse.body.data[0];
      const { rows } = await db.query('SELECT * FROM accounts WHERE id = $1;', [1]);
      const response = await server
        .delete(`/api/v1/accounts/${rows[0].accountnumber}`)
        .set('x-access-token', token);
      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal('account successfully deleted');
    });
  });

  describe('delete bank account', () => {
    it('should give the right error message', async () => {
      const loginResponse = await server.post('/api/v1/auth/signin')
        .send(login);
      const { token } = loginResponse.body.data[0];
      const response = await server
        .delete('/api/v1/accounts/0001112223')
        .set('x-access-token', token);
      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal('cannot find that account');
    });
  });

  describe('get all users', () => {
    it('return all users', async () => {
      const loginResponse = await server.post('/api/v1/auth/signin')
        .send(login);
      const { token } = loginResponse.body.data[0];
      const response = await server
        .get('/api/v1/users')
        .set('x-access-token', token);
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object');
    });
  });
});
