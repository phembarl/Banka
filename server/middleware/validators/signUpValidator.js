import { check } from 'express-validator/check';
import displayErrors from './errorMessages';

const userInput = [
  check('firstName').not().isEmpty().withMessage('First name cannot be empty'),
  check('firstName').isAlpha().trim().withMessage('First name can only contain letters'),
  check('lastName').not().isEmpty().withMessage('Last name cannot be empty'),
  check('lastName').isAlpha().trim().withMessage('Last name can only contain letters'),
  check('email').not().isEmpty().withMessage('Email cannot be empty'),
  check('email').isEmail().trim().withMessage('Input a valid email address'),
  check('type').not().isEmpty().withMessage('Type is missing. Are you a client or staff?'),
  check('password').not().isEmpty().withMessage('Password cannot be empty'),
  check('password').isLength({ min: 4 }).withMessage('Password cannot be less than 4 characters'),
  displayErrors,
];

export default userInput;
