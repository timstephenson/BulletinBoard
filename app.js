// Setup express
var express = require('express'),
    app = express();
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);
 
// Serve files from the public directory.
// Not really using express in this case.
app.configure(function() {
    app.use(express.static(__dirname + '/public'));
});
 
// Setup a port development.
server.listen(1337);

// Configure io callbacks.
io.sockets.on('connection', function(socket) {
    socket.on('createNote', function(data) {
        socket.broadcast.emit('onNoteCreated', data);
    });
 
    socket.on('updateNote', function(data) {
        socket.broadcast.emit('onNoteUpdated', data);
    });
 
    socket.on('deleteNote', function(data){
        socket.broadcast.emit('onNoteDeleted', data);
    });
 
    socket.on('moveNote', function(data){
        socket.broadcast.emit('onNoteMoved', data);
    });
});
