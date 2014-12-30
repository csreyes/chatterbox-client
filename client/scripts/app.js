// YOUR CODE HERE:

var app = {};

app.init = function(){
  app.server = 'https://api.parse.com/1/classes/chatterbox';

};

app.send = function(message){
  $.ajax({
    // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

app.fetch = function(){
  $.ajax({
    // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Messages fetched');
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to fetch messages');
    }
  });
};


app.clearMessages = function(){
  $('#chats').empty();
};

app.addMessage = function(message){
  $('#chats').append('<span>'+message+'</span>');
};

app.addRoom = function(room){
  $('#roomSelect').append('<span>'+room+'</span>');
};

app.addFriend = function(){

};














/*
var messageIds={};

var getMessages = function(){

  var showMessage = function(message){
    var node=$('<div></div>');
    var user = '<span class=user>'+(message.username)+':  </span>';
    var message='<span class=message>'+(message.text)+'</span>';
    node.append(user);
    node.append(message);
    $('#messages').append(node);

  };



  $.ajax({
    // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      for(var i=0; i<data.results.length; i++){
        var messageId = data.results[i].objectId;
        if (!messageIds[messageId]) {
          showMessage(data.results[i]);
          messageIds[messageId] = messageId;
        }
      }
      console.log(data);
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

getMessages();

$(function() {
  $("#button").click( function() {
    getMessages();
  });
});

*/
