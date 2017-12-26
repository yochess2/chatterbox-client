var app = {
  init: function () {
    console.log('app init');
  },
  send: function(message) {
    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:3000/classes/messages',
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
};
