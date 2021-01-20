const express = require("express");
var http = require("http");
const cors = require("cors");
const app = express();
app.set("port", process.env.PORT || 5000);
var server = http.createServer(app);
var io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

//middleawre
app.use(express.json());
app.use(cors());
io.on("Connection", (socket) => {
  console.log("connected");
});

server.listen(app.get("port"), () => {
  console.log("server is started");
});
