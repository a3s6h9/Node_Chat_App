let socket = io();

// this event is gon fire up when the server is up.
    socket.on('connect', function() {
      console.log('server is connected.');

      // emit create message event
          socket.emit('createMessage', {
            from: 'Offset_YRN',
            text: `shut yo ass up, now u ain't with yo hoes..?`
          });
    });

// this event is gon fire up when the server is down.
    socket.on('disconnect', function() {
      console.log('server disconnected!');
    });


// listen to the new Message event
    socket.on('newMessage', function(message) {
      console.log('new Message: ', message);
    });