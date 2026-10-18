import { useState } from 'react';
import './LikeButton.css';

const LikeButton = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLikeClick = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://www.greatfrontend.com/api/questions/like-button', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: isLiked ? 'unlike' : 'like',
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      setIsLiked(!isLiked);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="like-container">
      <button
        onClick={handleLikeClick}
        disabled={isLoading}
        className={`like-button ${isLiked ? 'liked' : ''}`}
        aria-pressed={isLiked}
      >
        {isLoading ? (
          <div className="spinner" />
        ) : (
          <svg viewBox="0 0 24 24" className="heart-icon">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        )}
        Like
      </button>

      {error && (
        <div className="error-message">{error}</div>
      )}
    </div>
  );
};

export default LikeButton;