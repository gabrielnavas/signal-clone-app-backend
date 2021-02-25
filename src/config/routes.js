const routes = require('../routes/http')

module.exports = (server) => {
  server.use(routes)
}