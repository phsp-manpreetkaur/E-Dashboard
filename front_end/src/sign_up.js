
import './App.css';
import React,{useState} from 'react';   

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const collectData = async () => {
        console.warn(name, email, password);
    }
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
