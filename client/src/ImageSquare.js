import React from 'react';

const ImageSquare = ({ imageUrl }) => {
  const containerStyle = {
    width: '400px',
    height: '400px',
    background: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '2px', // Optional: Add rounded corners
  };

  return <div style={containerStyle}></div>;
};

export default ImageSquare;
