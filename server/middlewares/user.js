import Validator from 'validatorjs';
import { queryUsersByEmail } from '../config/sql';
import db from '../config';


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
  static async signUpValidator(req, res, next) {
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
    try {
      const { rows } = await db.query(queryUsersByEmail, [email]);
      if (rows[0]) {
        return res.status(409).json({
          status: 409,
          error: 'Email already exists!',
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
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
  static async loginValidator(req, res, next) {
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
    try {
      const { rows } = await db.query(queryUsersByEmail, [email]);
      if (!rows[0]) {
        return res.status(401).json({
          status: 401,
          error: 'Authentication failed',
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }

    password = password.trim();
    req.body.email = email;
    req.body.password = password;
    return next();
  }
}
