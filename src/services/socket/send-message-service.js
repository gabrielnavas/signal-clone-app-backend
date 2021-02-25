const secretKeyToSendAllPeople = 123



const request = (io, socket) => {
  socket.on('sendMessageRequest', (payload, callback) => {
    console.log('call', 'sendMessageRequest');
    try {
      console.log(payload);
      callback({ body: { secretKey: secretKeyToSendAllPeople } })
    } catch (error) {
      console.error(error)
      callback({ error: 'server error' })
    }
  })
}


const success = (io, socket) => {

  socket.on('sendMessageSuccess', ({ secretKey }) => {
    if (secretKey === secretKeyToSendAllPeople) {
      console.log('send msg to my and all person in that room');
      console.log(secretKey);
    }
  })
}


const failure = (io, socket) => {

  socket.on('sendMessageFailure', (payload, callback) => {
    console.log('call', 'sendMessageRequest');
  })
}

module.exports = {
  request, success, failure
}