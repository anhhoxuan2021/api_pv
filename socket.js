require("dotenv").config();
const http = require("http");
const express = require("express");


const app = express();
const server = http.createServer(app);

const socketIo = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials : true
  }
});

const port = process.env.PORT || 8001;

socketIo.on("connection", (socket) => {
  console.log("New client connected" + socket.id);

  socket.emit("getId", socket.id);

  socket.on("sendDataClient", function(data) {
    console.log(data)
    socketIo.emit("sendDataServer", { data });
  })

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

//server.listen(port);

// server.listen(3000, () => {
//     console.log('Server đang chay tren cong 3000');
// });