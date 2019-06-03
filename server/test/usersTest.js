import chai from 'chai';
import supertest from 'supertest';
import db from '../models/db';
import app from '../index';

const { expect } = chai;
const server = supertest(app);

const createUsers = `CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  firstname VARCHAR NOT NULL,
  lastname VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  password VARCHAR NOT NULL,
  type VARCHAR NOT NULL,
  isAdmin BOOLEAN DEFAULT false
);`;

const dropUsers = 'DROP TABLE IF EXISTS users;';

describe('User', () => {
  before('drop users table and re-create it', async () => {
    await db.query(dropUsers);
    await db.query(createUsers);
  });

  describe('user sign up', () => {
    it('should create a new user', async () => {
      const response = await server.post('/api/v1/auth/signup')
        .send({
          email: 'hello@postgresql.com',
          firstName: 'Bukky',
          lastName: 'Abayomi',
          password: 'hello1234',
          type: 'staff',
        });
      expect(response.status).to.equal(201);
    });
  });

  describe('user sign up', () => {
    it('should return error indicating duplicate email', async () => {
      const response = await server.post('/api/v1/auth/signup')
        .send({
          email: 'hello@postgresql.com',
          firstName: 'Bukky',
          lastName: 'Abayomi',
          password: 'hello1234',
          type: 'staff',
        });
      expect(response.status).to.equal(400);
      expect(response.body.error).to.equal('User with that email already exists');
    });
  });

  describe('user sign up', () => {
    it('should create another user', async () => {
      const response = await server.post('/api/v1/auth/signup')
        .send({
          email: 'HELLO_1@POSTGRESQL.COM',
          firstName: 'test',
          lastName: 'testAgain',
          password: 'hello1234',
          type: 'client',
        });
      expect(response.status).to.equal(201);
    });
  });

  describe('user sign up', () => {
    it('should give the corresponding error messages', async () => {
      const response = await server.post('/api/v1/auth/signup')
        .send({
          email: '',
          firstName: '',
          lastName: '',
          password: '',
          type: '',
        });
      expect(response.status).to.equal(400);
      const errorMessages = response.body.errors;
      for (let i = 0; i < errorMessages.length; i += 1) {
        expect(errorMessages[0]).to.equal('First name cannot be empty');
        expect(errorMessages[1]).to.equal('First name can only contain letters');
        expect(errorMessages[2]).to.equal('Last name cannot be empty');
        expect(errorMessages[3]).to.equal('Last name can only contain letters');
        expect(errorMessages[4]).to.equal('Email cannot be empty');
        expect(errorMessages[5]).to.equal('Input a valid email address');
        expect(errorMessages[6]).to.equal('Type is missing. Are you a client or staff?');
        expect(errorMessages[7]).to.equal('Password cannot be empty');
        expect(errorMessages[8]).to.equal('Password cannot be less than 4 characters');
      }
    });
  });

  describe('user sign up', () => {
    it('should give the corresponding error messages', async () => {
      const response = await server.post('/api/v1/auth/signup')
        .send({
          email: 'hello@andelacom',
          firstName: 'Bukky1',
          lastName: 'Abay omi',
          password: 'hello1234',
          type: 'baller',
        });
      expect(response.status).to.equal(400);
      const errorMessages = response.body.errors;
      for (let i = 0; i < errorMessages.length; i += 1) {
        expect(errorMessages[0]).to.equal('First name can only contain letters');
        expect(errorMessages[1]).to.equal('Last name can only contain letters');
        expect(errorMessages[2]).to.equal('Input a valid email address');
      }
    });
  });

  describe('user sign up', () => {
    it('should give the right error messages', async () => {
      const response = await server.post('/api/v1/auth/signup')
        .send({
          id: 6,
          email: 'hi@hello.com',
          firstName: 'Bukky',
          lastName: 'Abayomi',
          password: 'hello1234',
          type: 'baller',
        });
      expect(response.status).to.equal(400);
      expect(response.body.error).to.equal('You can either be a client or staff');
    });
  });

  describe('user sign in', () => {
    it('should successfully sign in a user', async () => {
      const response = await server.post('/api/v1/auth/signin')
        .send({
          email: 'hello@postgresql.com',
          password: 'hello1234',
        });
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('data');
      expect(response.body).to.be.an('object');
      expect(response.body.data).to.be.an('array');
    });
  });

  describe('user sign in', () => {
    it('should successfully sign in a user', async () => {
      const response = await server.post('/api/v1/auth/signin')
        .send({
          email: 'HELLO_1@POSTGRESQL.COM',
          password: 'hello1234',
        });
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('data');
      expect(response.body).to.be.an('object');
      expect(response.body.data).to.be.an('array');
    });
  });

  describe('user sign in', () => {
    it('should give the right error message', async () => {
      const response = await server.post('/api/v1/auth/signin')
        .send({
          email: '',
          password: '',
        });
      expect(response.status).to.equal(400);
      const errorMessages = response.body.errors;
      for (let i = 0; i < errorMessages.length; i += 1) {
        expect(errorMessages[0]).to.equal('Input a valid email address');
        expect(errorMessages[1]).to.equal('Email cannot be empty');
        expect(errorMessages[2]).to.equal('Password cannot be empty');
      }
    });
  });

  describe('user sign in', () => {
    it('should give the right error message', async () => {
      const response = await server.post('/api/v1/auth/signin')
        .send({
          email: 'sheggy1@andela.com',
          password: 'lsfbeyiw',
        });
      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal('User with that email does not exist');
    });
  });

  describe('user sign in', () => {
    it('should give the right error message', async () => {
      const response = await server.post('/api/v1/auth/signin')
        .send({
          email: 'hello@postgresql.com',
          password: 'ballerz',
        });
      expect(response.status).to.equal(401);
      expect(response.body.error).to.equal('Incorrect password');
    });
  });

  describe('non-existent routes', () => {
    it('should give the right error message', async () => {
      const response = await server.get('/api/v1/hello/hi');
      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal('that route does not exist');
    });
  });

  describe('non-existent routes', () => {
    it('should give the right error message', async () => {
      const response = await server.post('/api/v1/hello/hi');
      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal('that route does not exist');
    });
  });

  describe('non-existent routes', () => {
    it('should give the right error message', async () => {
      const response = await server.patch('/api/v1/hello/hi');
      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal('that route does not exist');
    });
  });

  describe('non-existent routes', () => {
    it('should give the right error message', async () => {
      const response = await server.delete('/api/v1/hello/hi');
      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal('that route does not exist');
    });
  });
});
