const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
// this event is gon fire up when the client is connected.
  console.log('New user connected');

// emit event to send the welcome message from admin.
socket.emit('newMessage', {
  from: 'Admin',
  text: 'Welcome to the Chat App, enjoy youreself!',
  createdAt: new Date().getTime()
});

// emit the brodacst event to tell everyone new user is added, but that user.
socket.broadcast.emit('newMessage', {
  from: 'Admin',
  text: 'we got new user in that chat room!',
  createdAt: new Date().getTime()
}); 

// listen for the create message event from client
  socket.on('createMessage', (message) => {
    console.log(message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime() // get the timestamp of when the event gets fired.
    });

  });


// this event is gon fire up when the client is disconnected.
  socket.on('disconnect', () => {
    console.log('client disconnected!');
  });

});

server.listen(port, () => {
  console.log(`server up on ${port}`);
});