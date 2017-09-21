var app = require('./config/express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('io',io);

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
      });  
      
      socket.on('chat message', function(msg){
        io.emit('chat message', msg);
      }); 
  });
  
var port = process.env.PORT || 3000;

http.listen(port, function() {
    console.log("Servidor rodando com sucesso!");
});