import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [phoneNumber,setPhoneNumber] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(null);


  const handleLogin = ()=>{
    if(phoneNumber==''){
      setError('Please enter your phone number');
    }
    else{
      // API call to login
      console.log( phoneNumber);
      
    }
  }

  return (
    <>
    <div>
      <label htmlFor="phoneNumber">Enter Your PhoneNumber</label>
      <input type="text" 
      name="phoneNumber" 
      id="phoneNumber"
      value={phoneNumber}
      onChange={(e)=>setPhoneNumber(e.target.value)} 
      />
    </div>
    {error && <span className="text-red-500">PhoneNumber is required</span>}
    
    <div>
      <button onClick={handleLogin} >Login</button>
    </div>
    </>
  )
}
