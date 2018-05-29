'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaLogger = require('koa-logger');

var _koaLogger2 = _interopRequireDefault(_koaLogger);

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// initialize app
const app = new _koa2.default();

/* register middelwares */

// higherlevel middleware to catch em all error
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    console.log(`error: ${e}`);
    ctx.throw(400, { message: 'Bad Request.' });
  }
});

app.use((0, _koaBodyparser2.default)());

// dont use logger during tests.
if (process.env.NODE_ENV !== 'test') {
  app.use((0, _koaLogger2.default)());
}

exports.default = app;