"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _transactions = _interopRequireDefault(require("../controllers/transactions"));

var _transactionValidator = _interopRequireDefault(require("../middleware/transactionValidator"));

var _accountsMidware = _interopRequireDefault(require("../middleware/accountsMidware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var transactionsRouter = _express.default.Router();

transactionsRouter.get('/transactions', _transactions.default.getTransactions);
transactionsRouter.post('/transactions/:accountNumber/credit', _transactionValidator.default, _accountsMidware.default.canFind, _transactions.default.credit);
transactionsRouter.post('/transactions/:accountNumber/debit', _transactionValidator.default, _accountsMidware.default.canFind, _transactions.default.debit);
var _default = transactionsRouter;
exports.default = _default;