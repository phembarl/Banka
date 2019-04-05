"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.number.constructor");

var _accounts = _interopRequireDefault(require("../models/accounts"));

var _transactions = _interopRequireDefault(require("../models/transactions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Transaction = {
  getTransactions: function getTransactions(req, res) {
    return res.status(200).json({
      status: 200,
      data: _transactions.default
    });
  },
  credit: function credit(req, res) {
    var accountNumber = req.params.accountNumber;
    accountNumber = Number(accountNumber);
    var cashier = req.body.cashier;
    var amount = req.body.amount;
    amount = Number(amount);

    var account = _accounts.default.find(function (acc) {
      return acc.accountNumber === accountNumber;
    });

    var id = _transactions.default.length + 1;
    var oldBalance = Number(account.balance);
    var newBalance = oldBalance + amount;
    var newTransaction = {
      id: id,
      createdOn: new Date().toString(),
      type: 'credit',
      accountNumber: accountNumber,
      amount: amount,
      cashier: cashier,
      oldBalance: oldBalance,
      newBalance: newBalance
    };

    _transactions.default.push(newTransaction);

    account.balance = newBalance;
    return res.status(200).json({
      status: 200,
      data: {
        transactionId: newTransaction.id,
        accountNumber: accountNumber.toString(),
        amount: amount,
        cashier: cashier,
        transactionType: newTransaction.type,
        accountBalance: newBalance.toString()
      }
    });
  },
  debit: function debit(req, res) {
    var accountNumber = req.params.accountNumber;
    var cashier = req.body.cashier;
    var amount = req.body.amount;
    accountNumber = Number(accountNumber);
    amount = Number(amount);

    var account = _accounts.default.find(function (acc) {
      return acc.accountNumber === accountNumber;
    });

    var id = _transactions.default.length + 1;
    var oldBalance = Number(account.balance);
    var newBalance = oldBalance - amount;
    var newTransaction = {
      id: id,
      createdOn: new Date().toString(),
      type: 'debit',
      accountNumber: accountNumber,
      amount: amount,
      cashier: cashier,
      oldBalance: oldBalance,
      newBalance: newBalance
    };

    _transactions.default.push(newTransaction);

    account.balance = newBalance;
    return res.status(200).json({
      status: 200,
      data: {
        transactionId: newTransaction.id,
        accountNumber: accountNumber.toString(),
        amount: amount,
        cashier: cashier,
        transactionType: newTransaction.type,
        accountBalance: newBalance.toString()
      }
    });
  }
};
var _default = Transaction;
exports.default = _default;