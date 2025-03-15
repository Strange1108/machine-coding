import { useState } from 'react';

const LikeButton = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
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

  // Determine button styles based on state
  const getButtonStyles = () => {
    if (isLiked) {
      return 'bg-[#f00] text-white border-[#f00]';
    }
    if (isLoading) {
      return isLiked ? 'bg-[#f00] text-white border-[#f00]' : 'bg-white text-[#888] border-[#888]';
    }
    if (isHovered) {
      return 'bg-white text-[#f00] border-[#f00]';
    }
    return 'bg-white text-[#888] border-[#888]';
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleLikeClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        disabled={isLoading}
        className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${getButtonStyles()}`}
      >
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-current rounded-full animate-spin border-t-transparent" />
        ) : (
          <svg
            viewBox="0 0 24 24" 
            className="w-4 h-4 fill-current"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        )}
        Like
      </button>
      
      {error && (
        <div className="text-[#f00] text-sm">{error}</div>
      )}
    </div>
  );
};

export default LikeButton;