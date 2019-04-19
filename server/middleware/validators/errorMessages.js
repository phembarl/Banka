import { validationResult } from 'express-validator/check';

/**
 * @description this function displays error messages
 * @param {object} request the request body
 * @param {object} response the response body
 * @param {function} next passes the request to another function to be processed
 * @returns next
 */
const displayErrors = (request, response, next) => {
  const messages = [];
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    errors.array().forEach((err) => {
      messages.push(err.msg);
    });

    return response.status(400).json({
      status: 400,
      errors: messages,
    });
  }
  return next();
};

export default displayErrors;
