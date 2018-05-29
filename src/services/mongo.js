import mongoose from 'mongoose'
import config from 'config'

const {
  uri,
  options
} = config.get('mongo')

mongoose.connect(uri, options)

const db = mongoose.connection

db.on('error', (err) => {
  console.log(`mongodb connection erorr ${err}`)
})

db.once('open', () => {
  console.log('connection to mongodb established')
})
