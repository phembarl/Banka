import { check } from 'express-validator/check';
import displayErrors from './errorMessages';

const userInput = [
  check('email').isEmail().trim().withMessage('input a valid email address'),
  check('email').not().isEmpty().withMessage('email cannot be empty'),
  check('password').not().isEmpty().withMessage('password cannot be empty'),
  displayErrors,
];

export default userInput;
