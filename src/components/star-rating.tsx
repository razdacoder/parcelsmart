import React, { useState } from "react";

interface StarRatingProps {
  totalStars?: number;
  onRate?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ totalStars = 5, onRate }) => {
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  const handleClick = (starIndex: number) => {
    setRating(starIndex + 1);
    if (onRate) {
      onRate(starIndex + 1);
    }
  };

  const handleMouseEnter = (starIndex: number) => {
    setHoveredStar(starIndex);
  };

  const handleMouseLeave = () => {
    setHoveredStar(null);
  };

  return (
    <div className="flex">
      {Array.from({ length: totalStars }, (_, index) => (
        <svg
          key={index}
          className={`w-6 h-6 cursor-pointer ${
            hoveredStar !== null
              ? index <= hoveredStar
                ? "text-yellow-400"
                : "text-gray-300"
              : index < rating
              ? "text-yellow-400"
              : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 24 24"
          onClick={() => handleClick(index)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
};

export default StarRating;
