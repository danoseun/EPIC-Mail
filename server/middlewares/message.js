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
  if (!subject) {
    return res.status(400).json({
      status: 400,
      error: 'Subject is required'
    });
  }
  subject = subject.toLowerCase().trim();
  if (subject.length > 50) {
    return res.status(400).json({
      status: 400,
      error: 'Subject should be 50 or less characters'
    });
  }

  if (!message) {
    return res.status(400).json({
      status: 400,
      error: 'Message is required'
    });
  }
  message = message.toLowerCase().trim();
  req.body.subject = subject;
  req.body.message = message;
  return next();
};
