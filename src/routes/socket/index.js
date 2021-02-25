const {
  disconnectChat,
  joinChat,
  sendMessagesRequest,
  sendMessagesSuccess,
} = require('../../services/socket/chat')


module.exports = io => {
  io.on('connection', socket => {
    disconnectChat(io, socket)
    joinChat(io, socket)
    sendMessagesRequest(io, socket)
    sendMessagesSuccess(io, socket)
  })
}