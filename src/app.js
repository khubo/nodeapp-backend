import Koa from 'koa'
import cors from 'koa-cors'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import serveStatic from 'koa-static'
import router from './routes'
import models from './models'
import logTransporter from './utils/logger'

// initialize app
const app = new Koa()

// add models to context
app.context.models = models
/* register middelwares */

app.use(logger({
  transporter: (str, args) => {
    logTransporter.info(...args)
  }
}))

app.use(cors())
app.use(bodyParser())
app.use(serveStatic(__dirname + '/public'))
router.prefix('/api')
app.use(router.routes())
app.use(router.allowedMethods())

require('./services/mongo')
export default app
