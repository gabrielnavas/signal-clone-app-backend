const { v4: uuidv4 } = require('uuid');

const chats = []

// chats
const createChat = ({ idUserOwner, nameChat }) => {
  const newChat = {
    id: uuidv4(),
    idUserOwner,
    nameChat,
    messages: []
  }
  return newChat
}

const add = ({ idUserOwner, nameChat }) => {
  const newChat = createChat({ idUserOwner, nameChat })
  chats.unshift(newChat)
  return newChat
}

const getAll = () => chats

module.exports = {
  add,
  getAll,
  chats
}