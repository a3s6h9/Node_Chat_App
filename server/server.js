const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let users =  new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
// this event is gon fire up when the client is connected.
  console.log('New user connected');

// listen for connect event
socket.on('join', (params, callback) => {
  if (!isRealString(params.name) || !isRealString(params.room)) {
    return callback(`Name and the Room name are required!`);
  }

  socket.join(params.room);
// remove user from every other rooms before joining a room
  users.removeUser(socket.id);
// add user to the users list
  users.addUser(socket.id, params.name, params.room);
// emit a event to update the users list evertime a user joins or leaves.
  io.to(params.room).emit('updateUsersList', users.getUsersList(params.room));

// emit event to send the welcome message from admin.
  socket.emit('newMessage', generateMessage('Admin', `Welcome to the Chat App ${params.name}, make yourself home!`));
// emit the brodacst event to tell everyone new user is added, but that user.
  socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} just joined!`));

  callback();
});


// listen for the create message event from client
  socket.on('createMessage', (message, callback) => {
    let user = users.getUser(socket.id);

    if (user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }
    callback('this is from server!');
    
  });

// listen for the create loaction message evenr
  socket.on('createLocationMessage', (coords) => {
    let user = users.getUser(socket.id);

    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
    
  });


// this event is gon fire up when the client is disconnected.
  socket.on('disconnect', () => {
    console.log('client disconnected!');

// remove the user when they disconnect
    let user = users.removeUser(socket.id);

    if (user) {
// update the users list
      io.to(user.room).emit('updateUsersList', users.getUsersList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left!`));
    }
  });

});

server.listen(port, () => {
  console.log(`server up on ${port}`);
});