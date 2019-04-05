"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.array.for-each");

var _check = require("express-validator/check");

var validCredit = [(0, _check.check)('cashier').not().isEmpty().withMessage('input cashier id'), (0, _check.check)('amount').not().isEmpty().withMessage('input amount'), (0, _check.check)('cashier').isNumeric().withMessage('cashier id should only comprise of numbers'), (0, _check.check)('amount').isNumeric().withMessage('amount can only be in figures'), function (req, res, next) {
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
var _default = validCredit;
exports.default = _default;