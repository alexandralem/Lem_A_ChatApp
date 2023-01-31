const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

const port = process.env.PORT || 3000;

//tell express where to find the static files that we use
app.use(express.static('public'));

//app.get is a route handler
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});



server.listen(port, () => {
  console.log(`listening on ${port}`);
});

// listen for incoming messages from anyone connected to the chat service
// and then see what the message is
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.emit('connected', {sID: socket.id, message: 'new connection'});
  socket.on('chat_message', function(msg) {
    console.log(msg);

    // step 2 - show everyone what was just sent through (send the message to everyone that is connected to the service)
    io.emit('new_message', {message: msg});
  })
});