import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';    

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigator = useNavigate();

    const collectData = async () => {
    console.warn(name, email, password);

    const res = await fetch("http://localhost:5000/register", {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const result = await res.json();  // ✅ parse JSON correctly
    console.warn(result);
    if(result) 
    {
          navigator('/');
    }


    localStorage.setItem("user-info", JSON.stringify(result)); // Save user info to localStorage
     
  };

  return ( 
    <div className="register">
      <h1>Register</h1>
      <input className="inputbox" type="text"
       placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
      
      <input className="inputbox" type="email"
       placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      
      <input className="inputbox" type="password"
       placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      
      <button onClick={collectData} className="signup-btn">Sign Up</button>
    </div>
  );
};

export default SignUp;

