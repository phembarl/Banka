import chai from 'chai';
import supertest from 'supertest';
import app from '../index';
import usersList from '../models/users';

const { users } = usersList;



const { expect } = chai;
const server = supertest(app);


describe('User', () => {
  describe('user sign up', () => {
    it('should create a new user', async () => {
      const response = await server.post('/api/v1/auth/signup')
        .send({
          id: 6,
          email: 'hello@andela.com',
          firstName: 'Bukky',
          lastName: 'Abayomi',
          password: 'hello1234',
        });
      expect(response.status).to.equal(201);
    });
  });

  describe('user sign up', () => {
    it('should give the corresponding error messages', async () => {
      const response = await server.post('/api/v1/auth/signup')
        .send({
          id: 6,
          email: 'hello@andelacom',
          firstName: 'Bukky1',
          lastName: 'Abay omi',
          password: 'hello1234',
        });
      expect(response.status).to.equal(400);
      const errorMessages = response.body.errors;
      for (let i; i < errorMessages.length; i += 1) {
        expect(errorMessages[i]).to.equal('input a valid email address');
        expect(errorMessages[i]).to.equal('firstName can only contain letters');
        expect(errorMessages[i]).to.equal('lastName can only contain letters');
      }
    });
  });

  describe('user sign in', () => {
    it('should display the right user details', async () => {
      const response = await server.post('/api/v1/auth/signin')
        .send({
          email: 'sheggy@andela.com',
          password: 'lsfbeyiw',
        });
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('data');
      expect(response.body).to.be.an('object');
      expect(response.body.data).to.be.an('object');
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
      expect(response.body.error).to.equal('user with that email does not exist');
    });
  });

  describe(' user sign in', () => {
    it('should give the right error message', async () => {
      const response = await server.post('/api/v1/auth/signin')
        .send({
          email: 'sheggy@andela.com',
          password: 'ballerz',
        });
      expect(response.status).to.equal(401);
      expect(response.body.error).to.equal('incorrect password');
    });
  });
});
