import Koa from 'koa'
import cors from 'koa-cors'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import router from './routes'
import models from './models'
import logTransporter from './utils/logger'

// initialize app
const app = new Koa()

// add models to context
app.context.models = models
/* register middelwares */

// dont use logger during tests.
app.use(logger({
  transporter: (str, args) => {
    logTransporter.info(...args)
  }
}))

// run swagger if env is not production

app.use(cors())
app.use(bodyParser())
router.prefix('/api')
app.use(router.routes())
app.use(router.allowedMethods())

require('./services/mongo')
export default app
