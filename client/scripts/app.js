var app = {
  server: 'http://127.0.0.1:3000/classes/messages',
  init: function () {
    console.log('app init');
    app.$chats = $('#chats');
    app.$roomSelect = $('#roomSelect');
  },
  send: function(message) {
    $.ajax({
      type: 'POST',
      url: app.server,
      data: JSON.stringify(message),
      success: function() {
        console.log('success');
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
      success: function() {
        console.log('success get');
      },
      error: function(err) {
        console.log(err);
      }
    });
  },
  clearMessages: function() {
    app.$chats.empty();
  },
  addMessage: function(message) {
    var $chat = $('<div/>').addClass('message-chat');
    var $username = $('<span/>').addClass('message-username').text(message.username);
    var $text = $('<span/>').addClass('message-text').text(message.text);
    var $roomname = $('<span/>').addClass('message-roomname').text(message.roomname);
    $chat
      .append($username)
      .append($text)
      .append($roomname);
    app.$chats.append($chat);
  },
  addRoom: function(roomname) {
    var $option = $('<option/>').val(roomname).text(roomname);
    app.$roomSelect.append($option);
  }
};
