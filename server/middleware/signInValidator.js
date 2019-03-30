import { check, validationResult } from 'express-validator/check';

const userInput = [
  check('email').isEmail().withMessage('input a valid email address'),
  check('email').not().isEmpty().withMessage('input email address'),
  check('password').not().isEmpty().withMessage('input password'),
  (req, res, next) => {
    const messages = [];
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      errors.array().forEach((err) => {
        messages.push(err.msg);
      });

      return res.status(422).json({
        status: 422,
        errors: messages,
      });
    }
    return next();
  },
];

export default userInput;
