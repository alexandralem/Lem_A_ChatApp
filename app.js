const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const port = process.env.PORT || 3000;

//app.get is a route handler
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/contact.html');
  });

server.listen(port, () => {
  console.log(`listening on ${port}`);
});