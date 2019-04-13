import { check } from 'express-validator/check';
import errs from './errorMessages';

const userInput = [
  check('email').isEmail().trim().withMessage('input a valid email address'),
  check('password').isLength({ min: 6 }).withMessage('password is too short'),
  check('email').not().isEmpty().withMessage('email cannot be empty'),
  check('password').not().isEmpty().withMessage('password cannot be empty'),
  check('firstName').not().isEmpty().withMessage('firstName cannot be empty'),
  check('lastName').not().isEmpty().withMessage('lastName cannot be empty'),
  check('firstName').isAlpha().trim().withMessage('firstName can ony contain letters'),
  check('lastName').isAlpha().trim().withMessage('lastName can ony contain letters'),
  errs.displayErrs,
];

export default userInput;
