var app = {
  server: 'http://127.0.0.1:3000/classes/messages',
  init: function () {
    console.log('app init');

    // initial variables
    app.username = window.location.search.slice(10);
    app.availablerooms = ['lobby'];
    app.currentroom = app.availablerooms[0];
    app.friends = [];

    // new message variables
    app.$roomSelect = $('#roomSelect');
    app.$messageText = $('#messageText');
    app.$newRoom = $('#newRoom');

    // previous messages
    app.$send = $('#send');
    app.$chats = $('#chats');

    // event listners
    app.$newRoom.on('click', app.handleNewroom);
    app.$roomSelect.on('change', app.handleChangeroom);
    app.$roomSelect.on('click', function(evt) {
      clearInterval(app._fetch);
    });
    app.$send.on('submit', app.handleSubmit);
    app.$chats.on('click', '.username', app.addFriend);

    app.fetch();
    app._fetch = setInterval(function() {
      app.fetch();
    }, 1000);
  },
  send: function(message) {
    $.ajax({
      type: 'POST',
      url: app.server,
      data: JSON.stringify(message),
      success: function() {
        console.log('sent');
        app.$messageText.val('');
        app.fetch();
      },
      error: function(err) {
        console.log(err);
      },
      dataType: 'json'
    });
  },
  fetch: function() {
    $.ajax({
      type: 'GET',
      url: app.server,
      success: function(data) {
        app.populateRooms(data.results.reverse());
        app.populateMessages(data.results);
      },
      error: function(err) {
        console.error(err);
      }
    });
  },
  // delete current dom select options
  // add availablerooms to select options
  // add rest of rooms from messages to select options
  // select currentroom
  populateRooms: function(messages) {
    var rooms = {};
    app.$roomSelect.children().remove();
    app.availablerooms.forEach(function(room) {
      if (!rooms[room]) {
        rooms[room] = true
        app.addRoom(room);
      }
    });
    messages.forEach(function(message) {
      if (!rooms[message.roomname]) {
        rooms[message.roomname] = true;
        app.addRoom(message.roomname);
      }
    });
    app.$roomSelect.val(app.currentroom);
  },
  // add room option to dom
  // add rooms to app
  addRoom: function(roomname) {
    var optionDiv = '<option/>'
    var $option = $(optionDiv).val(roomname).text(roomname);
    app.$roomSelect.append($option);
    app.availablerooms.push(roomname);
  },
  /*
    1. user clicks new room
    2. user types in roomname
        - if room exists, user gets a message it exists
        - else, add room to room list
  */
  handleNewroom: function(event) {
    var newRoom = prompt('Enter New Room');
    var roomExists = false;
    app.availablerooms.forEach(function(room) {
      if (room === newRoom) {
        roomExists = true;
      }
    });
    if (roomExists) {
      alert(newRoom + ' exists already!');
    } else {
      app.addRoom(newRoom);
    }
    event.preventDefault();
  },
  handleChangeroom: function(event) {
    app.currentroom = app.$roomSelect.val();
    app.fetch();
    app._fetch = setInterval(function() {
      app.fetch();
    }, 1000);
  },
  clearMessages: function() {
    app.$chats.empty();
  },
  populateMessages: function(messages) {
    app.$chats.empty();
    messages.forEach(function(message) {
      if (app.currentroom === message.roomname) {
        app.addMessage(message);
      }
    });
  },
  addMessage: function(message) {
    var $chat = $('<div/>')
      .addClass('chat');
    var $username = $('<span/>')
      .addClass('username')
      .text(message.username + ': ')
      .css("font-weight","Bold");
    var $text = $('<span/>')
      .addClass('message-text')
      .text(message.text);
    $chat
      .append($username)
      .append($text)
    app.$chats.append($chat);
  },
  handleSubmit: function(event) {
    var message = {
      username: app.username,
      text: app.$messageText.val(),
      roomname: app.currentroom
    };
    app.send(message);
    event.preventDefault();
  },
  addFriend: function(evt) {
    var newFriend = $(this).text();
    var friendExist = false;
    app.friends.forEach(function(friend) {
      if (friend === newFriend) {
        friendExist = true;
      }
    });
    if (!friendExist) {
      app.friends.push(newFriend);
    } else {
      alert(newFriend + ' already exists!');
    }
  }
};
