"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _accounts = _interopRequireDefault(require("../controllers/accounts"));

var _newAccountValidator = _interopRequireDefault(require("../middleware/newAccountValidator"));

var _accountsMidware = _interopRequireDefault(require("../middleware/accountsMidware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var accountsRouter = _express.default.Router();

accountsRouter.get('/accounts', _accounts.default.getAccounts);
accountsRouter.post('/accounts', _newAccountValidator.default, _accountsMidware.default.isValidType, _accounts.default.createAccount);
accountsRouter.patch('/accounts/:accountNumber', _accountsMidware.default.canUpdate, _accounts.default.updateAccount);
accountsRouter.delete('/accounts/:accountNumber', _accountsMidware.default.canFind, _accounts.default.deleteAccount);
var _default = accountsRouter;
exports.default = _default;