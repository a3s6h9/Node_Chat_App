let socket = io();

// this event is gon fire up when the server is up.
    socket.on('connect', function() {
      console.log('server is connected.');
    });

// this event is gon fire up when the server is down.
    socket.on('disconnect', function() {
      console.log('server disconnected!');
    });


// listen to the new Message event
    socket.on('newMessage', function(message) {
      console.log('new Message: ', message);
    });