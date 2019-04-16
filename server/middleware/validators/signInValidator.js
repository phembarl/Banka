import { check } from 'express-validator/check';
import displayErrors from './errorMessages';

const userInput = [
  check('email').isEmail().trim().withMessage('input a valid email address'),
  check('email').not().isEmpty().withMessage('input email address'),
  check('password').not().isEmpty().withMessage('input password'),
  displayErrors,
];

export default userInput;
