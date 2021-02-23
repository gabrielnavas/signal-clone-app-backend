const jwt = require('jsonwebtoken')
const validator = require('validator')
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt')
const dotenv = require('../config/env')

const users = []

const makeMoreOneDay = () => Math.floor(Date.now() / 1000) + (1000 * 60 * 60 * 24)

const makeToken = idUser => {
  const keyToken = dotenv.KEY_TOKEN
  const moreOneDay = makeMoreOneDay()
  const token = jwt.sign({ exp: moreOneDay, data: idUser }, keyToken)
  return token
}

const checkPasswordHashed = async (plainPassword, hashedPassword) =>
  await bcrypt.compare(plainPassword.toString(), hashedPassword.toString())

const add = async ({
  name,
  email,
  password,
  imageURL,
}) => {
  let error
  let token

  if (!validator.isEmail(email)) {
    error = new Error('Email is wrong')
  }
  if (name.length < 3 || name.length > 30) {
    error = new Error('name is needs to be less 3 and graater than 30.')
  }
  if (password.length < 6 || password.length > 30) {
    error = new Error('password is needs to be less 3 and graater than 30.')
  }
  if (imageURL && !validator.isURL(imageURL)) {
    error = new Error('url image is wrong')
  }
  const userFound = users.find(user => user.email === email)
  if (userFound) {
    error = new Error('user with email has exists')
  }
  if (!error) {
    const id = uuidv4()
    const saltRoundsBcrypt = 10;
    const passwordHashed = await bcrypt.hash(password.toString(), saltRoundsBcrypt)
    const user = {
      id,
      name,
      email,
      password: passwordHashed,
      imageURL,
    }
    token = makeToken(user.id)
    users.push(user)
    return {
      token
    }
  }
  return {
    error,
  }
}

const login = async ({ email, password }) => {
  let error
  let token
  let user
  const userFound = users.find(user => user.email === email)
  if (!userFound) {
    error = new Error('user not found')
  } else {
    const passwordEquals = await checkPasswordHashed(password, userFound.password)
    if (!passwordEquals) {
      error = new Error('user not found')
    }
  }

  if (!error) {
    //security fails here , need before invalidate previous token and after generete a new
    token = makeToken(userFound.id)
    user = userFound
    return {
      user,
      token
    }
  }
  return { error }
}

module.exports = {
  add,
  login,
}