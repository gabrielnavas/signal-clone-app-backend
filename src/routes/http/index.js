const routes = require('express').Router()
const userService = require('../../services/http/user-service')
const authService = require('../../services/http/auth-service')
const chatService = require('../../services/http/chat-service')
const messageService = require('../../services/http/message-service')

routes.post('/register', async (req, res) => {
  const paramsNames = ['name', 'email', 'password']
  for (const param of paramsNames) {
    if (!req.body[param]) {
      return res.status(400).json({ error: `missing ${param} error` })
    }
  }
  paramsNames.forEach(param => {
    if (typeof req.body[param] === 'string') {
      req.body[param] === String(req.body[param]).trim().toLocaleLowerCase()
    }
  })
  try {
    const { token, error } = await userService.add({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      imageURL: req.body.imageURL,
    })
    if (error) {
      return res.status(400).json(error.message)
    }
    res.status(200).json(token)
  }
  catch (error) {
    console.error(error)
    res.status(500).json('server error')
  }
})
messageService
routes.post('/login', async (req, res) => {
  const paramsNames = ['email', 'password']
  for (const param of paramsNames) {
    if (!req.body[param]) {
      return res.status(400).json({ error: `missing ${param} error` })
    }
  }
  paramsNames.forEach(param => {
    if (typeof req.body[param] === 'string') {
      req.body[param] === String(req.body[param]).trim().toLocaleLowerCase()
    }
  })
  try {
    const respService = await userService.login({
      email: req.body.email,
      password: req.body.password
    })
    if (respService.error) {
      return res.status(400).json({ error: respService.error.message })
    }
    const { password, ...userLessPassword } = respService.user
    const responseObj = {
      token: respService.token,
      user: userLessPassword
    }
    res.status(200).json(responseObj)
  }
  catch (error) {
    console.error(error)
    res.status(500).json({ error: 'server error' })
  }
})

const checkAuth = (req, res, next) => {
  try {
    if(!req.headers['authorization']) {
      return res.status(400).json('authentication failure')
    }
    const bearer = req.headers['authorization']
    const token = bearer.replace('Bearer ', '').split()[0]
    const userId = authService.verifyToken(token)
    if (userId) {
      req.userId = userId
      return next()
    }
    return res.status(400).json('authentication failure')
  }
  catch (error) {
    console.error(error)
    res.status(500).json({ error: 'server error' })
  }
}

routes.post('/chat', checkAuth, (req, res) => {
  try {
    const userId = req.userId
    if (!req.body['nameChat']) {
      return res.status(400).json({ error: 'missing nameChat error' })
    }
    const newChat = chatService.add({ idUserOwner: userId, nameChat: req.body['nameChat'] })
    res.status(200).json({ body: newChat })
  }
  catch (error) {
    console.error(error)
    res.status(500).json({ error: 'server error' })
  }
})

routes.get('/chat', checkAuth, (req, res) => {
  try {
    const chats = chatService.getAll()
    res.status(200).json({ body: chats })
  }
  catch (error) {
    console.error(error)
    res.status(500).json({ error: 'server error' })
  }
})



routes.post('/message', checkAuth, (req, res) => {
  try {
    const userId = req.userId
    if (!req.body['idChat']) {
      return res.status(400).json({ error: `missing idMessage error` })
    }
    const message = messageService.add({
      idChat: req.body['idChat'],
      userId,
      messageText: req.body['messageText']
    })
    res.status(200).json({ body: message })
  }
  catch (error) {
    console.error(error)
    res.status(500).json({ error: 'server error' })
  }
})


module.exports = routes