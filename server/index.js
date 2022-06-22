const path = require('path');
const http = require('http');
const express =  require('express');
const socket = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socket(server);

const user = {};

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', socket =>{
  socket.on('newUserJoined', Name =>{
    user[socket.id] = Name;
    socket.broadcast.emit('notification',`${Name} joined the chat`);
  });
  socket.on('msgSend', message =>{
    console.log('ms');
    socket.broadcast.emit('msgReceive',{message: message,Name:user[socket.id]});
  });
  socket.on('disconnect',()=>{
    io.emit('notification',`${user[socket.id]} left the chat`);
  })
    
  });


const PORT = process.env.port || 3000;

server.listen(PORT,'0.0.0.0', ()=> console.log(`Server is running in port  ${PORT}`));