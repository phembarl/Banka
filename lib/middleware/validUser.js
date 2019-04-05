"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

var ValidUser = {
  hashPassword: function hashPassword(password) {
    var salt = _bcryptjs.default.genSaltSync(10);

    var hash = _bcryptjs.default.hashSync(password, salt);

    return hash;
  },
  comparePassword: function comparePassword(password, hash) {
    return _bcryptjs.default.compareSync(password, hash);
  },
  generateToken: function generateToken(id) {
    var token = _jsonwebtoken.default.sign({
      userId: id
    }, process.env.SECRET, {
      expiresIn: '30d'
    });

    return token;
  }
};
var _default = ValidUser;
exports.default = _default;