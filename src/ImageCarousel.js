import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './ImageCarousel.css';

const ImageCarousel = () => {
  // Sample image URLs - in practice these would be passed as props
  const images = [
    "https://picsum.photos/id/600/600/400",
    "https://picsum.photos/id/100/600/400",
    "https://picsum.photos/id/200/600/400",
    "https://picsum.photos/id/300/600/400",
    "https://picsum.photos/id/400/600/400",
    "https://picsum.photos/id/500/600/400"
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="carousel-container">
      <div className="carousel">
        {/* Main image container */}
        <div className="carousel-slide">
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className="carousel-image"
          />
        </div>

        {/* Navigation buttons */}
        <button
          onClick={handlePrevious}
          className="carousel-btn carousel-btn-prev"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={handleNext}
          className="carousel-btn carousel-btn-next"
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </button>

        {/* Dot indicators */}
        <div className="carousel-dots">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`carousel-dot ${currentIndex === index ? 'active' : ''}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;