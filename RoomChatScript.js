var name;
      var socket = io();


       $(function(){
        name = prompt("Please enter your name", "Vishal Sharma");
        if(name != ""){
        socket.emit("join", name);}
       });





       $('form').submit(function(){
        socket.emit('chat message',{'na':name,'msg': $('#m').val()} );
        $('#m').val('');
        return false;
      });





      socket.on('chat message', function(data){
        if(data.na===name){
          $( "#chatMsg" ).append('<div class="arrow_right_chat">'+data.msg+'</div><br><br><br>');
        }
        else{
          $( "#chatMsg" ).append('<div class="arrow_left_chat">'+data.msg+'</div><br><br><br>');
        }  
    });



      
      $("textarea").keyup(function(){
                           notifyTyping();
                     });




      function notifyTyping() { 
  var user = name;
  socket.emit('notifyUser', user);
}

      function createRoom(){
        var room = $('#roomx').val();
        $('#roomx').val('');
        socket.emit('createRoom', room);

      }

      function joinRoom(){
        
        var room = $('#roomx').val();
        $('#roomx').val('');
        socket.emit('joinRoom', room);
      }




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
    $('#update').text(user + ' joined the server ...');
  }
  setTimeout(function(){ $('#update').text(''); }, 5000);;
}); 




   socket.on('unjoin', function(user){
  var me = name;
  if((user.name != me)&&(user.name !=null)){
    $('#update').text(user.name + ' left the server ...');
  } 
  setTimeout(function(){ $('#update').text(''); }, 5000);;
}); 




  socket.on('userExists', function(data){
         alert(data);
  setTimeout(function(){location.reload();}, 1000);
  });



  socket.on('roomlist', function(data){
    document.getElementById("roomlist").innerHTML = Object.getOwnPropertyNames(data);
  });



    socket.on('roomcreated', function(data){
     $('#roomupdate').text(data);
     $('#create').prop("disabled", true);
     $('#join').prop("disabled", true);
  setTimeout(function(){ $('#roomupdate').text(''); }, 5000);;
    
}); 



    socket.on('roomjoined', function(data){
     $('#roomupdate').text(data);
     $('#create').prop("disabled", true);
     $('#join').prop("disabled", true);
  setTimeout(function(){ $('#roomupdate').text(''); }, 5000);;
}); 


    socket.on('roomupdate', function(data){
     $('#roomupdate').text(data);
  setTimeout(function(){ $('#roomupdate').text(''); }, 5000);;
}); 



socket.on('roomjoinrequest', function(data){
         alert(data);
  });    
