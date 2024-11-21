import { useNavigate } from "react-router-dom"

export default function Home() {
  const navigate = useNavigate();
    const handleLogin = ()=>{
      navigate('/login');
    }
  return (
    <>
    <div>
        <h1>Home Page</h1>
        <h2>Banner's</h2>
        <button onClick={handleLogin} >Login</button>
    </div>
    </>
  )
}
