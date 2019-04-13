import { validationResult } from 'express-validator/check';


const Errs = {
  displayErrs(req, res, next) {
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
};

export default Errs;
