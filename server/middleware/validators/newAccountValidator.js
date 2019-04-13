import { check } from 'express-validator/check';
import errs from './errorMessages';

const newAccountInput = [
  check('email').isEmail().withMessage('input a valid email address'),
  check('email').not().isEmpty().withMessage('email cannot be empty'),
  check('firstName').not().isEmpty().withMessage('firstName cannot be empty'),
  check('lastName').not().isEmpty().withMessage('lastName cannot be empty'),
  check('firstName').isAlpha().trim().withMessage('firstName can ony contain letters'),
  check('lastName').isAlpha().trim().withMessage('lastName can ony contain letters'),
  check('type').not().isEmpty().withMessage('input type'),
  errs.displayErrs,
];

export default newAccountInput;
