/**
 * @description This class validates parameter inputs
 * @class ParamsValidator
 */
class ParamsValidator {
/**
 * @static
 * @param {object} request the request parameters
 * @param {object} response the response body
 * @param {function} next passes the request to another function to be processed
 * @returns next
 * @memberof ParamsValidator
 */
  static checkAccountNumber(request, response, next) {
    request.checkParams('accountNumber', 'account number can only comprise of numbers')
      .isNumeric().isLength({ min: 8, max: 8 }).withMessage('invalid account number');
    const errors = request.validationErrors();
    if (errors) {
      return response.status(400).json({
        status: 400,
        error: errors[0].msg,
      });
    }
    return next();
  }

  /**
 * @static
 * @param {object} request the request parameters
 * @param {object} response the response body
 * @param {function} next passes the request to another function to be processed
 * @returns next
 * @memberof ParamsValidator
 */
  static checktransactionId(request, response, next) {
    request.checkParams('transactionId').isNumeric().withMessage('invalid transaction ID');
    const errors = request.validationErrors();
    if (errors) {
      return response.status(400).json({
        status: 400,
        error: errors[0].msg,
      });
    }
    return next();
  }

  /**
 * @static
 * @param {object} request the request parameters
 * @param {object} response the response body
 * @param {function} next passes the request to another function to be processed
 * @returns next
 * @memberof ParamsValidator
 */
  static checkEmail(request, response, next) {
    request.checkParams('email').isEmail().withMessage('invalid email address');
    const errors = request.validationErrors();
    if (errors) {
      return response.status(400).json({
        status: 400,
        error: errors[0].msg,
      });
    }
    return next();
  }
}

export default ParamsValidator;
