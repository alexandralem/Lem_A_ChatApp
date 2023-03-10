//imports 
import ChatMsg from './components/ChatMessage.js';

const socket = io();

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const username = urlParams.get('username');


socket.emit('joinChat', {username});


//utility functions for socket
function setUserID( {sID} ) {
    //debugger;
    //save our unique id generated by Socket on the server side - this is how we track individual connections to the chat service
    vm.socketID = sID;
}

function handleUserTyping(user) {
  console.log(user.currentlytypinguser.name + ' is typing...');
}

function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('notification');
  div.innerHTML = `<div><p>
  ${message}</p></div>`;
  document.querySelector('#messages').appendChild(div);
  setTimeout(() => {
    div.style.visibility = "hidden";
  }, 3000);
}

function outputUsers(users) {
  document.querySelector('#users').innerHTML = users.map(user => `<li>${user}</li>`).join('');
  //userList.innerHTML = 
}

function showNewMessage( {message} ) {
    vm.messages.push(message);
}

const { createApp } = Vue;

  const vm = createApp({
    data() {
      return {
        socketID: '',
        message: '',
        messages: [],
        nickname: ''
      }
    },

    methods: {
        dispatchMessage() {
            socket.emit('chat_message', {
                content: this.message,
                name: username || 'anonymous',
                id: this.socketID
            });

            this.message = "";
        },

        catchTextFocus() {
          //emit a typing event and broadcast it to the server
          socket.emit('user_typing', {
            name: username || "anonymous"
          })
        }
    },

    components: {
        newmsg: ChatMsg
    }
  }).mount('#app')

  socket.addEventListener('connected', setUserID);
  socket.addEventListener('new_message', showNewMessage);
  socket.addEventListener('typing', handleUserTyping);

  socket.on('message', message => {
    outputMessage(message);
  });

  socket.on('allUsers', ({users}) => {
    console.log(users);
    outputUsers(users);
  });
  