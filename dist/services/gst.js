'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateTotal = undefined;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const baseUrl = 'http://api.mathjs.org/v4/?expr=';

const calculateTotal = exports.calculateTotal = (price, gst) => {
  price = Number(price);
  gst = Number(gst);
  let url = encodeURI(`${baseUrl}${price} * ${gst} / 100 + ${price}`);

  return _axios2.default.post(url, { expr: [`det(${price} * ${gst} / 100 + ${price})`] }).then(res => res.data.result[0]);
};