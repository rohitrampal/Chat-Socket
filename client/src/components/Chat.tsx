import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";


export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState();
    const socket = useMemo( ()=> io('http://localhost:3001') ,[] )
    const { roomId } = useParams();

    useEffect(() => {
        socket.emit('join_room', { roomId });
    
        const fetchMessages = async () => {
          try {
            const response = await axios.get(`http://localhost:3001/chat/${roomId}`);
            setMessages(response.data);
            console.log("msgs from server",messages);
            
          } catch (error) {
            console.error("Failed to fetch messages:", error);
          }
        };
        fetchMessages();
        
        socket.on('server_msg', (data) => {
          setMessages((prevMessages) => [...prevMessages, data]);
        });
    
        return () => {
          socket.off('chat_request');
          socket.off('request_accepted');
          socket.off('server_msg');
        };
      }, []);
      const sendMessage = () => {
    
        socket.emit('client_msg', {
          roomId:roomId ,
          username:'user',
          content: newMessage,
        });
        setNewMessage('');
    
      };

  return (
    <>
    <div>
        <input type="text"
        value={newMessage} 
        onChange={(e) => setNewMessage(e.target.value)} 
        />
        <button onClick={sendMessage}>Send</button>
    </div>
    {/*previous Chat Messages */}
    <div>
        <h2>Messages</h2>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>
              <strong>{msg.username}: </strong>
              {msg.content}
            </li>
          ))}
        </ul>
    </div>
    

    </>
  )
}
