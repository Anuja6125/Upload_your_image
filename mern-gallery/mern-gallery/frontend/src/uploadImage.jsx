import React, { useState } from 'react';
import axios from 'axios';

const UploadImage = ({ token }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select an image first!");

    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', title);

    try {
      setLoading(true);
      await axios.post('/api/images/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert("Image uploaded successfully!");
      setFile(null);
      setTitle('');
    } catch (err) {
      alert("Upload failed. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80vh', // Centers it vertically relative to the viewport
      padding: '20px'
    }}>
      <div style={{ 
        padding: '30px', 
        border: '1px solid #444', 
        borderRadius: '12px', 
        maxWidth: '450px', 
        width: '100%',
        backgroundColor: '#1e1e1e', // Matches your dark theme
        color: 'white',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
      }}>
        <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>Upload New Art</h3>
        <form onSubmit={handleUpload}>
          <div style={{ marginBottom: '15px' }}>
            <input 
              type="file" 
              onChange={(e) => setFile(e.target.files[0])} 
              style={{ width: '100%' }}
            />
          </div>
          <input 
            type="text" 
            placeholder="Image Title" 
            value={title}
            onChange={(e) => setTitle(e.target.value)} 
            style={{ 
              width: '100%', 
              padding: '12px', 
              marginBottom: '20px', 
              borderRadius: '6px',
              border: '1px solid #555',
              background: '#2d2d2d',
              color: 'white'
            }}
          /><br/>
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              width: '100%', 
              padding: '12px', 
              backgroundColor: '#007bff', 
              color: 'white', 
              border: 'none', 
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Uploading...' : 'Upload to Gallery'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadImage;