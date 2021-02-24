module.exports = (io, socket) => {
  socket.on('sendMessage', (payload, callback) => {
    console.log(payload);
    callback()
  })
}