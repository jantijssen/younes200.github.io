var express = require('express');
var server = express.createServer(express.logger());



server.configure(function(){
  var oneYear = 31557600000;
  server.use(express.static(__dirname + '/public', { maxAge: oneYear }));
  server.use(express.errorHandler());
});

var ejs = require('ejs');
server.set('view engine', 'ejs');
server.set('view options', { layout: false });
server.set('views', __dirname + '/views');

server.get('/', function(req, res){

	var mes = "<p>hello world!</p>";
	res.render('index.ejs', {locals:{mes:mes}});
});



var io = require('socket.io');
var _ = require('underscore')._;

io = io.listen(server);
io.configure(function(){
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
  io.set("close timeout", 10);
  io.set("log level", 1);
})

var users = {};

io.sockets.on('connection', function (socket) {
  var user;

  socket.emit('users-connected', _.values(users));

  socket.on('new-user', function (data) {
    user = data
    users[user.id] = data
    socket.broadcast.emit('user-connected', data);
  });

  socket.on('message', function(msgInfo){
    msgInfo.isFromMe = false;
    socket.broadcast.emit('receive-message', msgInfo);
  });

  socket.on('mousemove', function (data) {
    user.cursor = data
    socket.broadcast.emit('receive-mousemove', user);
  });
  
  socket.on('disconnect', function(){
    if(user){
      delete users[user.id];
      socket.broadcast.emit('user-disconnected', user);
    };
  })
  
  
});


//this line is necessary for heroku
var port = process.env.PORT || 3003;
server.listen(port);