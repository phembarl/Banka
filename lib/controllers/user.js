"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.array.find");

var _users = _interopRequireDefault(require("../models/users"));

var _validUser = _interopRequireDefault(require("../middleware/validUser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = {
  getUsers: function getUsers(req, res) {
    return res.status(200).json({
      status: 200,
      data: _users.default
    });
  },
  signUp: function signUp(req, res) {
    var _req$body = req.body,
        firstName = _req$body.firstName,
        lastName = _req$body.lastName,
        email = _req$body.email,
        password = _req$body.password;
    var id = _users.default.length + 1;

    var token = _validUser.default.generateToken(id);

    var newUser = {
      id: id,
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: _validUser.default.hashPassword(password),
      isAdmin: false
    };

    _users.default.push(newUser);

    return res.status(201).json({
      status: 201,
      data: {
        token: token,
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email
      }
    });
  },
  signIn: function signIn(req, res) {
    var _req$body2 = req.body,
        email = _req$body2.email,
        password = _req$body2.password;

    var user = _users.default.find(function (owner) {
      return email === owner.email && (_validUser.default.comparePassword(password, owner.password) || password === owner.password);
    });

    return res.status(200).json({
      status: 200,
      data: user
    });
  }
};
var _default = User;
exports.default = _default;