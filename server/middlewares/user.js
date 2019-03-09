import { users } from '../dummyDb';

/**
 * Class representing User Validations
 * @class UserValiadator
 */
export class UserValidator {
  /**
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - Calls the next function
   * @returns {object} JSON representing the failure message
   */
  static signUpValidator(req, res, next) {
    /* eslint-disable prefer-const */
    let {
      email, password, firstname, lastname
    } = req.body;
    // Email
    if (!email) {
      return res.status(400).json({
        status: 400,
        error: 'Supply an email'
      });
    }

    email = email.toLowerCase().trim();
    if (email.includes(' ')) {
      return res.status(400).json({
        status: 400,
        error: 'Email cannot include space'
      });
    }
    /* eslint-disable no-useless-escape */
    const emailVerifier = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    if (!emailVerifier.test(email)) {
      return res.status(400).json({
        status: 400,
        error: 'Email format is invalid'
      });
    }
    if (email.length < 10 || email.length > 30) {
      return res.status(400).json({
        status: 400,
        error: 'Email should be 10 to 30 characters long'
      });
    }

    const foundEmail = users.find(user => user.email === email);
    if (foundEmail) {
      return res.status(409).json({
        status: 409,
        error: 'Email already exists!'
      });
    }

    // Password
    if (!password) {
      return res.status(400).json({
        status: 400,
        error: 'Supply password'
      });
    }
    password = password.trim();
    if (password.length < 6 || password.length > 15) {
      return res.status(400).json({
        status: 400,
        error: 'Ensure password is between 6 to 15 characters long'
      });
    }
    // firstname
    const nameValidCharacters = /^[A-Za-z]+$/;
    if (!firstname) {
      return res.status(400).json({
        status: 400,
        error: 'Supply firstname'
      });
    }
    firstname = firstname.toLowerCase().trim();

    if (firstname.includes(' ')) {
      return res.status(400).json({
        status: 400,
        error: 'firstname cannot include space'
      });
    }
    if (firstname.length < 2 || firstname.length > 20) {
      return res.status(400).json({
        status: 400,
        error: 'Firstname should be between 2 to 20 characters long'
      });
    }
    if (!nameValidCharacters.test(firstname)) {
      return res.status(400).json({
        status: 400,
        error: 'Firstname can only contain alphabets'
      });
    }

    // lastname
    if (!lastname) {
      return res.status(400).json({
        status: 400,
        error: 'Supply lastname'
      });
    }
    lastname = lastname.toLowerCase().trim();
    if (lastname.includes(' ')) {
      return res.status(400).json({
        status: 400,
        error: 'lastname cannot contain space'
      });
    }
    if (lastname.length < 2 || lastname.length > 20) {
      return res.status(400).json({
        status: 400,
        error: 'Lastname should be between 2 to 20 characters long'
      });
    }
    if (!nameValidCharacters.test(lastname)) {
      return res.status(400).json({
        status: 400,
        error: 'Firstname can only contain alphabets'
      });
    }
    req.body.email = email;
    req.body.password = password;
    req.body.firstname = firstname;
    req.body.lastname = lastname;
    return next();
  }


  /**
   * login User to the application
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - Calls the next function/route handler
   * @returns {object} JSON representing the failure message.
   */
  static loginValidator(req, res, next) {
    let { email, password } = req.body;
    if (!email) {
      return res.status(400).json({
        status: 400,
        error: 'Email is required',
      });
    }
    email = email.toLowerCase().trim();
    const foundUser = users.find(user => user.email === email);
    if (!foundUser) {
      return res.status(401).json({
        status: 401,
        error: 'Authentication failed',
      });
    }

    if (!password) {
      return res.status(400).json({
        status: 400,
        error: 'Password is required',
      });
    }

    password = password.trim();
    if (foundUser && password !== foundUser.password) {
      return res.status(401).json({
        status: 401,
        error: 'Incorrect login details',
      });
    }
    req.body.foundUser = foundUser;
    req.body.password = password;
    return next();
  }
}
