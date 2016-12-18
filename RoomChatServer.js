var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Room = require('./RoomChatRoom.js');
var uuid = require('node-uuid');
var people= {};
var rooms = {};
users=[];


app.get('/', function(req, res){
	res.sendFile(__dirname+ '/RoomChatIndex.html');

});

http.listen(3000, function(){
	console.log("Server running");
});

io.on('connection', function(socket){
	console.log("a user connected");
	socket.emit('roomlist', rooms);

	 

	socket.on('disconnect', function(){
		console.log("a user disconnected");
		io.emit('unjoin', people[socket.id]);
		var user = people[socket.id];
        var index = users.indexOf(user.name);
        users.splice(index, 1);
		delete people[socket.id];
	});


	socket.on('chat message', function(msg){
	if(people[socket.id].room===null){
		socket.emit("roomjoinrequest", 'Please join/create a room to chat');
	}
	else{	
    io.in(socket.room).emit('chat message', msg);
    }
    });


	 socket.on('notifyUser', function(user){
	 if(people[socket.id].room!==null){
    io.in(socket.room).emit('notifyUser', user);
     }
    });



	socket.on('join', function(user){
		roomid = null;
	   if(users.indexOf(user) > -1){
      socket.emit('userExists', user + ' username is taken! Try some other username.');
    }
       else{
        users.push(user);
        people[socket.id] = { "name":user, "room":roomid }// add "name" : name, "room" : ro
        io.emit('join', user);
       }
	});



	socket.on("createRoom", function(name){
		if(people[socket.id].room===null){
			var id = uuid.v4();
			var room = new Room(name,id,socket.id);
			rooms[id] = room;
			socket.room = name;
			socket.join(socket.room);
			room.addPerson(socket.id);
			people[socket.id].room = id;
			console.log("room created", name);
			io.emit('roomlist', rooms);
			socket.emit("roomcreated", "room created");
		}

		else{
			socket.emit("roomupdate", "you have already created");
		}
	});




	socket.on("joinRoom", function(id) {  
        var room = rooms[id];
          room.addPerson(socket.id);
          people[socket.id].room = id;
          socket.room = room.name;
          socket.join(socket.room); //add person to the room
         var user = people[socket.id];
          io.in(socket.room).emit("roomupdate", user.name + " has connected to " + room.name + " room.");
          socket.emit("roomjoined", "Welcome to " + room.name + ".");
      });
 
});




