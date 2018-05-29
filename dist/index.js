'use strict';

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const port = process.env.PORT || _config2.default.get('PORT');

_app2.default.listen(port, () => {
  console.log(` App started listening at port ${port}`);
});