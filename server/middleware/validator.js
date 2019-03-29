import { check, validationResult } from 'express-validator/check';

const userInput = [
  check('email').isEmail().withMessage('input a valid email address'),
  check('password').isLength({ min: 6 }).withMessage('password is too short'),
  check('email').not().isEmpty().withMessage('email cannot be empty'),
  check('password').not().isEmpty().withMessage('password cannot be empty'),
  check('firstName').not().isEmpty().withMessage('firstName cannot be empty'),
  check('lastName').not().isEmpty().withMessage('lastName cannot be empty'),
  check('firstName').isAlpha().trim().withMessage('firstName can ony contain letters'),
  check('lastName').isAlpha().trim().withMessage('lastName can ony contain letters'),
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
