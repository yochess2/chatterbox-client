var app = {
  server: 'http://127.0.0.1:3000/classes/messages',
  init: function () {
    console.log('app init');
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
  }
};
