import mongoose from 'mongoose'

const productSchema = mongoose.Schema({
  name: String,
  price: Number,
  gst: Number,
  total: Number,
  createdAt: Number
}, {
  strict: true
})

class Product {
  constructor (user) {
    this.Product = mongoose.model('Product', productSchema)
  }

  // add a user to db.
  add (product) {
    product.createdAt = Date.now()
    product.total = product.price + (product.price * product.gst / 100)
    let newProduct = new this.Product(product)
    return newProduct.save()
  }

  get (limit, offset) {
    limit = Number(limit) || 100
    offset = Number(offset) || 0

    // apply limit and offset
    return this.Product.find()
      .sort({'createdAt': 1})
      .limit(limit)
      .skip(offset)
  }

  getCount () {
    return this.Product.aggregate(
      [{$group: {_id: '$gst', count: {$sum: 1}}}]
    )
  }
}

export default Product
