const express = require("express");
const { createServer } = require("http");
const { Server } = require('socket.io');
const cookieParser = require('cookie-parser')

require('dotenv').config()
const cors =  require('cors')
const path = require("path");

const connectDb = require("./config/dbConnection");
const Chat = require("./models/chatSchema")


const port = process.env.PORT;
const app = express();
app.use(express.json())
app.use(cors());
app.use(cookieParser());

const server =  createServer(app)

const io = new Server(server,{
    cors:{
        origin:'http://localhost:5173',
    }
});


const users = {};
// socket implementation
io.on('connection',(socket)=>{
    console.log('a new user added',socket.id);
    

    socket.on('client_msg',async(data)=>{
        console.log("data sent by client ",data);
        await Chat.create(data)
        // sending data to all the users in same room
        io.to(data.roomId).emit('server_msg',data)
    })



    //chat request
    socket.on('send_request',({ sender, recipient })=>{
        console.log(`chat request from ${sender} to ${recipient}`);
        // sending request to recipient
        socket.broadcast.emit('chat_request', { sender })
        
    })
    socket.on('accept_request',({ roomId, sender })=>{
        console.log(`request accepted by consultant`);
        console.log(roomId);
        
        socket.join(roomId);
        socket.broadcast.emit('request_accepted',{roomId:roomId})
    })

    

    socket.on('disconnect',()=>{
        console.log('A user disconnected -->',socket.id);
        
    })
    
    
})


app.get('/chat/:roomId',async(req,res)=>{
    console.log(req.params.roomId," getting request from client  ");
    
    const chats = await Chat.find({ roomId:req.params.roomId })
    // console.log(chats);
    console.log(chats);
    
    res.status(200).json(chats)
})
const userRoutes = require('./routes/user.routes');
app.use('/api/v1',userRoutes);







server.listen(port,async()=>{
    console.log(`server started at ${port}`);
    await connectDb().then(()=>console.log('mongodb connect successfully')).catch(()=>console.log('failed to connect') )
})