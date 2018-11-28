import supertest from 'supertest'
import app from '../../src/server'
const request = supertest.agent(app)

describe('GET /tools?tag=node', function () {
  it('respond with json containing a list of all tools filter by tags', function (done) {
    request
      .get('/tools?tag=node')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
})

describe('POST /tools', function () {
  const tool = {
    _id: '5be2379aa09da1f159170c85',
    title: 'fastify',
    link: 'https://www.fastify.io/',
    description:
      'Extremely fast and simple, low-overhead web framework for NodeJS. Supports HTTP2.',
    tags: ['web', 'framework', 'node', 'http2', 'https', 'localhost']
  }
  it('respond with json containing a create new tool', function (done) {
    request
      .post('/tools')
      .send(tool)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
})

describe('PUT /tools/5be2379aa09da1f159170c85', function () {
  const tool = {
    title: 'fastify 1'
  }
  it('respond with json containing a update new tool', function (done) {
    request
      .put('/tools/5be2379aa09da1f159170c85')
      .send(tool)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
})

describe('GET /tools', function () {
  it('respond with json containing a list of all tools', function (done) {
    request
      .get('/tools')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
})

describe('GET /tools/5be2379aa09da1f159170c85', function () {
  it('respond with json containing a list of one tool', function (done) {
    request
      .get('/tools')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
})

describe('DELETE /tools', function () {
  it('respond with json a destroy tool', function (done) {
    request
      .delete('/tools/5be2379aa09da1f159170c85')
      .set('Accept', 'application/json')
      .expect(200, done)
  })
})
