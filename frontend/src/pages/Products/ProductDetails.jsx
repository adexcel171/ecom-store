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
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
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
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Back Button */}
            <Link
              to="/"
              className="text-blue-600 hover:text-blue-700 mb-6 inline-block"
            >
              ← Go Back
            </Link>

            {/* Main Product Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
              {/* Image Section */}
              <div className="relative">
                <HeartIcon
                  product={product}
                  className="absolute top-4 right-4 z-10"
                />
                <img
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-[400px] object-cover rounded-lg shadow-lg"
                />
              </div>

              {/* Product Info Section */}
              <div className="flex flex-col space-y-6">
                <div className="space-y-4">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {product?.name}
                  </h1>
                  <p className="text-gray-600">{product?.description}</p>
                  <div className="text-4xl font-bold text-blue-600">
                    ₦ {product?.price?.toLocaleString()}
                  </div>
                </div>

                {/* Product Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <FaStore className="text-blue-600 mr-2" />
                      <span>Brand: {product?.brand}</span>
                    </div>
                    <div className="flex items-center">
                      <FaClock className="text-blue-600 mr-2" />
                      <span>Added: {moment(product?.createAt).fromNow()}</span>
                    </div>
                    <div className="flex items-center">
                      <FaStar className="text-blue-600 mr-2" />
                      <span>Reviews: {product?.numReviews}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center">
                      <FaStar className="text-blue-600 mr-2" />
                      <span>Rating: {rating}</span>
                    </div>
                    <div className="flex items-center">
                      <FaShoppingCart className="text-blue-600 mr-2" />
                      <span>Quantity: {product?.quantity}</span>
                    </div>
                    <div className="flex items-center">
                      <FaBox className="text-blue-600 mr-2" />
                      <span>In Stock: {product?.countInStock}</span>
                    </div>
                  </div>
                </div>

                {/* Ratings and Quantity Selector */}

                {product?.countInStock > 0 && (
                  <select
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    className="p-2 w-24 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  >
                    {[...Array(product?.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Add to Cart Button */}
              <div className="text-center ">
                <button
                  onClick={addToCartHandler}
                  disabled={product?.countInStock === 0}
                  className="w-[300px] h-[40px] px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {product?.countInStock === 0 ? "Out of Stock" : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-12">
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
            <div className=" flex-col hidden sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <Ratings
                value={product?.rating}
                text={`${product?.numReviews} reviews`}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
