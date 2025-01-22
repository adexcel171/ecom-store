import { Link, useParams, useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
// import Header from "../components/Header";
// import Product from "./Products/Product";
// import Footer from "../components/Footer";
import SkeletonLoader from ".././SkeletonLoader";
import { lazy, Suspense } from "react";
const Header = lazy(() => import("../components/Header"));
const Product = lazy(() => import("./Products/Product"));
const Footer = lazy(() => import("../components/Footer"));

import { Search } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useState, useEffect } from "react";
const ProductCarousel = lazy(() => import("./Products/ProductCarousel"));

const Home = () => {
  const { keyword } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(keyword || "");
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  useEffect(() => {
    // Only initialize AOS for screens larger than 768px (md breakpoint)
    if (window.innerWidth > 768) {
      AOS.init({
        duration: 500,
        once: true,
        easing: "ease-in-out",
        disable: "mobile", // Disable on mobile devices
      });
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    const trimmedSearchTerm = searchTerm.trim().toLowerCase();

    if (trimmedSearchTerm) {
      // Perform navigation to search results
      navigate(`/search/${trimmedSearchTerm}`);
    } else {
      // Default navigation when no search term is entered
      navigate("/all"); // Change "/" to "/all" or another route if appropriate
    }
  };

  return (
    <>
      <Suspense fallback={<SkeletonLoader />}>
        {!keyword ? <Header /> : null}
        {isLoading ? (
          <SkeletonLoader />
        ) : isError ? (
          <Message variant="danger">
            {isError?.data.message || isError.error}
          </Message>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center mt-[40px] w-full px-4 py-6">
              <form
                onSubmit={handleSearch}
                className="relative w-full max-w-xl mb-8"
                data-aos-mobile="false" // Disable AOS on mobile
                data-aos="fade-down"
              >
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700"
                >
                  Search
                </button>
              </form>
            </div>
            <h1 className="text-center text-2xl ">Featured Product</h1>
            <ProductCarousel />

            <div
              className="flex flex-col text-center items-center justify-center md:flex-col md:justify-center p-4 md:p-8"
              data-aos="fade-up"
              data-aos-mobile="false"
            >
              <h1 className="text-3xl md:text-4xl text-center mt-4 md:mt-6">
                {keyword
                  ? `Search Results for "${keyword}"`
                  : "Special Products"}
              </h1>
              <Link
                to="/shop"
                className="bg-blue-600 text-white font-bold rounded-full py-2 text-center md:mt-4 px-6 md:px-10 mt-4"
              >
                Shop
              </Link>
            </div>

            <div
              className="flex flex-col items-center p-4 md:p-8"
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-mobile="false"
            >
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 justify-center mt-4 md:mt-8">
                {data.products.length === 0 ? (
                  <Message>No products found</Message>
                ) : (
                  data.products.map((product, index) => (
                    <div
                      key={product._id}
                      className="m-2"
                      data-aos="fade-up"
                      data-aos-mobile="false"
                      data-aos-delay={
                        window.innerWidth > 768 ? `${200 + index * 100}` : "0"
                      }
                    >
                      <Product product={product} />
                    </div>
                  ))
                )}
              </div>
            </div>

            <Footer />
          </>
        )}
      </Suspense>
    </>
  );
};

export default Home;
