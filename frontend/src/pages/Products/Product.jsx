import { Link } from "react-router-dom";
import { memo, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice"; // Adjust path
import HeartIcon from "./HeartIcon";

// Base64 placeholder (1x1 transparent PNG)
const PLACEHOLDER_IMAGE =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

const Product = memo(({ product }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  // Get the quantity of this product in the cart
  const cartItem = cartItems.find((item) => item._id === product._id);
  const quantityInCart = cartItem ? cartItem.qty : 0;

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: 1 })); // Add 1 item
  };

  return (
    <div className="w-full max-w-[350px] sm:max-w-[300px] md:max-w-[320px] lg:max-w-[340px] mx-auto bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Image Container */}
      <div className="relative aspect-square group">
        <img
          src={imageLoaded ? product.image : PLACEHOLDER_IMAGE}
          alt={product.name}
          loading="lazy"
          width-spaces={340}
          height={340}
          className={`w-full h-full object-cover rounded-t-xl transition-opacity duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          } group-hover:scale-105`}
          onLoad={() => setImageLoaded(true)}
          style={{
            background: imageLoaded ? "transparent" : "#f1f5f9",
          }}
        />

        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-t-xl" />
        )}

        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10">
          <HeartIcon product={product} />
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 sm:p-5 space-y-3 sm:space-y-4">
        <Link
          to={`/product/${product._id}`}
          className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
        >
          <h2 className="text-center space-y-2">
            <div className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 hover:text-purple-600 transition-colors duration-300 line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem]">
              {product.name}
            </div>
            <span className="inline-block bg-purple-100 text-purple-800 text-sm sm:text-base font-medium px-3 sm:px-4 py-1 sm:py-1.5 rounded-full">
              ₦ {product.price.toLocaleString()}
            </span>
          </h2>
        </Link>

        {/* Add to Cart Button with Counter */}
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={handleAddToCart}
            className="w-full bg-purple-600 text-white px-4 py-2 sm:px-6 sm:py-2.5 rounded-full font-semibold text-sm sm:text-base hover:bg-purple-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
            Add to Cart {quantityInCart > 0 && `(${quantityInCart})`}
          </button>
        </div>
      </div>
    </div>
  );
});

Product.displayName = "Product";

export default Product;
