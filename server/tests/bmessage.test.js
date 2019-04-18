import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

import { validMessage, invalidMessages } from './mockData/message';


const { should, expect } = chai;
should();

chai.use(chaiHttp);
let userToken;
const url = '/api/v1/messages';

describe('Create token for user', () => {
  it('Should return token for successful login', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'jjames@gmail.com',
        password: 'jamespass'
      })
      .end((error, res) => {
        expect(res).to.have.status(200);
        userToken = res.body.data.token;
        done();
      });
  });
});


describe('Test for Message routes', () => {
  describe('Test for create message API', () => {
    it('Should return 201 status code and post email', (done) => {
      chai.request(app)
        .post(url)
        .set('authorization', userToken)
        .send(validMessage[0])
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.an('object');
          expect(res.body.status).to.equal(201);
          expect(res.body.data).to.be.a('object');
          done();
        });
    });
    it('Should return 400 status code and error message for undefined/empty subject', (done) => {
      chai.request(app)
        .post(url)
        .set('authorization', userToken)
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
        .set('authorization', userToken)
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
        .set('authorization', userToken)
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
    it('Should return 404 status code if user has no received mails yet', (done) => {
      chai.request(app)
        .get(url)
        .set('authorization', userToken)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.an('object');
          expect(res.body.status).to.equal(404);
          expect(res.body.error).to.equal('You have no received emails at this time');
          done();
        });
    });
    it('Should return 403 status code(RECEIVED) if user does not supply token', (done) => {
      chai.request(app)
        .get(url)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.an('object');
          expect(res.body.status).to.equal(403);
          expect(res.body.error).to.equal('No token supplied');
          done();
        });
    });
    it('Should return 400 status code if user has no unread mails in the db', (done) => {
      chai.request(app)
        .get('/api/v1/messages/unread')
        .set('authorization', userToken)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.an('object');
          expect(res.body.status).to.equal(404);
          expect(res.body.error).to.equal('You do not have any unread messages in your inbox at this time');
          done();
        });
    });
    it('Should return 403 status code(UNREAD) if user does not supply token', (done) => {
      chai.request(app)
        .get('/api/v1/messages/unread')
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.an('object');
          expect(res.body.status).to.equal(403);
          expect(res.body.error).to.equal('No token supplied');
          done();
        });
    });
    it('Should return 200 status code if user has SENT MAILS in the db', (done) => {
      chai.request(app)
        .get('/api/v1/messages/sent')
        .set('authorization', userToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          expect(res.body.status).to.equal(200);
          expect(res.body.data).to.be.an('array');
          done();
        });
    });
    it('Should return 403 status code if user(SENT) does not supply token', (done) => {
      chai.request(app)
        .get('/api/v1/messages/sent')
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.an('object');
          expect(res.body.status).to.equal(403);
          expect(res.body.error).to.equal('No token supplied');
          done();
        });
    });
    it('Should return 200 status code and fetch a single MAIL in the db', (done) => {
      chai.request(app)
        .get('/api/v1/messages/sent/1')
        .set('authorization', userToken)
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
        .get('/api/v1/messages/sent/15')
        .set('authorization', userToken)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          expect(res.body.status).to.equal(404);
          expect(res.body.error).to.equal('The message you are requesting for is unavailable');
          done();
        });
    });
    it('Should return 404 status code and (receiveAllMails) error message if user has no message in the db', (done) => {
      chai.request(app)
        .get('/api/v1/messages')
        .set('authorization', userToken)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          expect(res.body.status).to.equal(404);
          expect(res.body.error).to.equal('You have no received emails at this time');
          done();
        });
    });
  });
  describe('Test for DELETE endpoints API', () => {
    it('Should return 404 status if message is non-existent in the db', (done) => {
      chai.request(app)
        .delete('/api/v1/messages/sent/2')
        .set('authorization', userToken)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.an('object');
          expect(res.body.status).to.equal(404);
          expect(res.body.error).to.equal('You cant delete a sent message that you dont have');
          done();
        });
    });
  });
});
