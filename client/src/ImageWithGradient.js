import React, { useState, useEffect } from 'react';

const ImageWithGradient = ({ imageUrl }) => {
  const [gradientStyle, setGradientStyle] = useState({});

  useEffect(() => {
    const image = new Image();
    image.src = imageUrl;

    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = image.width;
      canvas.height = image.height;

      ctx.drawImage(image, 0, 0, image.width, image.height);

      const imageData = ctx.getImageData(0, 0, image.width, image.height).data;

      const averageColor = calculateAverageColor(imageData);
      const gradient = `linear-gradient(to bottom right, rgba(${averageColor.join(',')}, 0.5), rgba(255, 255, 255, 0))`;

      setGradientStyle({ backgroundImage: gradient });
    };
  }, [imageUrl]);

  const calculateAverageColor = (imageData) => {
    let totalRed = 0;
    let totalGreen = 0;
    let totalBlue = 0;

    for (let i = 0; i < imageData.length; i += 4) {
      totalRed += imageData[i];
      totalGreen += imageData[i + 1];
      totalBlue += imageData[i + 2];
    }

    const numPixels = imageData.length / 4;

    return [
      Math.round(totalRed / numPixels),
      Math.round(totalGreen / numPixels),
      Math.round(totalBlue / numPixels),
    ];
  };

  return <div className="image-with-gradient" style={gradientStyle}></div>;
};

export default ImageWithGradient;
