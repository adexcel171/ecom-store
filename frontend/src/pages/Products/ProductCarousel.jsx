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
    <div className="mb-4 lg:w-full xl:w-full md:w-full sm:flex flex-col mx-4 w-[100%] overflow-x-hidden p-4">
  {isLoading ? null : error ? (
    <Message variant="danger">
      {error?.data?.message || error.error}
    </Message>
  ) : (
    <Slider {...settings} className="xl:w-[99%] lg:w-[100%] md:w-[100%] sm:w-[100%] sm:mx">
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
          <div key={_id} className="sm: mr-3 flex flex-col justify-center px-2">
            <img
              src={image}
              alt={name}
              className="w-full rounded-lg object-cover h-[27rem] sm:mr-3"
            />

            <div className="mt-4 flex flex-col lg:flex-row justify-between">
              <div className="lg:w-[60%]">
                <h2 className="text-xl font-bold  t mb-2">{name}</h2>
                <p className="text-lg font-bold   t mb-2">$ {price}</p>
                <p className="text-sm lg:w-[25rem]">{description.substring(0, 170)} ...</p>
              </div>

              <div className="lg:w-[35%] mt-4 lg:mt-0">
                <div className="flex flex-col lg:flex-row justify-between">
                  <div className="lg:w-[60%]">
                    <h1 className="flex items-center mb-2">
                      <FaStore className="mr-2  text-pink-800 t" /> Brand: {brand}
                    </h1>
                    <h1 className="flex items-center mb-2">
                      <FaClock className="mr-2  text-pink-800" /> Added: {moment(createdAt).fromNow()}
                    </h1>
                    <h1 className="flex items-center mb-2">
                      <FaStar className="mr-2  text-pink-800 t" /> Reviews: {numReviews}
                    </h1>
                  </div>

                  <div className="lg:w-[35%]">
                    <h1 className="flex items-center mb-2">
                      <FaStar className="mr-2  text-pink-800 t" /> Ratings: {Math.round(rating)}
                    </h1>
                    <h1 className="flex items-center mb-2">
                      <FaShoppingCart className="mr-2  text-pink-800 t" /> Quantity: {quantity}
                    </h1>
                    <h1 className="flex items-center mb-2">
                      <FaBox className="mr-2  text-pink-800 t" /> In Stock: {countInStock}
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
