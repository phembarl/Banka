import { check, validationResult } from 'express-validator/check';

const validCredit = [
  check('cashier').not().isEmpty().withMessage('input cashier id'),
  check('amount').not().isEmpty().withMessage('input amount'),
  check('cashier').isNumeric().withMessage('cashier id should only comprise of numbers'),
  check('amount').isNumeric().withMessage('amount can only be in figures'),
  (req, res, next) => {
    const messages = [];
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      errors.array().forEach((err) => {
        messages.push(err.msg);
      });

      return res.status(422).json({
        status: 422,
        errors: messages,
      });
    }
    return next();
  },
];

export default validCredit;
