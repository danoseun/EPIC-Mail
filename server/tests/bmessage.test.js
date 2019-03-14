import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

import { validMessage, invalidMessages } from './mockData/message';
import { sentMessages, receivedMessages } from '../dummyDb';

const { should, expect } = chai;
should();

chai.use(chaiHttp);

const url = '/api/v1/messages';

describe('Test for Message routes', () => {
  describe('Test for create message API', () => {
    it('Should return 201 status code and post email', (done) => {
      const newMessage = sentMessages.length + 1;
      chai.request(app)
        .post(url)
        .send(validMessage[0])
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.an('object');
          expect(res.body.status).to.equal(201);
          expect(res.body.data).to.be.a('object');
          expect(sentMessages).to.have.length(newMessage);
          done();
        });
    });
    it('Should return 400 status code and error message for undefined/empty subject', (done) => {
      chai.request(app)
        .post(url)
        .send(invalidMessages[0])
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.be.an('object');
          done();
        });
    });
    it('Should return 400 status code and error message for lengthy subject title', (done) => {
      chai.request(app)
        .post(url)
        .send(invalidMessages[1])
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.be.an('object');
          done();
        });
    });
    it('Should return 400 status code and error message for undefined/empty message', (done) => {
      chai.request(app)
        .post(url)
        .send(invalidMessages[2])
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.be.an('object');
          done();
        });
    });
  });

  describe('Test for GET endpoints API', () => {
    it('Should return 200 status code and fetch all RECEIVED MAILS in the db', (done) => {
      const messages = receivedMessages.length;
      chai.request(app)
        .get(url)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          expect(res.body.status).to.equal(200);
          expect(res.body.data).to.be.a('array');
          expect(receivedMessages).to.have.length(messages);
          done();
        });
    });
    it('Should return 200 status code and fetch all received UNREAD MAILS in the db', (done) => {
      const messages = receivedMessages.length;
      chai.request(app)
        .get('/api/v1/messages/unread')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          expect(res.body.status).to.equal(200);
          expect(res.body.data).to.be.a('array');
          expect(receivedMessages).to.have.length(messages);
          done();
        });
    });
    it('Should return 200 status code and fetch all SENT MAILS in the db', (done) => {
      const messages = sentMessages.length;
      chai.request(app)
        .get('/api/v1/messages/sent')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          expect(res.body.status).to.equal(200);
          expect(res.body.data).to.be.a('array');
          expect(sentMessages).to.have.length(messages);
          done();
        });
    });
    it('Should return 200 status code and fetch a single MAIL in the db', (done) => {
      chai.request(app)
        .get('/api/v1/messages/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          expect(res.body.status).to.equal(200);
          expect(res.body.data).to.be.a('object');
          done();
        });
    });
    it('Should return 404 status code and error message', (done) => {
      chai.request(app)
        .get('/api/v1/messages/2.5')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          expect(res.body.status).to.equal(404);
          expect(res.body.error).to.equal('Email not found');
          done();
        });
    });
    it('Should return 404 status code and error message', (done) => {
      chai.request(app)
        .get('/api/v1/messages/qwe')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          expect(res.body.status).to.equal(404);
          expect(res.body.error).to.equal('Email not found');
          done();
        });
    });
  });
  describe('Test for DELETE endpoints API', () => {
    it('Should return 200 status code and delete email by id', (done) => {
      chai.request(app)
        .delete('/api/v1/messages/2')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          expect(res.body.status).to.equal(200);
          expect(res.body.message).to.equal('Email successfully deleted');
          done();
        });
    });
  });
});
