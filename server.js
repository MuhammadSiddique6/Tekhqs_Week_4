const express = require("express");
const app = express();
const {connection} =  require("./config/db");
const http = require('http');
const { Server } = require('socket.io');
require("dotenv").config();
const db = require("./models");
const Message = db.Message;
const Notifications = db.Notifications;
connection();
const PORT = process.env.PORT || 5000

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use("/api/auth",require("./routes/authentication"));
app.use("/api/forgetpassword",require("./routes//forgetpassword"));
app.use("/api/profile",require("./routes/proflie"));
app.use("/api/verify",require("./routes/verfication"));
app.use("/api/postjob",require("./routes/postjob"));
app.use("/api/offer",require("./routes/offer"));
app.use("/api/contract", require("./routes/contract"));

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

 socket.on('private-message', async ({ to, name, message }) => {
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

  try {
    const messageids = await Message.create({
      sender_id: name,
      receiver_id: to,
      content: message,
    });
    if(messageids){
        const message_id = messageids.id;
        await Notifications.create({
          message_id: message_id,
          offer_id: null, 
          job_id: null, 
        });
    }
    console.log(" Message saved to DB");
  } catch (error) {
    console.error(" Error saving message:", error.message);
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
server.listen(PORT,()=>
{
    console.log(`http://localhost:${PORT}`)
});