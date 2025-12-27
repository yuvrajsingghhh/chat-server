const express = require("express");
const app = express();
const http = require("http").createServer(app);

const io = require("socket.io")(http, {
  cors: {
    origin: "*",   // GitHub Pages / ngrok allowed
    methods: ["GET", "POST"]
  }
});

// Serve UI
app.use(express.static("public"));

io.on("connection", socket => {
  console.log("User connected:", socket.id);

  // Message event
  socket.on("message", data => {
    socket.broadcast.emit("message", data);
  });

  // Seen event
  socket.on("seen", () => {
    socket.broadcast.emit("seen");
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

http.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
