const request = require('supertest');
const app = require('./app');

describe('Integration Tests', () => {
  // Test untuk endpoint GET /
  describe('GET /', () => {
    it('responds with Hello, World!', async () => {
      const res = await request(app).get('/');
      expect(res.statusCode).toBe(200);
      expect(res.text).toBe('Hello, World!');
    });
  });

  // Test untuk endpoint POST /data
  describe('POST /data', () => {
    it('responds with created data', async () => {
      const sampleData = { name: 'Test User', age: 25 };
      const res = await request(app).post('/data').send(sampleData);
      expect(res.statusCode).toBe(201); // Created status code
      expect(res.body).toEqual(expect.objectContaining(sampleData)); // Matching response body
    });

    it('responds with 400 if data is missing', async () => {
      const res = await request(app).post('/data').send({});
      expect(res.statusCode).toBe(400); // Bad Request status code
      expect(res.body.error).toBe('Invalid data'); // Error message
    });
  });

  // Test untuk endpoint PUT /data/:id
  describe('PUT /data/:id', () => {
    it('updates the specified resource', async () => {
      const updatedData = { name: 'Updated User', age: 30 };
      const res = await request(app).put('/data/1').send(updatedData);
      expect(res.statusCode).toBe(200); // OK status code
      expect(res.body).toEqual(expect.objectContaining(updatedData)); // Updated response
    });

    it('responds with 404 if resource does not exist', async () => {
      const updatedData = { name: 'Updated User', age: 30 };
      const res = await request(app).put('/data/999').send(updatedData); // Non-existent ID
      expect(res.statusCode).toBe(404); // Not Found
      expect(res.body.error).toBe('Resource not found'); // Error message
    });
  });

  // Test untuk endpoint DELETE /data/:id
  describe('DELETE /data/:id', () => {
    it('deletes the specified resource', async () => {
      const res = await request(app).delete('/data/1');
      expect(res.statusCode).toBe(204); // No Content status code
    });

    it('responds with 404 if resource does not exist', async () => {
      const res = await request(app).delete('/data/999'); // Non-existent ID
      expect(res.statusCode).toBe(404); // Not Found
      expect(res.body.error).toBe('Resource not found'); // Error message
    });
  });
});
