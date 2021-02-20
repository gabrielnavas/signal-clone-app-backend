const routes = require('express').Router()
const userService = require('../services/user-service')


routes.post('/register', async (req, res) => {
  for (const param of ['name', 'email', 'user', 'password']) {
    if (!param) {
      return res.status(400).json({ error: `missing ${param} error` })
    }
  }
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

routes.post('/login', async (req,res) => {
  for (const param of ['email', 'password']) {
    if (!param) {
      return res.status(400).json({ error: `missing ${param} error` })
    }
  }

  try {
    const respService = userService.login({
      email: req.body.email, 
      password: req.body.password
    })
    if (respService.error) {
      return res.status(400).json(respService.error.message)
    }
    const {password, ...userLessPassword} = respService.user
    const responseObj = {
      token: respService.token,
      userLessPassword
    }
    res.status(200).json(responseObj)
  }
  catch (error) {
    console.error(error)
    res.status(500).json('server error')
  }
})

module.exports = routes