"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.string.trim");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.number.constructor");

var _faker = _interopRequireDefault(require("faker"));

var _accounts = _interopRequireDefault(require("../models/accounts"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Accounts = {
  getAccounts: function getAccounts(req, res) {
    return res.status(200).json({
      status: 200,
      data: _accounts.default
    });
  },
  createAccount: function createAccount(req, res) {
    var _req$body = req.body,
        firstName = _req$body.firstName,
        lastName = _req$body.lastName,
        email = _req$body.email,
        type = _req$body.type;
    var id = _accounts.default.length + 1;
    var accountNumber = Number(_faker.default.finance.account());
    var openingBalance = 0.00;
    var newAccount = {
      id: id,
      accountNumber: accountNumber,
      createdOn: new Date().toString(),
      owner: id,
      type: type,
      status: 'draft',
      balance: openingBalance
    };

    _accounts.default.push(newAccount);

    return res.status(201).json({
      status: 201,
      data: {
        accountNumber: accountNumber,
        firstName: firstName,
        lastName: lastName,
        email: email,
        type: type,
        openingBalance: openingBalance
      }
    });
  },
  updateAccount: function updateAccount(req, res) {
    var accountNumber = req.params.accountNumber;
    accountNumber = Number(accountNumber);
    var status = req.body.status;
    status = status.trim();

    var account = _accounts.default.find(function (acc) {
      return acc.accountNumber === accountNumber;
    });

    account.status = status;
    return res.status(200).json({
      status: 200,
      data: {
        accountNumber: account.accountNumber,
        status: account.status
      }
    });
  },
  deleteAccount: function deleteAccount(req, res) {
    var accountNumber = req.params.accountNumber;
    accountNumber = Number(accountNumber);

    var account = _accounts.default.find(function (acc) {
      return acc.accountNumber === accountNumber;
    });

    _accounts.default.splice(_accounts.default.indexOf(account), 1);

    return res.status(200).json({
      status: 200,
      message: 'account successfully deleted'
    });
  }
};
var _default = Accounts;
exports.default = _default;