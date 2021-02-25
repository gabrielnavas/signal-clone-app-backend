const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server, { cors: { origin: "*", } });

const setupRoutesSockets = require('../routes/socket')
const setupMiddlewares = require('./middlewares')
const setupRoutesHttp = require('./routes')

setupMiddlewares(app)
setupRoutesHttp(app)
setupRoutesSockets(io)

module.exports = server