'use strict';

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const port = process.env.PORT || 1337;

_app2.default.listen(port, () => {
  console.log(` App started listening at port ${port}`);
});