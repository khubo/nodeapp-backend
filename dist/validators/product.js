'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.productSchema = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// product schema
const productSchema = exports.productSchema = {
  name: _joi2.default.string().required(),
  price: _joi2.default.number().min(0).required(),
  gst: _joi2.default.number().min(0).required()
};