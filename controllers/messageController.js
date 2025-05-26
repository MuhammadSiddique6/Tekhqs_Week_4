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

const { io } = require("socket.io-client");
const readline = require("readline");

const socket = io("http://localhost:3000");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
exports.Servers = async(req,res)=>{


// In-memory store of connected users
const users = {}; // { username: socket.id }

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
}



exports.clients = async(req,res)=>{


// Register user
rl.question("Enter your username: ", (username) => {
  socket.emit("register", username);
  console.log(`Logged in as ${username}`);
  const name=username;
  rl.setPrompt("Send (to:message): ");
  rl.prompt();

  rl.on("line", (line) => {
    const [to, ...msgParts] = line.split(":");
    const message = msgParts.join(":").trim();
    socket.emit("private-message", { to: to.trim(),name, message });
    rl.prompt();
  });
});

// Listen for private messages
socket.on("private-message", ({ name, message }) => {
  console.log(`📨 Message from ${name}: ${message}`);
});

}