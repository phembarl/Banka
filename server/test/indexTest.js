import chai from 'chai';
import supertest from 'supertest';
import users from '../models/users';
import app from '../index';

const { expect } = chai;
const server = supertest(app);


describe('User', () => {
  describe('create user', () => {
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

  describe('create user', () => {
    it('should give the corresponding error message', async () => {
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
});
