import chai from 'chai';
import supertest from 'supertest';
import app from '../index';

const { expect } = chai;
const server = supertest(app);

describe('User', () => {
  describe('user sign up', () => {
    it('should create a new user', async () => {
      const response = await server.post('/api/v1/auth/signup')
        .send({
          email: 'hello@postgresql.com',
          firstName: 'Bukky',
          lastName: 'Abayomi',
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
          id: 6,
          email: 'hello@andelacom',
          firstName: 'Bukky1',
          lastName: 'Abay omi',
          password: 'hello1234',
          type: 'baller',
        });
      expect(response.status).to.equal(400);
      const errorMessages = response.body.errors;
      for (let i; i < errorMessages.length; i += 1) {
        expect(errorMessages[i]).to.equal('input a valid email address');
        expect(errorMessages[i]).to.equal('firstName can only contain letters');
        expect(errorMessages[i]).to.equal('lastName can only contain letters');
        expect(errorMessages[i]).to.equal('you can either be a client or staff');
      }
    });
  });
});
