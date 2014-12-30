// YOUR CODE HERE:

var app = {};

app.init = function(){
  this.server = 'https://api.parse.com/1/classes/chatterbox';
  this.fetch();
  setInterval(this.fetch, 1000);
};

app.addMessage = function(message){
  var addSlashes = function ( str ) {
    return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
  };
  //$('#chats').append('<span>'+message+'</span>');
  var singleMessage = document.createElement('div');
  $(singleMessage).addClass('message');
  var text = document.createElement('span');
  $(text).addClass('text');
  text.innerText = addSlashes(message.text);
  var user = document.createElement('span');
  $(user).addClass('user');
  user.innerText = addSlashes(message.username);
  var roomName = document.createElement('span');
  $(roomName).addClass('roomname');
  roomName.innerText = addSlashes(message.roomname);
  $(singleMessage).append(roomName, user, text);
  $('#chats').append(singleMessage);
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
    // data: 'createdAt'
    contentType: 'application/json',
    data: {
      order: '-createdAt',
      limit: 100,
    },
    success: function (data) {
      var allMessages = data.results;
      app.clearMessages();
      for (var i = 0; i < allMessages.length; i++) {
        if (allMessages[i].username === undefined || allMessages[i].text === undefined) {continue};
        app.addMessage(allMessages[i]);
      }
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


app.addRoom = function(room){
  $('#roomSelect').append('<span>'+room+'</span>');
};

app.addFriend = function(){

};

app.handleSubmit = function(){
  var username = document.URL.split('=').pop();
  var text = $('.message').val();
  var message = {
    'username': username,
    'text': text,
    'roomname': '4chan'
  };
  app.send(message);
  $('.message').val('');
};

$(function() {
  $('.submit').on('click',app.handleSubmit);
});
app.init();













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
