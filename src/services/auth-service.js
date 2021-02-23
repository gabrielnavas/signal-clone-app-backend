const jwt = require('jsonwebtoken')
const env = require('../config/env')

const verifyToken = token => {
  try {
    const respVerify = jwt.verify(token, env.KEY_TOKEN)
    const userId = respVerify.data
    return userId
  }
  catch(error) {
    return undefined
  }
} 

module.exports = {
  verifyToken
}