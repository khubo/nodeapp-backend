'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  uri,
  options
} = _config2.default.get('mongo');

_mongoose2.default.connect(uri, options);

const db = _mongoose2.default.connection;

db.on('error', err => {
  console.log(`mongodb connection erorr ${err}`);
});

db.once('open', () => {
  console.log('connection to mongodb established');
});