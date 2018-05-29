import app from './app'
import config from 'config'

const port = process.env.PORT || config.get('PORT')

app.listen(port, () => {
  console.log(` App started listening at port ${port}`)
})
