const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    content:String,
    username:String,
    roomId:String
},{ timestamps:true })

const Chat = mongoose.model('Chat',chatSchema);
module.exports = Chat;