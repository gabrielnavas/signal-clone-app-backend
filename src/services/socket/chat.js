const { v4: uuidv4 } = require('uuid');

const secretKeyToSendAllPeople = 123

const joinChat = (io, socket) => {
  socket.on('joinChat', payload => {
    const { idChat, user: { id, name } } = payload
    console.log(`${id} join in chat ${idChat}`);
    socket.join(idChat)
    socket.emit('joinChat', { id, name })
    socket.broadcast.to(idChat).emit('joinChat', { id, name })
  })
}

const disconnectChat = (io, socket) => {
  socket.on('disconnectChat', payload => {
    const { idChat, user: { id, name } } = payload
    console.log(`${id} left from chat ${idChat}`);
    io.to(idChat).emit('receiveMessagesFromAll', { id, name })
  })
}


const sendMessagesRequest = (io, socket) => {
  socket.on('sendMessageRequest', (payload, callback) => {
    const { idChat, userId } = payload
    console.log(`${userId} send message request from chat ${idChat}`);
    try {
      callback({
        idMessage: uuidv4(),
        secretKey: secretKeyToSendAllPeople,
      })
    } catch (error) {
      console.error(error)
      callback({ error: 'server error' })
    }
  })
}

const sendMessagesSuccess = (io, socket) => {
  socket.on('sendMessageSuccess', (payload) => {
    const { idMessage, userId, messageText } = payload
    if (payload.secretKey === secretKeyToSendAllPeople) {
      const payloadForAll = {
        idMessage,
        userId,
        messageText,
      }
      io.to(user.room)
        .emit('receiveMessagesFromAll', payloadForAll)
    }
  })
}

module.exports = {
  joinChat,
  disconnectChat,
  sendMessagesRequest,
  sendMessagesSuccess
}