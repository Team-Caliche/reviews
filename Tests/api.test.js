const server = require('../Server/index.js');
const request = require('supertest');
const express = require('express');
const app = express();



test('Should get reviews from GET Routes', async (done) => {
  const id = 12
    const response = await request(app).get(`/api/reviews/${id}`);
    expect(response.status).toBe(200);
    server.close();
    done();
});

test('Should get metadata from GET Routes', async (done) => {
  const id = 12
  const response = await request(app).get(`/api/reviews/metadata/${id}`);
  expect(response.status).toBe(202);
  server.close();
  done();
});


test('Should update Helpful', async (done) => {
  const id = 12
  const response = await request(app).get(`/api/reviews/${id}/helpful`);
  expect(response.status).toBe(202);
  server.close();
  done();
});

test('Should update Reported', async (done) => {
  const id = 12
  const response = await request(app).get(`/api/reviews/${id}/report`);
  expect(response.status).toBe(203);
  server.close();
  done();
});



