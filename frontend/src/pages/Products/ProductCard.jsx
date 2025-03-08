import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  return (
    <div className="w-full max-w-[280px] sm:max-w-[300px] md:max-w-[320px] lg:max-w-[340px] mx-auto bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Product Image Section */}
      <section className="relative aspect-square group">
        <Link to={`/product/${p._id}`}>
          <span className="absolute bottom-2 right-2 bg-purple-100 text-purple-800 text-xs sm:text-sm font-medium px-2 sm:px-3 py-0.5 rounded-full">
            {p?.brand}
          </span>
          <img
            className="w-full h-full object-cover rounded-t-xl transition-transform duration-500 group-hover:scale-105"
            src={p.image}
            alt={p.name}
          />
        </Link>
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10">
          <HeartIcon product={p} />
        </div>
      </section>

      {/* Product Details Section */}
      <div className="p-4 sm:p-5">
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <h5 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 line-clamp-1">
            {p?.name}
          </h5>
          <p className="font-semibold text-purple-600 text-sm sm:text-base md:text-lg">
            {p?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "NGN",
              currencySymbol: "₦",
            })}
          </p>
        </div>

        {/* Description (Mobile Only) */}
        <p className="md:hidden text-gray-600 text-sm sm:text-base line-clamp-2 mb-3 sm:mb-4">
          {p?.description?.substring(0, 60)} ...
        </p>

        {/* Action Buttons */}
        <section className="flex justify-between items-center gap-2">
          <Link
            to={`/product/${p._id}`}
            className="flex-1 inline-flex items-center justify-center px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white bg-purple-600 rounded-full hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-500 transition-all duration-300"
          >
            Read More
            <svg
              className="w-3 h-3 sm:w-3.5 sm:h-3.5 ml-1 sm:ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>

          {/* Add to Cart Button */}
          <button
            className="p-2 sm:p-3 rounded-full bg-purple-600 hover:bg-purple-700 transition-all duration-300"
            onClick={() => addToCartHandler(p, 1)}
          >
            <AiOutlineShoppingCart className="text-white w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </section>
      </div>
    </div>
  );
};

export default ProductCard;
