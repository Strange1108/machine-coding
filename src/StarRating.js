import React, { useState } from "react";

function StarRating() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Star Rating</h1>
      <h3>by NamasteDev</h3>

      <div>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            style={{
              fontSize: "30px",
              cursor: "pointer",
              color: star <= (hover || rating) ? "gold" : "gray",
              transition: "color 0.2s",
            }}
          >
            ★
          </span>
        ))}
      </div>

      <p>Current Rating: {rating}</p>

      <button
        onClick={() => {
          setRating(0);
          setHover(0);
        }}
        style={{
          marginTop: "10px",
          padding: "8px 15px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Reset Rating
      </button>
    </div>
  );
}

export default StarRating;
