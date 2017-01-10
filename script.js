 var name;
    	var socket = io();

    $(function(){
    	name = prompt("Please enter your name", "Vishal Sharma");
    	if(name != ""){
        socket.emit("join", name);}
    });

    $('form').submit(function(){
        var s = $('#msg').val()
      	if(s!==""){
        	socket.emit('chat message',{'na':name,'msg': $('#msg').val()} );
        	$('#msg').val('');
        	return false;
      	}
      	else{
        return false;
      	}
    });

    socket.on('chat message', function(data){
        if(data.na===name){
        	$( "#chatMsg" ).append('<div class="arrow_right_chat">'+data.msg+'</div><br><br><br>');
      	}
      	else{
       	 	$( "#chatMsg" ).append('<div class="arrow_left_chat">'+data.msg+'</div><br><br><br>');
      	}  
    });

    socket.on('notifyUser', function(user){
        var me = name;
        if(user != me) {
            $('#notifyUser').text(user + ' is typing ...');
        }
        setTimeout(function(){ $('#notifyUser').text(''); }, 5000);;
    });

    socket.on('join', function(user){
        var me = name;
        if(user != me) {
            $('#update').text(user + ' joined ...');
        }

        if(user == me){
  	        $('#update').text(user + ' Welcome!!!');
        }
        setTimeout(function(){ $('#update').text(''); }, 5000);;
    }); 

    socket.on('unjoin', function(user){
        var me = name;
        if(user != me) {
        $('#update').text(user + ' left ...');
        } 
        setTimeout(function(){ $('#update').text(''); }, 5000);;
    }); 

    socket.on('userExists', function(data){
        alert(data);
        setTimeout(function(){location.reload();}, 1000);
    });

    function notifyTyping() { 
        var user = name;
        socket.emit('notifyUser', user);
    }

    $("textarea").keyup(function(){
        notifyTyping();
    });