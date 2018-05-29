import winston from 'winston'

const logTransporter = () => {
  return new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({
        timestamp: true
      })
    ],
    colorize: true
  })
}

export default logTransporter()
