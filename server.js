var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var people= {};

app.get('/', function(req, res){
	res.sendFile(__dirname+ '/index.html');

});

http.listen(8080, function(){
	console.log("Server running");
});

io.on('connection', function(socket){
	console.log("a user connected");

	socket.on('disconnect', function(){
		console.log("a user disconnected");
		io.emit('unjoin', people[socket.id]);
	});
	
	socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

	socket.on('notifyUser', function(user){
    io.emit('notifyUser', user);
  });

	socket.on('join', function(user){
	   people[socket.id] = user;
       io.emit('join', user);

	});
});




