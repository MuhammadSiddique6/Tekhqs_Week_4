const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const users = {};

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('register', (username) => {
    users[username] = socket.id;
    console.log(`${username} registered with socket ID: ${socket.id}`);
  });

  socket.on('private-message', ({ to,name, message }) => {
    const recipientSocketId = users[to];
    if (recipientSocketId) {
      io.to(recipientSocketId).emit('private-message', {
        from: socket.id,
         name,
        message,
      });
    } else {
      socket.emit('private-message', {
        from: 'Server',
        message: `User '${to}' not found.`,
      });
    }
  });

  socket.on('disconnect', () => {
    for (const username in users) {
      if (users[username] === socket.id) {
        delete users[username];
        console.log(`${username} disconnected`);
        break;
      }
    }
  });
});

server.listen(3000, () => {
  console.log('Server listening on http://localhost:3000');
});
