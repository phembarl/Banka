"use strict";

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.array.index-of");

require("regenerator-runtime/runtime");

var _chai = _interopRequireDefault(require("chai"));

var _supertest = _interopRequireDefault(require("supertest"));

var _accounts = _interopRequireDefault(require("../models/accounts"));

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var expect = _chai.default.expect;
var server = (0, _supertest.default)(_index.default);
describe('Accounts', function () {
  describe('create new account', function () {
    it('should create a new account',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var accountCount, response;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              accountCount = _accounts.default.length;
              _context.next = 3;
              return server.post('/api/v1/accounts').send({
                firstName: 'Bola',
                lastName: 'Gold',
                email: 'bola_gold@andela.com',
                type: 'current'
              });

            case 3:
              response = _context.sent;
              expect(response.status).to.equal(201);
              expect(response.body.id).to.equal(_accounts.default[_accounts.default.length]);
              expect(_accounts.default.length).to.equal(accountCount + 1);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
  });
  describe('create new account', function () {
    it('should give the right error messages',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var response;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return server.post('/api/v1/accounts').send({
                firstName: 'Bola',
                lastName: 'Gold',
                email: 'bola_gold@andela.com',
                type: 'javascript'
              });

            case 2:
              response = _context2.sent;
              expect(response.status).to.equal(422);
              expect(response.body.error).to.equal('type can only be savings or current');

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
  });
  describe('update account status', function () {
    it('should update account status',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var response;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return server.patch('/api/v1/accounts/5467827301').send({
                status: 'active'
              });

            case 2:
              response = _context3.sent;
              expect(response.status).to.equal(200);
              expect(response.body.data.status).to.equal('active');

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
  });
  describe('update account status', function () {
    it('should give the right error message',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var account, response;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              account = _accounts.default[0];
              _context4.next = 3;
              return server.patch("/api/v1/accounts/".concat(account.accountNumber)).send({
                status: 'javascript'
              });

            case 3:
              response = _context4.sent;
              expect(response.status).to.equal(422);
              expect(response.body.error).to.equal('status can only be active, dormant or draft');

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
  });
  describe('delete bank account', function () {
    it('should delete account',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5() {
      var account, response;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              account = _accounts.default[0];
              _context5.next = 3;
              return server.delete("/api/v1/accounts/".concat(account.accountNumber));

            case 3:
              response = _context5.sent;
              expect(response.status).to.equal(200);
              expect(_accounts.default.indexOf(account)).to.equal(-1);
              expect(response.body.message).to.equal('account successfully deleted');

            case 7:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
  });
  describe('delete bank account', function () {
    it('should give the right error message',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6() {
      var response;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return server.delete('/api/v1/accounts/0001112223');

            case 2:
              response = _context6.sent;
              expect(response.status).to.equal(404);
              expect(response.body.error).to.equal('account not found');

            case 5:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    })));
  });
});