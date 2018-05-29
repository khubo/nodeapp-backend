import Router from 'koa-router'
import joi from 'joi'
import { productSchema } from '../validators/product'
import { calculateTotal } from '../services/gst'
const router = new Router()

router.get('/', async ctx => {
  ctx.body = {
    message: 'products api',
    version: '0.1.0'
  }
})

// add product api
router.post('/product', async ctx => {
  // validate the req
  const body = joi.validate(ctx.request.body, productSchema)
  if (body.error) ctx.throw(400, body.error.message)
  // calcuate total
  const total = await calculateTotal(body.value.price, body.value.gst)
  body.value.total = total
  // add product to db
  const Product = new ctx.models['Product']()
  await Product.add(body.value)
    .catch(e => ctx.throw(500, 'error adding data to db'))

  // send response
  ctx.body = {
    message: 'successfully added'
  }
})

// proudcts data api
router.get('/products', async ctx => {
  let { limit, offset } = ctx.request.query

  // retrieve data
  const Product = new ctx.models['Product']()
  let products = await Product.get(limit, offset)
    .catch(e => ctx.throw(500, 'error adding data to db'))

  // send data back
  ctx.body = {
    products
  }
})

// count api
router.get('/count', async ctx => {
  // fetch all products count
  const Product = new ctx.models['Product']()
  let count = await Product.getCount()

  // send response
  ctx.body = {
    count
  }
})
export default router
