const { v4: uuidv4 } = require('uuid');
const { chats } = require('./chat-service')


// messages
const createMessage = ({ userId, messageText }) => {
  const message = {
    id: uuidv4(),
    userId,
    messageText
  }
  return message
}

const add = ({ idChat, userId, messageText }) => {
  const chat = chats.find(chat => chat.id === idChat)
  if (!chat) return
  const newMessage = createMessage({ userId, messageText })
  chat.messages.unshift(newMessage)
  return newMessage
}

const getAllById = id => {
  const chatsFounds = chats.filter(chat => chat.id === id)
  if (chatsFounds.length === 0) return
  return chatsFounds[0].messages
}


module.exports = {
  add,
  getAllById
}