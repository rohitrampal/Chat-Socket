import { io } from 'socket.io-client';
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";



export default function UsersRequests() {
    const [requests, setRequests] = useState([]);
    const navigate = useNavigate();
    const socket = useMemo(() => io('http://localhost:3001'), []);
    useEffect(()=>{
        socket.on('chat_request',(data)=>{
            setRequests((prev) => [...prev, data.sender]);
        })
        console.log(requests);
        
        
    },[requests])

    const acceptRequest = (sender) => {
        const roomId = `consultant-${sender}`; // Unique room ID
        // setConnectedRoom(roomId);
        
        // Notify the sender about the acceptance
        socket.emit('accept_request', { roomId, sender:sender });
        navigate(`/chat/${roomId}`)
      };
      

  return (
    
    <>
    <div>
        <h1>Users Requests</h1>
        <p>for particular consultant Request are shown here</p>
    </div>
    {/* Incoming Requests */}
    <div>
        <ul>
          {requests.map((req, index) => (
            <li key={index}>
              <h2>Incoming Chat Requests</h2>
              {req} wants to chat
              <button onClick={() => acceptRequest(req)}>Accept</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
