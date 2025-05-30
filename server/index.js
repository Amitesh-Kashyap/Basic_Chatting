// const io = require(`socket.io`)(9001)

// import { createServer } from "http";
// import { Server } from "socket.io";
const { createServer } = require('http');
const { Server } = require('socket.io');


const httpServer = createServer();


const io = new Server(httpServer, {
  cors: {
      origin : "*",
    }
});

const users = {};

io.on('connection' , (socket)=>{
    
    socket.on('new-user-joining' , (name) =>{
        // console.log(socket.id);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined' , name);
        console.log(name +" joined the chat");
    });
    
    socket.on('send' , message =>{
        socket.broadcast.emit('receive' , {message : message , name : users[socket.id]});
    });

    socket.on('disconnect' , message=>{
        socket.broadcast.emit('left-chat' , users[socket.id]);
        delete users[socket.id];
    })
    
})

const PORT = process.env.PORT || 9001;
httpServer.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`);
})