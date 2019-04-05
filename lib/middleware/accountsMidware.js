"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.string.trim");

require("core-js/modules/es6.number.constructor");

var _accounts = _interopRequireDefault(require("../models/accounts"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Account = {
  isValidType: function isValidType(req, res, next) {
    var type = req.body.type;

    if (type === 'savings' || type === 'current') {
      return next();
    }

    return res.status(422).json({
      status: 422,
      error: 'type can only be savings or current'
    });
  },
  canUpdate: function canUpdate(req, res, next) {
    var accountNumber = req.params.accountNumber;
    accountNumber = Number(accountNumber);
    var status = req.body.status;
    status = status.trim();

    var account = _accounts.default.find(function (acc) {
      return acc.accountNumber === accountNumber;
    });

    if (!account) {
      return res.status(404).json({
        status: 404,
        error: 'no account with provided account number'
      });
    }

    if (status === 'active' || status === 'dormant' || status === 'draft') {
      return next();
    }

    return res.status(422).json({
      status: 422,
      error: 'status can only be active, dormant or draft'
    });
  },
  canFind: function canFind(req, res, next) {
    var accountNumber = req.params.accountNumber;
    accountNumber = Number(accountNumber);

    var account = _accounts.default.find(function (acc) {
      return acc.accountNumber === accountNumber;
    });

    if (!account) {
      return res.status(404).json({
        status: 404,
        error: 'account not found'
      });
    }

    return next();
  }
};
var _default = Account;
exports.default = _default;