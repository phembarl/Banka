import { check } from 'express-validator/check';
import displayErrors from './errorMessages';

const validCredit = [
  check('amount').not().isEmpty().withMessage('input amount'),
  check('amount').trim().isNumeric().withMessage('amount can only be in figures'),
  displayErrors,
];

export default validCredit;
