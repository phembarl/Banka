"use strict";

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("regenerator-runtime/runtime");

var _chai = _interopRequireDefault(require("chai"));

var _supertest = _interopRequireDefault(require("supertest"));

var _accounts = _interopRequireDefault(require("../models/accounts"));

var _transactions = _interopRequireDefault(require("../models/transactions"));

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var expect = _chai.default.expect;
var server = (0, _supertest.default)(_index.default);
describe('Accounts', function () {
  describe('credit acount', function () {
    it('should create a successful transaction record',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var account, oldAmount, response;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              account = _accounts.default[0];
              oldAmount = account.balance;
              _context.next = 4;
              return server.post("/api/v1/transactions/".concat(account.accountNumber, "/credit")).send({
                cashier: 101,
                amount: 1000000
              });

            case 4:
              response = _context.sent;
              expect(response.status).to.equal(200);
              expect(response.body.data.transactionId).to.equal(_transactions.default.length);
              expect(account.balance).to.equal(oldAmount + response.body.data.amount);

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
  });
  describe('credit acount', function () {
    it('should give the right error message',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var account, response, errs, i;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              account = _accounts.default[0];
              _context2.next = 3;
              return server.post("/api/v1/transactions/".concat(account.accountNumber, "/credit")).send({
                cashier: 'hello',
                amount: 'two million'
              });

            case 3:
              response = _context2.sent;
              expect(response.status).to.equal(422);
              errs = response.body.errors;

              for (; i < errs.length; i += 1) {
                expect(errs[i]).to.equal('input cashier id');
                expect(errs[i]).to.equal('input amount');
                expect(errs[i]).to.equal('cashier id should only comprise of numbers');
                expect(errs[i]).to.equal('amount can only be in figures');
              }

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
  });
  describe('debit acount', function () {
    it('should create a successful transaction record',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var account, oldAmount, response;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              account = _accounts.default[0];
              oldAmount = account.balance;
              _context3.next = 4;
              return server.post("/api/v1/transactions/".concat(account.accountNumber, "/debit")).send({
                cashier: 101,
                amount: 1000000
              });

            case 4:
              response = _context3.sent;
              expect(response.status).to.equal(200);
              expect(response.body.data.transactionId).to.equal(_transactions.default.length);
              expect(account.balance).to.equal(oldAmount - response.body.data.amount);

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
  });
  describe('debit acount', function () {
    it('should give the right error message',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var account, response, errs, i;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              account = _accounts.default[0];
              _context4.next = 3;
              return server.post("/api/v1/transactions/".concat(account.accountNumber, "/credit")).send({
                cashier: 'hello',
                amount: 'two million'
              });

            case 3:
              response = _context4.sent;
              expect(response.status).to.equal(422);
              errs = response.body.errors;

              for (; i < errs.length; i += 1) {
                expect(errs[i]).to.equal('input cashier id');
                expect(errs[i]).to.equal('input amount');
                expect(errs[i]).to.equal('cashier id should only comprise of numbers');
                expect(errs[i]).to.equal('amount can only be in figures');
              }

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
  });
});