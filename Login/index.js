import React, { useState } from 'react';
import './index.css'
import Project from '../Project';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [shwProject,setProjectStatus] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Add validation or API call here
    if (username === 'admin' && password === 'password') {
      alert('Login successful');
      setProjectStatus(true);
      // Redirect or handle successful login here
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <>
    {shwProject ? 
    <div className = "home-con">
        <Project />
    </div>
    :
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
    }</>
  );
}

export default Login;