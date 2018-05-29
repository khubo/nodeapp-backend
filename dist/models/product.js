'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const productSchema = _mongoose2.default.Schema({
  name: String,
  price: Number,
  gst: Number,
  total: Number,
  createdAt: Number
}, {
  strict: true
});

class Product {
  constructor(user) {
    this.Product = _mongoose2.default.model('Product', productSchema);
  }

  // add a user to db.
  add(product) {
    product.createdAt = Date.now();
    let newProduct = new this.Product(product);
    return newProduct.save();
  }

  get(limit, offset) {
    limit = Number(limit) || 100;
    offset = Number(offset) || 0;

    // apply limit and offset
    return this.Product.find().sort({ 'createdAt': 1 }).limit(limit).skip(offset);
  }

  getCount() {
    return this.Product.aggregate([{ $group: { _id: '$gst', count: { $sum: 1 } } }]);
  }
}

exports.default = Product;