import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredProducts = [
    {
      id: 1,
      name: "Premium Headphones",
      description: "Wireless Noise Cancelling",
      price: "₦ 30,000",
      category: "Gadgets",
      image:
        "https://images.unsplash.com/photo-1545127398-14699f92334b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      name: "Smart Watch Series X",
      description: "Next-Gen Fitness Tracking",
      price: "₦ 98,000",
      category: "Wearables",
      image:
        "https://images.unsplash.com/photo-1601136681597-76aeb3913224?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      name: "Designer Sneakers",
      description: "Limited Edition Collection",
      price: "₦ 40,000",
      category: "Footwear",
      image:
        "https://images.unsplash.com/photo-1562424995-2efe650421dd?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === featuredProducts.length - 1 ? 0 : prev + 1
      );
    }, 5000); // Auto-slide every 5s
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () =>
    setCurrentSlide((prev) =>
      prev === featuredProducts.length - 1 ? 0 : prev + 1
    );
  const prevSlide = () =>
    setCurrentSlide((prev) =>
      prev === 0 ? featuredProducts.length - 1 : prev - 1
    );

  return (
    <section className="relative bg-gradient-to-b from-white to-gray-100 py-8 md:py-12 overflow-hidden">
      <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 md:mb-8 tracking-tight">
        Exclusive Collections
      </h1>

      {/* Carousel Container */}
      <div className="relative max-w-full sm:max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto h-[70vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] min-h-[400px] max-h-[800px] rounded-xl shadow-xl overflow-hidden bg-white">
        {featuredProducts.map((product, index) => (
          <div
            key={product.id}
            className={`absolute inset-0 w-full h-full flex flex-col lg:flex-row transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? "opacity-100 transform scale-100"
                : "opacity-0 transform scale-95"
            }`}
          >
            {/* Image Section */}
            <div className="relative w-full lg:w-1/2 h-1/2 lg:h-full">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent"></div>
            </div>

            {/* Content Section */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-start px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 bg-white text-gray-900 space-y-4 sm:space-y-6">
              <span className="text-teal-600 uppercase tracking-widest text-xs sm:text-sm font-medium">
                {product.category}
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                {product.name}
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600">
                {product.description}
              </p>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-teal-600">
                {product.price}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                <Link to="/shop" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto bg-teal-600 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-teal-700 transition-all duration-300 shadow-md text-sm sm:text-base">
                    <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" /> Shop Now
                  </button>
                </Link>
                <button className="w-full sm:w-auto border-2 border-teal-600 text-teal-600 px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full font-semibold hover:bg-teal-600 hover:text-white transition-all duration-300 text-sm sm:text-base">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <div className="absolute inset-0 flex items-center justify-between px-2 sm:px-4 md:px-8">
          <button
            onClick={prevSlide}
            className="p-2 sm:p-3 bg-gray-700/50 text-white rounded-full hover:bg-gray-800 transition-all duration-300 focus:outline-none z-10"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 sm:p-3 bg-gray-700/50 text-white rounded-full hover:bg-gray-800 transition-all duration-300 focus:outline-none z-10"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-3 z-10">
          {featuredProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-teal-600 w-4 sm:w-6 md:w-8"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
