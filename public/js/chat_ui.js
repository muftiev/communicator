function divEscapedContentElement(messageObject) {
    var message = $('<div></div>')
        .append($('<span></span>').addClass("message-date").text(new Date(messageObject.created).toLocaleTimeString()))
        .append($('<span></span>').addClass("message-sender").text(messageObject.sender))        
        .append($('<span></span>').addClass("message-body").text(messageObject.bodyText));

  return message;
}


function processUserInput(chatApp, socket) {
  var message = $('#send-message').val(),
      chatDiv = document.getElementById("team-chat"),
      output = {
        sender: chatApp.selfName,
        created: new Date(),
        bodyText: message
      };        

  chatApp.sendMessage($('#room').text(), message);

  $('#messages').append(divEscapedContentElement(output));
  chatDiv.scrollTop = chatDiv.scrollHeight;

  $('#send-message').val('');
}

function sendAjax(period){
    $.ajax({
        url: "/previous",
        type: "POST",
        data: {perDays: period || null},
        dataType: "json",
        success: function(data, status, jqXhr){
            if(status === 'success'){
                var messagesDiv = $('#messages')
                    .empty().attr('for-days', period || '1');
                $.each(data, function(index, messObj){
                    messagesDiv.append(divEscapedContentElement(messObj));
                });
            }
        }
    });
}



$(document).ready(function() {
  var socket = io.connect(
      'http://team-communicator.herokuapp.com'
//      'http://localhost:5000'
  );
  var chatApp = new Chat(socket);

    socket.socket.on('error', function (reason){
        console.error('Unable to connect Socket.IO', reason);
        window.location.href = "/login";
    });
    socket.on('connect', function (sock){
        console.info('successfully established a working connection \o/');
    });
    socket.on('nameResult', function(result) {
        if (result.success) {
            chatApp.selfName = result.name;
        }
    });

    socket.on('joinResult', function(result) {
        ($('<li class="user-list-item">').attr('targ', result.addNew)
            .append('<a class="user-list-item-link" href=""><img class="user-list-item-img" src="img/User-icon.png">'+result.addNew+'</a></li>'))
            .appendTo($('#user-list'));
    });

    socket.on('message', function (message) {
        $('#messages').append(divEscapedContentElement(message));
        $('#in-sound')[0].play();
    });

    $('#send-message').focus();
    sendAjax();
    $('#send-form').submit(function() {
      processUserInput(chatApp, socket);
      return false;
    });
});
