const { io } = require("socket.io-client");
const readline = require("readline");

const socket = io("http://localhost:3000");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

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

socket.on("private-message", ({ from,name, message }) => {
  console.log(`📨 Message from ${name}: ${message}`);
});
