"use strict";

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("regenerator-runtime/runtime");

var _chai = _interopRequireDefault(require("chai"));

var _supertest = _interopRequireDefault(require("supertest"));

var _users = _interopRequireDefault(require("../models/users"));

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var expect = _chai.default.expect;
var server = (0, _supertest.default)(_index.default);
describe('User', function () {
  describe('user sign up', function () {
    it('should create a new user',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var userCount, response;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              userCount = _users.default.length;
              _context.next = 3;
              return server.post('/api/v1/auth/signup').send({
                id: 6,
                email: 'hello@andela.com',
                firstName: 'Bukky',
                lastName: 'Abayomi',
                password: 'hello1234'
              });

            case 3:
              response = _context.sent;
              expect(response.status).to.equal(201);
              expect(response.body.id).to.equal(_users.default[_users.default.length]);
              expect(_users.default.length).to.equal(userCount + 1);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
  });
  describe('user sign up', function () {
    it('should give the corresponding error messages',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var response, errs, i;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return server.post('/api/v1/auth/signup').send({
                id: 6,
                email: 'hello@andelacom',
                firstName: 'Bukky1',
                lastName: 'Abay omi',
                password: 'hello1234'
              });

            case 2:
              response = _context2.sent;
              expect(response.status).to.equal(422);
              errs = response.body.errors;

              for (; i < errs.length; i += 1) {
                expect(errs[i]).to.equal('input a valid email address');
                expect(errs[i]).to.equal('firstName can ony contain letters');
                expect(errs[i]).to.equal('lastName can ony contain letters');
              }

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
  });
  describe('user sign in', function () {
    it('should display the right user details',
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
              return server.post('/api/v1/auth/signin').send({
                email: 'sheggy@andela.com',
                password: 'lsfbeyiw'
              });

            case 2:
              response = _context3.sent;
              expect(response.status).to.equal(200);
              expect(response.body).to.have.property('data');
              expect(response.body).to.be.an('object');
              expect(response.body.data).to.be.an('object');

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
  });
  describe('user sign in', function () {
    it('should give the right error message',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var response;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return server.post('/api/v1/auth/signin').send({
                email: 'sheggy1@andela.com',
                password: 'lsfbeyiw'
              });

            case 2:
              response = _context4.sent;
              expect(response.status).to.equal(404);
              expect(response.body.error).to.equal('user with that email does not exist');

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
  });
  describe(' user sign in', function () {
    it('should give the right error message',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5() {
      var response;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return server.post('/api/v1/auth/signin').send({
                email: 'sheggy@andela.com',
                password: 'ballerz'
              });

            case 2:
              response = _context5.sent;
              expect(response.status).to.equal(401);
              expect(response.body.error).to.equal('incorrect password');

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
  });
});