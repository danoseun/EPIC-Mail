import Validator from 'validatorjs';
/* eslint-disable use-isnan */
import { sentMessages, receivedMessages } from '../dummyDb';

/**
 * Function to Validate emails
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - Calls the next function
 * @returns {object} JSON representing the failure message
 */
export const messageValidator = (req, res, next) => {
  /* eslint-disable prefer-const */
  let { subject, message } = req.body;

  const rules = {
    subject: 'required|max:50',
    message: 'required'
    // status: 'required'
  };
  const validation = new Validator(req.body, rules);

  if (validation.fails()) {
    return res.status(400).json({
      status: 400,
      error: validation.errors.errors
    });
  }
  req.body.subject = subject;
  req.body.message = message;
  // req.body.status = status;
  return next();
};

/**
 * Function to check for existence of an email by Id
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - Calls the next function
 * @returns {object} JSON representing the failure message
 */

export const findMailById = (req, res, next) => {
  let messages = [...sentMessages, ...receivedMessages];
  // eslint-disable-next-line no-return-assign
  messages.forEach((element, index) => element.id = index + 1);
  const foundEmail = messages.find(message => message.id === Number(req.params.messageId));
  if (!foundEmail) {
    return res.status(404).json({
      status: 404,
      error: 'Email not found'
    });
  }
  req.body.foundEmail = foundEmail;
  return next();
};
