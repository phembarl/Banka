import { check } from 'express-validator/check';
import displayErrors from './errorMessages';

const validCredit = [
  check('amount').not().isEmpty().withMessage('Input amount'),
  check('amount').trim().isNumeric().withMessage('Amount can only be in figures'),
  displayErrors,
];

export default validCredit;
