const routes = require('express').Router()
const userService = require('../services/user-service')


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
    res.status(500).json('server error')
  }
})

module.exports = routes