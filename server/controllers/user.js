import { users } from '../dummyDb';
import { createToken } from '../helpers/auth';

/**
 * Class representing UserController
 * @class UserController
 */
export class UserController {
  /**
     * Create user account on the application
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof UserController
     */
  static createAccount(req, res) {
    const {
      email, password, firstname, lastname
    } = req.body;
    const newUser = {
      id: users.length + 1,
      email,
      password,
      firstname,
      lastname
    };
    users.push(newUser);
    const token = createToken(newUser);
    return res.status(201).json({
      status: 201,
      data: { token }
    });
  }

  /**
     * Login user to the application
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof UserController
     */
  static loginUser(req, res) {
    const { foundUser } = req.body;
    const token = createToken(foundUser);
    return res.status(200).json({
      status: 200,
      data: { token }
    });
  }
}
