import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // ✅ read auth ONCE at render level
  const auth = localStorage.getItem("user");

  useEffect(() => {
    if (auth) {
      navigate('/');
    }
  }, [navigate, auth]); // ✅ valid now

  // ✅ stop rendering login if already logged in
  if (auth) {
    return null;
  }

  const handleLogin = async () => {
    let result = await fetch("http://localhost:5000/login", {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" }
    });

    result = await result.json();

    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));
      navigate('/');
    } else {
      alert("Please enter correct details");
    }
  };

  return (
    <div className="login"> 
      <h1>Login</h1>  

      <input
        type="text"
        className="inputbox"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="inputbox"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="login-btn" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
