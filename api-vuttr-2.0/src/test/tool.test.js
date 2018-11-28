const supertest = require('supertest')
const app = require('../server')
const request = supertest.agent(app)

before(() => {
  console.log('autentiticate')
})

describe('POST /tools', () => {
  const tool = {
    _id: '5be2379aa09da1f159170c85',
    title: 'teste',
    link: 'https://www.teste.io/',
    description:
      'Extremely fast and simple, low-overhead web framework for NodeJS. Supports HTTP2.',
    tags: ['web', 'framework', 'node', 'http2', 'https', 'localhost']
  }

  it('respond with json containing a create new tool', done => {
    request
      .set('Accept', 'application/json')
      .post('/tools')
      .send(tool)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })
})

describe('PUT /tools', () => {
  const tool = {
    _id: '5be2379aa09da1f159170c85',
    title: 'teste update',
    link: 'https://www.teste.io/',
    description:
      'Extremely fast and simple, low-overhead web framework for NodeJS. Supports HTTP2.',
    tags: ['web', 'framework', 'node', 'http2', 'https', 'localhost']
  }

  it('respond with json containing a create new tool', done => {
    request
      .set('Accept', 'application/json')
      .put('/tools/5be2379aa09da1f159170c85')
      .send(tool)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })
})

describe('GET /tools', () => {
  it('respond with json containing a list of all tools', done => {
    request
      .get('/tools')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })
})

describe('GET /tools?tag=organization', () => {
  it('should be respond with json containing a list of all tools filter by tags', done => {
    request
      .get('/tools')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })
})

describe('DELETE /tools', function () {
  it('respond with json a destroy tool', function (done) {
    request
      .delete('/tools/5be2379aa09da1f159170c85')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })
})

// https://codeburst.io/authenticated-testing-with-mocha-and-chai-7277c47020b7
