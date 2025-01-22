import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 7000,
  };

  return (
    <div className="mb-4 w-[95%] mx-auto p-4 sm:p-6">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Slider {...settings} className="w-full">
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div key={_id} className="p-4">
                <div className="border-2 border-gray-200 rounded-xl overflow-hidden hover:border-blue-500 transition-all duration-300 hover:shadow-xl bg-white">
                  <div className="relative">
                    <img
                      src={image}
                      alt={name}
                      className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover object-center hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-4 sm:p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Product Info Section */}
                      <div className="lg:w-[60%] space-y-3">
                        <h2 className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
                          {name}
                        </h2>
                        <p className="text-xl font-bold text-blue-600">
                          ${price.toFixed(2)}
                        </p>
                        <p className="text-gray-600 text-sm lg:w-[90%] leading-relaxed">
                          {description.substring(0, 170)}...
                        </p>
                      </div>

                      {/* Details Section */}
                      <div className="lg:w-[40%] grid grid-cols-2 gap-4 pt-4 lg:pt-0">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
                            <FaStore className="text-blue-800" />
                            <span className="font-medium">{brand}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
                            <FaClock className="text-blue-800" />
                            <span>{moment(createdAt).fromNow()}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
                            <FaStar className="text-blue-800" />
                            <span>{numReviews} Reviews</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
                            <FaStar className="text-blue-800" />
                            <span>{Math.round(rating)} Rating</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
                            <FaShoppingCart className="text-blue-800" />
                            <span>{quantity} Items</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
                            <FaBox className="text-blue-800" />
                            <span>{countInStock} In Stock</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
