import { check } from 'express-validator/check';
import displayErrors from './errorMessages';

const validCredit = [
  check('cashier').not().isEmpty().withMessage('input cashier id'),
  check('amount').not().isEmpty().withMessage('input amount'),
  check('cashier').isNumeric().withMessage('cashier id should contain only numbers'),
  check('amount').isNumeric().withMessage('amount can only be in figures'),
  displayErrors,
];

export default validCredit;
