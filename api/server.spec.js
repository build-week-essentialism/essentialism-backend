const request = require('supertest');

const server = require('./server');
const db = require('../utilities/dbConfig');

describe('GET /', () => {
  it('status code should be 200 OK', async () => {
    const res = await request(server).get('/');
    expect(res.status).toBe(200);
  });
});
