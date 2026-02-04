import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', { username, password });
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
      alert("Welcome back, Admin!");
    } catch (err) {
      alert("Login failed: Check your credentials.");
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',      // Full height of the screen
      width: '100vw'       // Full width of the screen
    }}>
      <div style={{
        padding: '40px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
        textAlign: 'center',
        background: '#fff'
      }}>
        <h2 style={{ color: '#333' }}>Admin Portal</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Username" 
            style={{ padding: '10px', marginBottom: '10px', width: '100%' }}
            onChange={e => setUsername(e.target.value)} 
          /><br/>
          <input 
            type="password" 
            placeholder="Password" 
            style={{ padding: '10px', marginBottom: '20px', width: '100%' }}
            onChange={e => setPassword(e.target.value)} 
          /><br/>
          <button type="submit" style={{ 
            padding: '10px 20px', 
            cursor: 'pointer',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px'
          }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;