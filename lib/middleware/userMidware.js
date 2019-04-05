"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _users = _interopRequireDefault(require("../models/users"));

var _validUser = _interopRequireDefault(require("./validUser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = {
  isNewEmail: function isNewEmail(req, res, next) {
    var email = req.body.email;

    for (var i = 0; i < _users.default.length; i += 1) {
      if (email === _users.default[i].email) {
        return res.status(409).json({
          status: 409,
          message: 'user with that email already exists'
        });
      }
    }

    return next();
  },
  isValidSignIn: function isValidSignIn(req, res, next) {
    var _req$body = req.body,
        email = _req$body.email,
        password = _req$body.password;

    for (var i = 0; i < _users.default.length; i += 1) {
      if (email === _users.default[i].email) {
        if (_validUser.default.comparePassword(password, _users.default[i].password) || password === _users.default[i].password) {
          return next();
        }

        return res.status(401).json({
          status: 401,
          error: 'incorrect password'
        });
      }
    }

    return res.status(404).json({
      status: 404,
      error: 'user with that email does not exist'
    });
  }
};
var _default = User;
exports.default = _default;