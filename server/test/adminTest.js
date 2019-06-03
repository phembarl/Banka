import chai from 'chai';
import supertest from 'supertest';
import db from '../models/db';
import app from '../index';

const { expect } = chai;
const server = supertest(app);

const dropUsers = 'DROP TABLE IF EXISTS users;';

const createUsers = `CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR NOT NULL,
    lastname VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    type VARCHAR NOT NULL,
    isAdmin BOOLEAN DEFAULT false
  );`;

const signup = {
  firstName: 'test',
  lastName: 'testAgain',
  email: 'transact@test.com',
  password: 'awesometest',
  type: 'staff',
};

const login = {
  email: 'transact@test.com',
  password: 'awesometest',
};

describe('Create Admin', () => {
  before('drop users table and then re-create it', async () => {
    await db.query(dropUsers);
    await db.query(createUsers);
    await server.post('/api/v1/auth/signup')
      .send(signup);
  });

  describe('create new admin', () => {
    it('should not perform operation for unauthorized user', async () => {
      const loginResponse = await server.post('/api/v1/auth/signin')
        .send(login);
      const { token } = loginResponse.body.data[0];
      const response = await server.patch('/api/v1/auth/transact@test.com/isadmin')
        .set('x-access-token', token);
      expect(response.status).to.equal(401);
      expect(response.body.error).to.equal('You do not have the authority to perform that operation');
    });
  });
});
