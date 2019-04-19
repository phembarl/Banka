import { check } from 'express-validator/check';
import displayErrors from './errorMessages';

const newAccountInput = [
  check('userId').not().isEmpty().withMessage('userId cannot be empty'),
  check('userId').isNumeric().withMessage('userId should contain only numbers'),
  check('type').not().isEmpty().withMessage('input type'),
  displayErrors,
];

export default newAccountInput;
