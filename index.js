require("dotenv").config();
const http = require("http");
const express = require("express");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const socketIo = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials : true
  }
});

var corsOptions = {
    origin: "http://localhost:3000",
    credentials : true
  };
  
  app.use(cors(corsOptions));
  app.use(function (req, res, next) {	
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');   
    res.setHeader('Access-Control-Allow-Credentials', true);    
    next();
});


app.use(express.static('public'));

const port = process.env.PORT || 8001;

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//socket
let users = []
socketIo.use(async (socket, next) => {
  const token = socket.handshake.auth.userId;
  try {
    const user = socket.handshake.auth
    //console.log('user', user);
    // save the user data into socket object, to be used further
    socket.user = user;
    next();
  } catch (e) {
    console.log('error', e.message);
    return next(new Error(e.message));
  }
});

socketIo.on('connection', (socket) => {
   // join user's own room
   const userRoom = socket.user.userId
   socket.join(userRoom);
   //console.log("admin room ="+socket.user.userRole)
   if(socket.user.userRole === '1'){
    //console.log("admin room")
    socket.join('adminRoom');
   }
   //console.log(socket.user);
   socket.on('disconnect', () => {
     console.log('user disconnected');
   });
      //console.log(`⚡: ${socket.id} user just connected!`)  
      //console.log("my room"+ userRoom)

      socket.on("message", data => {
        // const outgoingMessage = {
        //   name: socket.user.name,
        //   id: socket.user.id,
        //   message:data,
        // };
        if(socket.user.userRole === '1'){
          socketIo.sockets.in([data.chatTo.userId, 'adminRoom']).emit("messageResponse", data)
         }else{
          socketIo.sockets.in([userRoom, 'adminRoom']).emit("messageResponse", data)
         }
        

            // send socket to all in room except sender
        //socketIo.to(userRoom).emit("messageResponse", outgoingMessage);
       // socketIo.emit("messageResponse", data)
      })

      socket.on("typing", data => (
        socket.broadcast.emit("typingResponse", data)
      ))

      socket.on("newUser", data => {
        users.push(data)
        socketIo.emit("newUserResponse", users)
      })
  
      socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
        users = users.filter(user => user.socketID !== socket.id)
        socketIo.emit("newUserResponse", users)
        socket.disconnect()
      });
  });

// parse requests of content-type - application/json
//app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
//app.use(express.urlencoded({ extended: true }));

// require("./app/routers/product.router")(app);
// require("./app/routers/color.router")(app);
// require("./app/routers/user.router")(app);
require("./app/routers/laptop.router")(app);

const profile = require('./app/routers/profile.router'); 
app.use('/api', profile);

const uploadRoutes = require('./app/routers/uploadFiles.router');
app.use('/api', uploadRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

server.listen(port);

console.log("RESTful API server started on: " + port);

