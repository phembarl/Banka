import chai from 'chai';
import supertest from 'supertest';
import users from '../models/users';
import app from '../index';

const { expect } = chai;
const server = supertest(app);


describe('User', () => {
  describe('user sign up', () => {
    it('should create a new user', async () => {
      const userCount = users.length;
      const response = await server.post('/api/v1/auth/signup')
        .send({
          id: 6,
          email: 'hello@andela.com',
          firstName: 'Bukky',
          lastName: 'Abayomi',
          password: 'hello1234',
        });
      expect(response.status).to.equal(201);
      expect(response.body.id).to.equal(users[users.length]);
      expect(users.length).to.equal(userCount + 1);
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
      expect(response.status).to.equal(422);
      const errs = response.body.errors;
      for (let i; i < errs.length; i += 1) {
        expect(errs[i]).to.equal('input a valid email address');
        expect(errs[i]).to.equal('firstName can ony contain letters');
        expect(errs[i]).to.equal('lastName can ony contain letters');
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
