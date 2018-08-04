const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');

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
socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App, enjoy youreself!'));

// emit the brodacst event to tell everyone new user is added, but that user.
socket.broadcast.emit('newMessage', generateMessage('Admin', 'new user joined!')); 

// listen for the create message event from client
  socket.on('createMessage', (message, callback) => {
    console.log(message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('this is from server!');
    
  });

// listen for the create loaction message evenr
  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('user', coords.latitude, coords.longitude));
  });


// this event is gon fire up when the client is disconnected.
  socket.on('disconnect', () => {
    console.log('client disconnected!');
  });

});

server.listen(port, () => {
  console.log(`server up on ${port}`);
});