const express = require("express");
var http = require("http");
const app = express();
const port = process.env.PORT || 5000;
var server = http.createServer(app);
var io = require("socket.io")(server);
var clients = {};

//middlewre
app.use(express.json());

io.on("connection", (socket) => {
  console.log("connetetd");
  // console.log(socket.id, "has joined");
  socket.on("/test", (msg) => {
    console.log(msg.id);
    let user_id = msg.id;
    socket.user_id = user_id;
    console.log(socket.user_id, "has joined");
    clients[user_id] = socket;
  });
  socket.on("message", (e) => {
    let targetId = e.targetId;
    console.log(clients);
    // console.log(targetId);
    // console.log(e.message);

    if (clients[targetId]) {
      console.log(e.message);
      console.log(e.targetId);

      clients[targetId].emit("message", e);
    }
  });
});

server.listen(port, "0.0.0.0", () => {
  console.log("server started");
});
