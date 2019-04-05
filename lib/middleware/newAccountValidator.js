"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.string.trim");

var _check = require("express-validator/check");

var newAccountInput = [(0, _check.check)('email').isEmail().withMessage('input a valid email address'), (0, _check.check)('email').not().isEmpty().withMessage('email cannot be empty'), (0, _check.check)('firstName').not().isEmpty().withMessage('firstName cannot be empty'), (0, _check.check)('lastName').not().isEmpty().withMessage('lastName cannot be empty'), (0, _check.check)('firstName').isAlpha().trim().withMessage('firstName can ony contain letters'), (0, _check.check)('lastName').isAlpha().trim().withMessage('lastName can ony contain letters'), (0, _check.check)('type').not().isEmpty().withMessage('input type'), function (req, res, next) {
  var messages = [];
  var errors = (0, _check.validationResult)(req);

  if (!errors.isEmpty()) {
    errors.array().forEach(function (err) {
      messages.push(err.msg);
    });
    return res.status(422).json({
      status: 422,
      errors: messages
    });
  }

  return next();
}];
var _default = newAccountInput;
exports.default = _default;