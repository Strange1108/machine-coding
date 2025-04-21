import React, { useState } from "react";

const StarRating = ({ totalStars = 5 }) => {
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedStar, setSelectedStar] = useState(0);

  const handleMouseEnter = (index) => {
    setHoveredStar(index);
  };

  const handleMouseLeave = () => {
    setHoveredStar(0);
  };

  const handleClick = (index) => {
    setSelectedStar(index);
  };

  return (
    <div className="flex items-center gap-2">
      {[...Array(totalStars)].map((_, i) => {
        const index = i + 1;
        const isFilled = hoveredStar >= index || selectedStar >= index;

        return (
          <span
            key={index}
            className={`text-4xl cursor-pointer transition-colors ${
              isFilled ? "text-yellow-400" : "text-gray-300"
            }`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(index)}
          >
            ★
          </span>
        );
      })}
      {selectedStar > 0 && (
        <span className="ml-4 text-lg text-blue-500">
          You rated: {selectedStar} / {totalStars}
        </span>
      )}
    </div>
  );
};

export default function App() {
  return (
    <div className="flex flex-col items-center mt-5 min-h-screen bg-white">
      <h1 className="text-2xl font-semibold mb-4">Star Rating Component</h1>
      <StarRating totalStars={5} />
    </div>
  );
}
