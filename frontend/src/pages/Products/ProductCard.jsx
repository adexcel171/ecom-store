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
    <div className="w-full max-w-[350px] h-auto relative mt-5 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-gray-900 dark:border-gray-900">
      {/* Product Image Section */}
      <section className="relative">
        <Link to={`/product/${p._id}`}>
          <span className="absolute bottom-3 right-3 bg-green-500 text-white text-sm font-medium px-2.5 py-0.5 rounded-full">
            {p?.brand}
          </span>
          <div className="flex justify-center">
            <img
              className="cursor-pointer w-full h-[250px] sm:h-[300px] object-cover rounded-t-lg"
              src={p.image}
              alt={p.name}
            />
          </div>
        </Link>
        <HeartIcon product={p} />
      </section>

      {/* Product Details Section */}
      <div className="p-5">
        <div className="flex justify-between items-center">
          <h5 className="text-xl font-bold text-white">{p?.name}</h5>
          <p className="font-semibold text-green-400">
            {p?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "NGN",
              currencySymbol: "₦",
            })}
          </p>
        </div>

        {/* Product Description */}
        <p className="mt-2 mb-4 font-normal text-gray-300">
          {p?.description?.substring(0, 60)} ...
        </p>

        {/* Action Buttons */}
        <section className="flex justify-between items-center">
          <Link
            to={`/product/${p._id}`}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-500 transition-colors duration-300"
          >
            Read More
            <svg
              className="w-3.5 h-3.5 ml-2"
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
            className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
            onClick={() => addToCartHandler(p, 1)}
          >
            <AiOutlineShoppingCart className="text-white" size={24} />
          </button>
        </section>
      </div>
    </div>
  );
};

export default ProductCard;
