const { json } = require('express')
const cors = require('cors')

module.exports = server => {
  server.use(json())
  server.use(cors())
}