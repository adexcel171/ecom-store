import { Link, useParams, useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import AOS from "aos";
import "aos/dist/aos.css";
import { useState, useEffect, useMemo, lazy, Suspense } from "react";
import ProductCarousel from "./Products/ProductCarousel";
import HeroSection from "../components/Hero";

// Lazy-loaded components
const Header = lazy(() => import("../components/Header"));
const Product = lazy(() => import("./Products/Product"));
const Footer = lazy(() => import("../components/Footer"));
const Shop = lazy(() => import("./Shop"));

const Home = () => {
  const { keyword } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  // Memoize products to prevent unnecessary re-renders
  const products = useMemo(() => data?.products || [], [data]);

  useEffect(() => {
    const initAOS = () => {
      if (window.innerWidth > 768) {
        AOS.init({
          duration: 500,
          once: true,
          easing: "ease-in-out",
        });
      }
    };

    // Delay AOS initialization until after initial render
    const timeoutId = setTimeout(initAOS, 500);
    return () => clearTimeout(timeoutId);
  }, []);

  // Optimized product render function
  const renderProducts = () => {
    if (products.length === 0) return <Message>No products found</Message>;

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 justify-center mt-4 md:mt-8">
        {products.map((product, index) => (
          <div
            key={product._id}
            className="m-2"
            {...(window.innerWidth > 768 && {
              "data-aos": "fade-up",
              "data-aos-delay": `${Math.min(index * 50, 600)}`,
            })}
          >
            <Suspense fallback={<div className="h-48 bg-gray-100 rounded" />}>
              <Product product={product} />
            </Suspense>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Suspense fallback={<div className="h-16 bg-gray-100" />}>
        {!keyword && <Header />}
      </Suspense>
      <HeroSection />
      <main className="flex-grow">
        <div className="flex flex-col items-center justify-center mt-[30px] w-full px-4 py-6"></div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 p-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="m-2">
                <div className="h-48 bg-gray-100 rounded animate-pulse" />
              </div>
            ))}
          </div>
        ) : isError ? (
          <Message variant="danger">
            {isError?.data.message || isError.error}
          </Message>
        ) : (
          <>
            <div className="flex flex-col text-center items-center justify-center p-4 md:p-8">
              {/* Title and Shop link remains same */}{" "}
              <h1 className=" text-center font-semibold text-2xl">
                Featured Products
              </h1>
            </div>

            <div className="flex flex-col items-center p-4 md:p-8">
              {renderProducts()}
            </div>
          </>
        )}
      </main>

      <Suspense fallback={<div className="h-32 bg-gray-100" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Home;
