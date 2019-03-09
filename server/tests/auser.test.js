import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

import { validSignUpData, inValidSignUpData, inValidLoginData } from './mockData/user';
import { users } from '../dummyDb';

const { should, expect } = chai;
should();

chai.use(chaiHttp);

const url = '/api/v1/auth/signup';
const loginUrl = '/api/v1/auth/login';

describe('Test for user route', () => {
  describe('Test for signup API', () => {
    it('Should return 201 status code and create new user', (done) => {
      const newLength = users.length + 1;
      chai.request(app)
        .post(url)
        .send(validSignUpData[0])
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.an('object');
          expect(res.body.status).to.equal(201);
          expect(res.body.data).to.be.a('object');
          expect(users).to.have.length(newLength);
          done();
        });
    });
    it('Should return 201 status code and create another user', (done) => {
      const newLength = users.length + 1;
      chai.request(app)
        .post(url)
        .send(validSignUpData[1])
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.an('object');
          expect(res.body.status).to.equal(201);
          expect(res.body.data).to.be.a('object');
          expect(users).to.have.length(newLength);
          done();
        });
    });
    it('should return status code 400 and send error message for undefined/empty email', (done) => {
      chai
        .request(app)
        .post(url)
        .send(inValidSignUpData[0])
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('Supply an email');
          done();
        });
    });
    it('should return status code 400 and send error message for spaced email', (done) => {
      chai
        .request(app)
        .post(url)
        .send(inValidSignUpData[2])
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('Email cannot include space');
          done();
        });
    });
    it('should return status code 400 and send error message for invalid email format', (done) => {
      chai
        .request(app)
        .post(url)
        .send(inValidSignUpData[3])
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('Email format is invalid');
          done();
        });
    });
    it('should return status code 400 and send error message for short email', (done) => {
      chai
        .request(app)
        .post(url)
        .send(inValidSignUpData[4])
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('Email should be 10 to 30 characters long');
          done();
        });
    });
    it('should return status code 400 and send error message for existing email', (done) => {
      chai
        .request(app)
        .post(url)
        .send(inValidSignUpData[5])
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          expect(res.body.status).to.equal(409);
          expect(res.body.error).to.equal('Email already exists!');
          done();
        });
    });
    // Password
    it('should return status code 400 and send error message for undefined/empty password', (done) => {
      chai
        .request(app)
        .post(url)
        .send(inValidSignUpData[6])
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('Supply password');
          done();
        });
    });
    it('should return status code 400 and send error message for short password length', (done) => {
      chai
        .request(app)
        .post(url)
        .send(inValidSignUpData[7])
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('Ensure password is between 6 to 15 characters long');
          done();
        });
    });
    // firstname
    it('should return status code 400 and send error message for undefined/empty firstname', (done) => {
      chai
        .request(app)
        .post(url)
        .send(inValidSignUpData[8])
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('Supply firstname');
          done();
        });
    });
    it('should return status code 400 and send error message for spaced firstname', (done) => {
      chai
        .request(app)
        .post(url)
        .send(inValidSignUpData[10])
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('firstname cannot include space');
          done();
        });
    });
    it('should return status code 400 and send error message for short firstname', (done) => {
      chai
        .request(app)
        .post(url)
        .send(inValidSignUpData[11])
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('Firstname should be between 2 to 20 characters long');
          done();
        });
    });
    it('should return status code 400 and send error message for firstname with numbers', (done) => {
      chai
        .request(app)
        .post(url)
        .send(inValidSignUpData[12])
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('Firstname can only contain alphabets');
          done();
        });
    });
    // lastname
    it('should return status code 400 and send error message for undefined/empty lastname', (done) => {
      chai
        .request(app)
        .post(url)
        .send(inValidSignUpData[13])
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('Supply lastname');
          done();
        });
    });
    it('should return status code 400 and send error message for spaced lastname', (done) => {
      chai
        .request(app)
        .post(url)
        .send(inValidSignUpData[15])
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('lastname cannot contain space');
          done();
        });
    });
    it('should return status code 400 and send error message for short lastname', (done) => {
      chai
        .request(app)
        .post(url)
        .send(inValidSignUpData[16])
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('Lastname should be between 2 to 20 characters long');
          done();
        });
    });
    it('should return status code 400 and send error message for lastname with numbers', (done) => {
      chai
        .request(app)
        .post(url)
        .send(inValidSignUpData[17])
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('Firstname can only contain alphabets');
          done();
        });
    });
  });

  describe('Test for login API', () => {
    it('Should return 200 status code and log user in when correctdetails are supplied', (done) => {
      const newLength = users.length;
      chai.request(app)
        .post(loginUrl)
        .send(validSignUpData[0])
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          expect(res.body.status).to.equal(200);
          expect(res.body.data).to.be.a('object');
          expect(users).to.have.length(newLength);
          done();
        });
    });
    it('Should return 400 status code and error message when email is not supplied/empty', (done) => {
      chai.request(app)
        .post(loginUrl)
        .send(inValidLoginData[0])
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('Email is required');
          done();
        });
    });
    it('Should return 401 status code and error message when email is not found in the db', (done) => {
      chai.request(app)
        .post(loginUrl)
        .send(inValidLoginData[1])
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.an('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          expect(res.body.status).to.equal(401);
          expect(res.body.error).to.equal('Authentication failed');
          done();
        });
    });
    it('Should return 400 status code and error message when correct email is supplied but password is empty/undefined', (done) => {
      chai.request(app)
        .post(loginUrl)
        .send(inValidLoginData[2])
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('Password is required');
          done();
        });
    });
    it('Should return 401 status code and error message when correct email is supplied but password is not found in the db', (done) => {
      chai.request(app)
        .post(loginUrl)
        .send(inValidLoginData[3])
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.an('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          expect(res.body.status).to.equal(401);
          expect(res.body.error).to.equal('Incorrect login details');
          done();
        });
    });
  });
});
