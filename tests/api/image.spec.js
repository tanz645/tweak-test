let request = require('supertest');

const app = require('../../app');
const { loginController } = require('../../api/controllers/userController');


let db = {};
let token = '';

beforeAll(async () => {
  db = await require('../../lib/clients/mongo')();
  request = request(app);
  token = await loginController({ userName: 'tanzqwe', password: 'test1234' });
  token = token.msg;
  return db;
});

afterAll(async () => await db.connection.close());

describe('Image Endpoints', () => {
  describe('Upload image: given correct request body', () => {
    it('should upload a new image to s3 bucket', async (done) => {
      const res = await request.post('/image/upload')
        .set({ Authorization: token })
        .attach('image', './tests/__mocks__/test.png')
        .expect(200);
      done();
    });
  });

  describe('Upload image: given malformed data', () => {
    it('No token provided: should be unauthorized', async (done) => {
      const _t = '';
      const res = await request.post('/image/upload')
        .set({ Authorization: _t })
        .attach('image', './tests/__mocks__/test.png')
        .expect(401);
      done();
    });

    it('Image too large: should be return 400', async (done) => {
      const res = await request.post('/image/upload')
        .set({ Authorization: token })
        .attach('image', './tests/__mocks__/test_big.jpg')
        .expect(400);
      done();
    });

    it('Image incorrect format: should be return 400', async (done) => {
      const res = await request.post('/image/upload')
        .set({ Authorization: token })
        .attach('image', './tests/__mocks__/test.html')
        .expect(400);
      done();
    });
  });

  describe('Get image: given correct request param', () => {
    it('should get image details from S3 bucket', async (done) => {
      const res = await request.get('/image?fileName=test.png')
        .set({ Authorization: token })
        .expect(200);
      done();
    });
  });

  describe('Get image: given malformed token', () => {
    it('No token provided: should be unauthorized', async (done) => {
      const _t = ''
      const res = await request.get('/image?fileName=test.png')
        .set({ Authorization: _t })
        .expect(401);
      done();
    });
  });
});
