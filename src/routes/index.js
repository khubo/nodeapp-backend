import Router from 'koa-router'

const router = new Router()
/**
 * @swagger
 * /:
 *   get:
 *    tags:
 *      - api
 *    description: base path
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: base response
 */
router.get('/', async ctx => {
  ctx.body = {
    message: 'products api',
    version: '0.1.0'
  }
})

export default router
