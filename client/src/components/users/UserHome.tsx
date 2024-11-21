import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";



export default function UserHome() {
  const [data,setData] = useState([]);
  let socket = useMemo(()=>io('http://localhost:3001'),[]);
  const [ roomId, setRoomId ] = useState([])
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchConsultant = async()=>{
      const res = await axios.get('http://localhost:3001/api/v1/get-all-consultant');
      const data = res.data;
      console.log(data);
      setData(data);
      
    }
    fetchConsultant();
    socket.on('request_accepted',({roomId})=>{
      console.log(roomId);
      setRoomId((prev)=>[ ...prev, roomId ])
    })
  },[roomId])
  const handleRequest = ( id, name )=>{
    socket.emit('send_request', { sender: 'user', recipient: name });
  }
  const handleChatNow = (roomId)=>{
    navigate(`/chat/${roomId}`)
  }
  return (
    <>
    <div>
        <h1>user Home Page</h1>
        <p>all consultant show here</p>
        <div>
          {data.map((res,index)=>(
            <div key={index}>
              <h2>{res.name}</h2>
              <button onClick={()=>handleRequest(res._id, res.name)} >Send Request</button>
            </div>
          ))}
        </div>
    </div>
    {/* after cosultant accept the request  */}
    {roomId.map(( id, index ) =>(
      <div key={index}>
        <h2>request accepted</h2>
        <button onClick={()=>handleChatNow(id)} >Chat Now</button>

      </div>
    ))}
    </>
  )
}
