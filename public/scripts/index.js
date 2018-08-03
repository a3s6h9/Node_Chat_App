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

      // create li and append it to the ul
      let ul = document.querySelector('.m-box');
      let li = document.createElement('li');
      li.innerHTML = (`${message.from}: ${message.text}`);
      ul.appendChild(li);

    });

/* // acknowledgement
    socket.emit('createMessage', {
      from: 'Wild Frank',
      text: 'Hi'
    }, function(data){
      console.log('Got It, ', data);
    });
 */


// real client side...
document.getElementById('form').addEventListener('submit', function(e) {

  socket.emit('createMessage', {
    from: 'User',
    text: document.getElementById('message').value
  }, function() {

  });

  e.preventDefault();
});