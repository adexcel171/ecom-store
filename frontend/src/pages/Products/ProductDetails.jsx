import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
  FaArrowLeft,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
  // ... (keep existing state and logic)
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link
            to="/"
            className="mb-6 inline-flex items-center text-purple-600 hover:text-purple-700 font-medium"
          >
            <FaArrowLeft className="mr-2" /> Back to Shop
          </Link>

          {/* Main Product Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-xl shadow-lg p-6">
            {/* Image Section */}
            <div className="relative group">
              <HeartIcon
                product={product}
                className="absolute top-4 right-4 z-10 text-red-500 hover:text-red-600"
              />
              <img
                src={product?.image}
                alt={product?.name}
                className="w-full h-96 object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Product Info Section */}
            <div className="flex flex-col space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold text-gray-900">
                  {product?.name}
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {product?.description}
                </p>
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                  ₦{product?.price?.toLocaleString()}
                </div>
              </div>

              {/* Product Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl">
                <div className="space-y-4">
                  <div className="flex items-center text-gray-700">
                    <FaStore className="w-5 h-5 text-purple-600 mr-3" />
                    <span className="font-medium">Brand:</span>
                    <span className="ml-2">{product?.brand}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <FaClock className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="font-medium">Added:</span>
                    <span className="ml-2">
                      {moment(product?.createAt).fromNow()}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <FaStar className="w-5 h-5 text-yellow-500 mr-3" />
                    <span className="font-medium">Reviews:</span>
                    <span className="ml-2">{product?.numReviews}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center text-gray-700">
                    <FaShoppingCart className="w-5 h-5 text-green-600 mr-3" />
                    <span className="font-medium">Available:</span>
                    <span className="ml-2">{product?.countInStock}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <FaBox className="w-5 h-5 text-orange-500 mr-3" />
                    <span className="font-medium">In Stock:</span>
                    <span className="ml-2">{product?.countInStock}</span>
                  </div>
                </div>
              </div>

              {/* Quantity Selector */}
              {product?.countInStock > 0 && (
                <div className="space-y-4">
                  <label className="block text-lg font-medium text-gray-700">
                    Quantity:
                  </label>
                  <select
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    className="w-[150px] p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  >
                    {[...Array(product?.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Add to Cart Button */}
              <button
                onClick={addToCartHandler}
                disabled={product?.countInStock === 0}
                className={`w-[200px] py-4 px-6 rounded-xl font-semibold text-lg transition-all ${
                  product?.countInStock === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white hover:shadow-lg"
                }`}
              >
                {product?.countInStock === 0 ? "Out of Stock" : "Add to Cart"}
              </button>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Product Reviews
              </h2>
              <Ratings
                value={product?.rating}
                text={`${product?.numReviews} reviews`}
                className="text-lg"
              />
            </div>

            <ProductTabs
              loadingProductReview={loadingProductReview}
              userInfo={userInfo}
              submitHandler={submitHandler}
              rating={rating}
              setRating={setRating}
              comment={comment}
              setComment={setComment}
              product={product}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
