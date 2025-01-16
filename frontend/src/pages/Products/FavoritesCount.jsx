import { useSelector } from "react-redux";

const FavoritesCount = () => {
  const favorites = useSelector((state) => state.favorites);
  const favoriteCount = favorites.length;

  return (
    <div className="absolute mb-8 top-6">
      {favoriteCount > 0 && (
        <span className="px-1 sm:flex py-0 mb text-sm text-white bg-red-600 rounded-full">
          {favoriteCount}
        </span>
      )}
    </div>
  );
};
[];

export default FavoritesCount;
