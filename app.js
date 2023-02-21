const express = require('express');
const app = express();

const http = require('http');

const { userJoin, getCurrentUser, userLeave, getUsers } = require('./utils/users');
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

app.get('/chat', (req, res) => {
  res.sendFile(__dirname + '/views/chat.html');
});


server.listen(port, () => {
  console.log(`listening on ${port}`);
});

// listen for incoming messages from anyone connected to the chat service
// and then see what the message is
// (socket)
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.emit('connected', {sID: socket.id, message: 'new connection'});

  socket.on('joinChat', ({username}) => {
    const user = userJoin(socket.id, username);
    if (user.username == null) {
      return;
    } else {
      socket.broadcast.emit('message', `${user.username} has joined the chat`);
    };

    io.emit('allUsers', {
      users: getUsers()
    });
    
  })
  // Broadcast when a user connects

 

  socket.on('disconnect', () => {
    const user = userLeave(socket.id);
    debugger;
    if (user.username == null) {
      return;
    } else if(user) {
      io.emit('message', `${user.username} has left the chat`);
      io.emit('allUsers', {
        users: getUsers()
      });
    }

    
    
  })


  socket.on('chat_message', function(msg) {
    console.log(msg);

    // step 2 - show everyone what was just sent through (send the message to everyone that is connected to the service)
    io.emit('new_message', {message: msg});
  })


  //listen for a typing event and broadcast it to all
  socket.on('user_typing', function(user){
    console.log(user);
    io.emit('typing', {currentlytypinguser: user })
  }) 
});