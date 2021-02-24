const server = require('./config/server')
const dotenv = require('./config/env')

const portDevelopment = dotenv.PORT_SERVER

const msg = () =>
  console.log(`SERVER RUNNING IN PORT: ${portDevelopment}`)

server.listen(portDevelopment, msg)