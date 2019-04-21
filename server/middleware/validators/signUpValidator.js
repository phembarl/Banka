import { check } from 'express-validator/check';
import displayErrors from './errorMessages';

const userInput = [
  check('firstName').not().isEmpty().withMessage('firstName cannot be empty'),
  check('firstName').isAlpha().trim().withMessage('firstName can ony contain letters'),
  check('lastName').not().isEmpty().withMessage('lastName cannot be empty'),
  check('lastName').isAlpha().trim().withMessage('lastName can ony contain letters'),
  check('email').not().isEmpty().withMessage('email cannot be empty'),
  check('email').isEmail().trim().withMessage('input a valid email address'),
  check('type').not().isEmpty().withMessage('type is missing. are you a client or staff?'),
  check('password').not().isEmpty().withMessage('password cannot be empty'),
  check('password').isLength({ min: 4 }).withMessage('password cannot be less than 4 characters'),
  displayErrors,
];

export default userInput;
