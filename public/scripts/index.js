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
      let formattedTime = moment(message.createdAt).format('h:mm a');
      console.log('new Message: ', message);

// need to use the jQuery cuz of mustache
      let template = $('#message-template').html();
      let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
      });

      $('.m-box').append(html);

    });

// lisetn for the new location event
    socket.on('newLocationMessage', function(message) {
      let formattedTime = moment(message.createdAt).format('h:mm a');

      let template = $('#location-message-template').html();
      let html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
      });
      $('.m-box').append(html);

    });

// real client side...
document.getElementById('form').addEventListener('submit', function(e) {

  socket.emit('createMessage', {
    from: 'User',
    text: document.getElementById('message').value
  }, function() {

  });

// clear input field after sending the message  
  document.getElementById('message').value = '';
  e.preventDefault();
});

// get the location of the user on send location button click
let locationBtn = document.getElementById('loc-btn');
locationBtn.addEventListener('click', function() {
  if(!navigator.geolocation) {
    return alert('gelocation is not supported in your browser.');
  }

  changeState(locationBtn, 'Sending Location...', '0.8');

  navigator.geolocation.getCurrentPosition( function(position) {
    // success
    changeState(locationBtn, 'Send Location', '1', 'disabled');
    console.log(position);
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function(err) {
    // error
    console.log(err)
    changeState(locationBtn, 'Send Location', '1', 'disabled');
    alert('unable to fetch the location!');
  });

});