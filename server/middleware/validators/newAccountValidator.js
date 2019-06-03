import { check } from 'express-validator/check';
import displayErrors from './errorMessages';

const newAccountInput = [
  check('type').not().isEmpty().withMessage('Input type'),
  displayErrors,
];

export default newAccountInput;
