const express = require('express')
const setupMiddlewares = require('./middlewares')
const setupRoutes = require('./routes')

const server = express()
setupMiddlewares(server)
setupRoutes(server)

module.exports = server