"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.string.trim");

var _check = require("express-validator/check");

var userInput = [(0, _check.check)('email').isEmail().trim().withMessage('input a valid email address'), (0, _check.check)('email').not().isEmpty().withMessage('input email address'), (0, _check.check)('password').not().isEmpty().withMessage('input password'), function (req, res, next) {
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
var _default = userInput;
exports.default = _default;