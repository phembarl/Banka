"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _user = _interopRequireDefault(require("./routes/user"));

var _accounts = _interopRequireDefault(require("./routes/accounts"));

var _transactions = _interopRequireDefault(require("./routes/transactions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
var port = process.env.PORT || 3000;
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use('/api/v1/', _user.default);
app.use('/api/v1/', _accounts.default);
app.use('/api/v1/', _transactions.default);
app.listen(port, function () {
  console.log('Your app is being served on port', port);
});
var _default = app;
exports.default = _default;