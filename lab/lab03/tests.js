
const request = require('supertest');
const app = require('../articles.js'); 

describe('Test for articles routes', () => {
  it('Returns list of articles', (done) => {
    request(app)
      .get('/articles')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('Adds a new article', (done) => {
    request(app)
      .post('/articles')
      .send({ title: 'New Article 01', content: 'Content of the article ' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
