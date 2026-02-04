import React, { useState } from 'react';
import Login from './login';
import UploadImage from './uploadImage';
import Gallery from './gallery';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <div className="App">
      <nav style={{ padding: '10px', background: '#333', color: '#fff', display: 'flex', justifyContent: 'space-between' }}>
        <h1 style={{ margin: 0, fontSize: '1.2rem' }}>MERN Gallery</h1>
        <button onClick={() => setShowAdmin(!showAdmin)} style={{ cursor: 'pointer' }}>
          {showAdmin ? "Back to Gallery" : "Admin Login"}
        </button>
      </nav>

      {showAdmin ? (
        !token ? (
          <Login setToken={setToken} />
        ) : (
          <div style={{ textAlign: 'center' }}>
            <button onClick={() => { localStorage.removeItem('token'); setToken(''); }} style={{ marginTop: '20px' }}>Logout</button>
            <UploadImage token={token} />
          </div>
        )
      ) : (
        <Gallery />
      )}
    </div>
  );
}

export default App;