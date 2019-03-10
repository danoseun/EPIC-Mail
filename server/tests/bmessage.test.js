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
          expect(res.body.error).to.equal('Subject is required');
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
          expect(res.body.error).to.equal('Subject should be 50 or less characters');
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
          expect(res.body.error).to.equal('Message is required');
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
  });
});
