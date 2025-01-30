import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="w-full max-w-[300px] p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Product Image Section */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[200px] sm:h-[250px] object-cover rounded-t-lg"
        />
        <HeartIcon product={product} />
      </div>

      {/* Product Details Section */}
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="text-center">
            <div className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300">
              {product.name}
            </div>
            <span className="mt-2 inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              ₦ {product.price.toLocaleString()}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Product;
