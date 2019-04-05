"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _user = _interopRequireDefault(require("../controllers/user"));

var _signUpValidator = _interopRequireDefault(require("../middleware/signUpValidator"));

var _signInValidator = _interopRequireDefault(require("../middleware/signInValidator"));

var _userMidware = _interopRequireDefault(require("../middleware/userMidware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userRouter = _express.default.Router();

userRouter.get('/users', _user.default.getUsers);
userRouter.post('/auth/signup', _signUpValidator.default, _userMidware.default.isNewEmail, _user.default.signUp);
userRouter.post('/auth/signin', _signInValidator.default, _userMidware.default.isValidSignIn, _user.default.signIn);
var _default = userRouter;
exports.default = _default;