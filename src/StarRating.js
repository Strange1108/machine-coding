import React, { useState } from 'react';

const Star = ({ filled, hovered, onClick, onMouseEnter, onMouseLeave }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-6 w-6 cursor-pointer transition-colors duration-200 ${
      filled || hovered ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
    }`}
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    />
  </svg>
);

const StarRating = ({ 
  maxStars = 5, 
  initialRating = 0,
  onChange = () => {},
  disabled = false
}) => {
  const [rating, setRating] = useState(initialRating);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleStarClick = (index) => {
    if (disabled) return;
    const newRating = index + 1;
    setRating(newRating);
    onChange(newRating);
  };

  const handleStarHover = (index) => {
    if (disabled) return;
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    if (disabled) return;
    setHoveredIndex(null);
  };

  return (
    <div 
      className="flex gap-1" 
      onMouseLeave={handleMouseLeave}
      role="radiogroup"
      aria-label="Star rating"
    >
      {[...Array(maxStars)].map((_, index) => (
        <Star
          key={index}
          filled={index < rating}
          hovered={hoveredIndex !== null && index <= hoveredIndex}
          onClick={() => handleStarClick(index)}
          onMouseEnter={() => handleStarHover(index)}
          onMouseLeave={handleMouseLeave}
        />
      ))}
      <span className="sr-only">Selected rating: {rating} out of {maxStars} stars</span>
    </div>
  );
};

// Example usage with multiple instances
const ExampleUsage = () => {
  const [rating1, setRating1] = useState(0);
  const [rating2, setRating2] = useState(3);

  return (
    <div className="p-4 space-y-4">
      <div>
        <h3 className="mb-2">Product Rating</h3>
        <StarRating
          maxStars={5}
          initialRating={rating1}
          onChange={setRating1}
        />
        <p className="mt-1">Selected rating: {rating1}</p>
      </div>

      <div>
        <h3 className="mb-2">Service Rating (starts with 3 stars)</h3>
        <StarRating
          maxStars={5}
          initialRating={rating2}
          onChange={setRating2}
        />
        <p className="mt-1">Selected rating: {rating2}</p>
      </div>

      <div>
        <h3 className="mb-2">Disabled Rating</h3>
        <StarRating
          maxStars={5}
          initialRating={4}
          disabled={true}
        />
      </div>
    </div>
  );
};

export default ExampleUsage;