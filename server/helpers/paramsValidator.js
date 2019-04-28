class ParamsValidator {
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
