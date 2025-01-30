import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Ratings = ({ value, text, color = "yellow-400", size = "text-lg" }) => {
  const fullStars = Math.floor(value);
  const hasHalfStar = value - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      {/* Full Stars */}
      {[...Array(fullStars)].map((_, index) => (
        <FaStar
          key={`full-${index}`}
          className={`${size} text-${color} transition-transform hover:scale-110`}
        />
      ))}

      {/* Half Star */}
      {hasHalfStar && (
        <FaStarHalfAlt
          className={`${size} text-${color} transition-transform hover:scale-110`}
        />
      )}

      {/* Empty Stars */}
      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar
          key={`empty-${index}`}
          className={`${size} text-${color} opacity-75 transition-transform hover:scale-110`}
        />
      ))}

      {/* Rating Text */}
      {text && (
        <span className={`ml-2 font-medium text-${color} ${size}`}>{text}</span>
      )}
    </div>
  );
};

export default Ratings;
