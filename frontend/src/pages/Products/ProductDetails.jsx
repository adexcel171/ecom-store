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
          <div className="mt-10">
            <Link to="/" className="text-blue">
              Go Back
            </Link>
          </div>
          <div className="flex px-2 flex-wrap justify-center relative md:items-center mt-4 sm:mt-4 mx-4 md:mt-3 lg:mt-8 xl:mt-10 ml-0 sm:ml-2 md:ml-10">
            <div>
              <HeartIcon product={product} className="absoulte top-3" />

              <img
                src={product.image}
                alt={product.name}
                className="w-full  h-[300px] px-2 object-cover object-center md:rounded-md md:w-[400px] md:h-[300px] sm:w-full"
              />
            </div>

            <div className="flex px-3 flex-col justify-center items-center w-full sm:w-full md:w-full">
              <h2 className="text-2xl font-semibold">{product.name}</h2>
              <p className="my-4 text-center md:w-full text-black">
                {product.description}
              </p>

              <p className="text-5xl my-4 font-extrabold">
                ₦ {product.price.toLocaleString()}
              </p>

              <div className="flex items-center justify-between w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
                <div className="one">
                  <h1 className="flex items-center mb-3">
                    <FaStore className="mr-2 text-blue" /> Brand:{" "}
                    {product.brand}
                  </h1>
                  <h1 className="flex items-center mb-3">
                    <FaClock className="mr-2 text-blue" /> Added:{" "}
                    {moment(product.createAt).fromNow()}
                  </h1>
                  <h1 className="flex mt-3 items-center mb-3">
                    <FaStar className="mr-2 text-blue" /> Reviews:{" "}
                    {product.numReviews}
                  </h1>
                </div>

                <div className="">
                  <h1 className="flex items-center mb-3">
                    <FaStar className="mr-2 text-blue" /> Ratings: {rating}
                  </h1>
                  <h1 className="flex items-center mb-3">
                    <FaShoppingCart className="mr-2 text-blue" /> Quantity:{" "}
                    {product.quantity}
                  </h1>
                  <h1 className="flex items-center mb-3">
                    <FaBox className="mr-2 text-blue" /> In Stock:{" "}
                    {product.countInStock}
                  </h1>
                </div>
              </div>

              <div className="flex justify-between items-center flex-wrap">
                <Ratings
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />

                {product.countInStock > 0 && (
                  <div>
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className="p-2 w-[80px] rounded-lg text-black"
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="btn-container">
                <button
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                  className="bg-blue-600 text-white mt-5 py-2 px-4 rounded-lg md:mt-0"
                >
                  Add To Cart
                </button>
              </div>
            </div>

            <div className="mt-5 p-2 container flex flex-wrap items-center justify-center">
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
        </>
      )}
    </>
  );
};

export default ProductDetails;
