'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaCors = require('koa-cors');

var _koaCors2 = _interopRequireDefault(_koaCors);

var _koaLogger = require('koa-logger');

var _koaLogger2 = _interopRequireDefault(_koaLogger);

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _models = require('./models');

var _models2 = _interopRequireDefault(_models);

var _logger = require('./utils/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// initialize app
const app = new _koa2.default();

// add models to context
app.context.models = _models2.default;
/* register middelwares */

app.use((0, _koaLogger2.default)({
  transporter: (str, args) => {
    _logger2.default.info(...args);
  }
}));

app.use((0, _koaCors2.default)());
app.use((0, _koaBodyparser2.default)());
app.use((0, _koaStatic2.default)(__dirname + '/public'));
_routes2.default.prefix('/api');
app.use(_routes2.default.routes());
app.use(_routes2.default.allowedMethods());

require('./services/mongo');
exports.default = app;