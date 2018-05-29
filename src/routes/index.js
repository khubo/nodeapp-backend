import Router from 'koa-router'
import joi from 'joi'
import { productSchema } from '../validators/product'

const router = new Router()

router.get('/', async ctx => {
  ctx.body = {
    message: 'products api',
    version: '0.1.0'
  }
})

router.post('/product', async ctx => {
  // validate the req
  const body = joi.validate(ctx.request.body, productSchema)
  if (body.error) ctx.throw(400, body.error.message)

  // add product to db
  const product = new ctx.models['Product']()
  await product.add(body.value)
    .catch(e => ctx.throw(500, 'error adding data to db'))

  // send response
  ctx.body = {
    message: 'successfully added'
  }
})

export default router
