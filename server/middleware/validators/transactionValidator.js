import { check } from 'express-validator/check';
import errs from './errorMessages';

const validCredit = [
  check('cashier').not().isEmpty().withMessage('input cashier id'),
  check('amount').not().isEmpty().withMessage('input amount'),
  check('cashier').isNumeric().withMessage('cashier id should only comprise of numbers'),
  check('amount').isNumeric().withMessage('amount can only be in figures'),
  errs.displayErrs,
];

export default validCredit;
