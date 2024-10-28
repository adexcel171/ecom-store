import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div className="mx-4 md:mx-8 pt-10 lg:mx-12 xl:mx-16">
      <h1 className="text-lg text-center font-bold mt-4 md:ml-4 lg:ml-6 xl:ml-8">
        FAVORITE PRODUCTS
      </h1>

      <div className="flex flex-wrap justify-center sm:justify-start mt-4 md:ml-4 lg:ml-6 xl:ml-8">
        {favorites.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
