const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// UI serve karo
app.use(express.static("public"));

// Socket.IO chat
io.on("connection", socket => {
  console.log("User connected:", socket.id);

  socket.on("message", msg => {
    console.log("Received:", msg);
    socket.broadcast.emit("message", msg);
  });
});

http.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});

