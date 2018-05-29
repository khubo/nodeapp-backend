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
    let newProduct = new this.Product(product)
    return newProduct.save()
  }
}

export default Product
