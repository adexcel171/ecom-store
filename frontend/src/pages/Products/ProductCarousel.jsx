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
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mb-4 lg:block xl:block md:block p-4">
  {isLoading ? null : error ? (
    <Message variant="danger">
      {error?.data?.message || error.error}
    </Message>
  ) : (
    <Slider {...settings} className="xl:w-[99%] lg:w-[90%] md:w-[90%] sm:w-full sm:block">
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
            <img
              src={image}
              alt={name}
              className="w-full rounded-lg object-cover h-[30rem]"
            />

            <div className="mt-4 flex flex-col lg:flex-row justify-between">
              <div className="lg:w-[60%]">
                <h2 className="text-xl font-bold mb-2">{name}</h2>
                <p className="text-lg font-bold mb-2">$ {price}</p>
                <p className="text-sm lg:w-[25rem]">{description.substring(0, 170)} ...</p>
              </div>

              <div className="lg:w-[35%] mt-4 lg:mt-0">
                <div className="flex flex-col lg:flex-row justify-between">
                  <div className="lg:w-[60%]">
                    <h1 className="flex items-center mb-2">
                      <FaStore className="mr-2 text-white" /> Brand: {brand}
                    </h1>
                    <h1 className="flex items-center mb-2">
                      <FaClock className="mr-2 text-white" /> Added: {moment(createdAt).fromNow()}
                    </h1>
                    <h1 className="flex items-center mb-2">
                      <FaStar className="mr-2 text-white" /> Reviews: {numReviews}
                    </h1>
                  </div>

                  <div className="lg:w-[35%]">
                    <h1 className="flex items-center mb-2">
                      <FaStar className="mr-2 text-white" /> Ratings: {Math.round(rating)}
                    </h1>
                    <h1 className="flex items-center mb-2">
                      <FaShoppingCart className="mr-2 text-white" /> Quantity: {quantity}
                    </h1>
                    <h1 className="flex items-center mb-2">
                      <FaBox className="mr-2 text-white" /> In Stock: {countInStock}
                    </h1>
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
