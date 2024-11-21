const express = require("express");
const { createServer } = require("http");
const { Server } = require('socket.io');

const port = process.env.PORT;
const app = express();


const server =  createServer(app)

const io = new Server(server,{
    cors:{
        origin:'http://localhost:5173',
    }
});

// socket implementation
io.on('connection',(socket)=>{
    console.log('a new user added',socket.id);
    socket.on('join_room',async({roomId})=>{
        console.log("room id data",roomId);
        // creating room on the basis of the sending roomId from the client 
        socket.join(roomId);        
    })

    socket.on('client_msg',async(data)=>{
        console.log("data sent by client ",data);
        await Chat.create(data)
        // sending data to all the users in same room
        io.to(data.roomId).emit('server_msg',data)
    })



    //chat request
    socket.on('send_request',({ sender,recipient, roomId })=>{
        console.log(`chat request from ${sender} to ${recipient}`);
        // sending request to recipient
        socket.broadcast.emit('chat_request', { sender , roomId })
        
    })
    socket.on('accept_request',({ roomId, sender })=>{
        console.log(`request accepted by ${sender}`);
        console.log(roomId);
        
        // socket.join(roomId);
        io.to(roomId).emit('request_accepted',roomId)
    })

    

    socket.on('disconnect',()=>{
        console.log('A user disconnected -->',socket.id);
        
    })
    
    
})