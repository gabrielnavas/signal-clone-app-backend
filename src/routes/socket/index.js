const sendMessageService = require('../../services/socket/send-message-service')


module.exports = io => {
  io.on('connection', socket => {
    sendMessageService.request(io, socket)
    sendMessageService.success(io, socket)
    sendMessageService.failure(io, socket)
  })
}