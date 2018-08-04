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

// lisetn for the new location event
    socket.on('newLocationMessage', function(message) {
      let ul = document.querySelector('.m-box');
      let li = document.createElement('li');
      let a = `<a href="${message.url}" target="_blank">My Current Location</a>`;
      li.innerHTML = `${message.from}: `;
      li.innerHTML += a;
      ul.appendChild(li);
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

  navigator.geolocation.getCurrentPosition( function(position) {
    // success
    console.log(position);
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function(err) {
    // error
    console.log(err)
    alert('unable to fetch the location!');
  });

});