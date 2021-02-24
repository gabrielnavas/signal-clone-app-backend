const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server, { cors: { origin: "*", } });

const sendMessageSocket = require('../services/socket/send-message-service')

io.on('connection', socket => {
  sendMessageSocket(io, socket)
})


const setupMiddlewares = require('./middlewares')
const setupRoutes = require('./routes')

setupMiddlewares(app)
setupRoutes(app)

module.exports = server