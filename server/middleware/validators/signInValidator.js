import { check } from 'express-validator/check';
import displayErrors from './errorMessages';

const userInput = [
  check('email').isEmail().trim().withMessage('Input a valid email address'),
  check('email').not().isEmpty().withMessage('Email cannot be empty'),
  check('password').not().isEmpty().withMessage('Password cannot be empty'),
  displayErrors,
];

export default userInput;
