let request = require('supertest');
const randomstring = require('randomstring');
const app = require('../../app');


let db = {};

const userName = randomstring.generate(7);
const password = randomstring.generate(8);

beforeAll(async () => {
  db = await require('../../lib/clients/mongo')();
  request = request(app);
  return db;
});

afterAll(() => db.connection.close());

describe('User Endpoints', () => {
  describe('Register user: given correct request body', () => {
    it('should register a new user with return status 200', async (done) => {
      const res = await request.post('/user/register')
        .send({
          userName,
          password,
          repeatPassword: password,
        });
      expect(res.status).toBe(200);
      done();
    });
  });

  describe('Register user: given malformed request body', () => {

    it('Username already exists: Should be client error 400', async (done) => {
      const res = await request.post('/user/register')
        .send({
          userName,
          password,
          repeatPassword: password,
        });
      expect(res.status).toBe(400);
      done();
    });
    it('Username missing: Should be client error 400', async (done) => {
      const res = await request.post('/user/register')
        .send({
          userName: '',
          password,
          repeatPassword: password,
        });
      expect(res.status).toBe(400);
      done();
    });
    it('Password missing: Should be client error 400', async (done) => {
      const res = await request.post('/user/register')
        .send({
          userName,
          password: '',
          repeatPassword: password,
        });
      expect(res.status).toBe(400);
      done();
    });
    it('Password does not match with repeat password: Should be client error 400', async (done) => {
      const res = await request.post('/user/register')
        .send({
          userName,
          password,
          repeatPassword: `${password}x`,
        });
      expect(res.status).toBe(400);
      done();
    });
  });

  describe('Login user: given correct request body', () => {
    it('should get a bearer token with successful login', async (done) => {
      const res = await request.post('/user/login')
        .send({
          userName,
          password,
        });
      expect(res.text).toContain('Bearer ');
      expect(res.status).toBe(200);
      done();
    });
  });
  describe('Login user: given malformed request body', () => {
    it('Password missing: Should be client error 400', async (done) => {
      const res = await request.post('/user/login')
        .send({
          userName,
          password: '',
        });
      expect(res.status).toBe(400);
      done();
    });
    it('Username missing: Should be client error 400', async (done) => {
      const res = await request.post('/user/login')
        .send({
          userName: '',
          password,
        });
      expect(res.status).toBe(400);
      done();
    });
    it('Password incorrect: Should be client error 400', async (done) => {
      const res = await request.post('/user/login')
        .send({
          userName,
          password: `${password}x`,
        });
      expect(res.status).toBe(400);
      done();
    });
    it('Username incorrect: Should be client error 400', async (done) => {
      const res = await request.post('/user/login')
        .send({
          userName: `${userName}x`,
          password,
        });
      expect(res.status).toBe(400);
      done();
    });
  });
});
