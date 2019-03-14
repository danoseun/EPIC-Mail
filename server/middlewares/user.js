import Validator from 'validatorjs';
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

    const rules = {
      email: 'required|email|min:10|max:30',
      password: 'required|min:6|max:16',
      firstname: 'required|min:2|max:20|alpha',
      lastname: 'required|min:2|max:20|alpha'
    };
    const validation = new Validator(req.body, rules);

    if (validation.fails()) {
      return res.status(400).json({
        status: 400,
        error: validation.errors.errors
      });
    }

    email = email.toLowerCase().trim();
    const foundEmail = users.find(user => user.email === email);
    if (foundEmail) {
      return res.status(409).json({
        status: 409,
        error: 'Email already exists!'
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

    const rules = {
      email: 'required|email',
      password: 'required'
    };
    const validation = new Validator(req.body, rules);

    if (validation.fails()) {
      return res.status(400).json({
        status: 400,
        error: validation.errors.errors
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
