import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get('/api/images');
        setImages(res.data);
      } catch (err) {
        console.error("Error fetching images", err);
      }
    };
    fetchImages();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>Art Gallery</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
        padding: '20px'
      }}>
        {images.map((img) => (
          <div key={img._id} style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
            <img 
              src={img.imageUrl} 
              alt={img.title} 
              style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
            />
            <div style={{ padding: '10px', textAlign: 'center' }}>
              <p>{img.title || "Untitled"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;