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
    <section className="relative bg-gradient-to-b from-gray-50 to-gray-100 py-8 sm:py-12 overflow-hidden">
      <h1 className="text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 tracking-tight">
        Exclusive Collections
      </h1>

      {/* Carousel Container */}
      <div className="relative max-w-full sm:max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto h-[80vh] sm:h-[70vh] md:h-[60vh] lg:h-[70vh] min-h-[400px] rounded-xl shadow-xl overflow-hidden bg-white">
        {featuredProducts.map((product, index) => (
          <div
            key={product.id}
            className={`absolute inset-0 w-full h-full flex flex-col md:flex-row transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? "opacity-100 transform scale-100"
                : "opacity-0 transform scale-95 pointer-events-none"
            }`}
          >
            {/* Image Section */}
            <div className="relative w-full md:w-1/2 h-1/2 md:h-full">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent"></div>
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-start p-4 sm:p-6 md:p-8 bg-white text-gray-900 space-y-3 sm:space-y-4">
              <span className="text-purple-600 uppercase tracking-wider text-xs sm:text-sm font-medium">
                {product.category}
              </span>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight">
                {product.name}
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 line-clamp-2">
                {product.description}
              </p>
              <p className="text-base sm:text-lg md:text-xl font-semibold text-purple-600">
                {product.price}
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full">
                <Link to="/shop" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto bg-purple-600 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-purple-700 transition-all duration-300 shadow-md text-xs sm:text-sm md:text-base">
                    <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" /> Shop Now
                  </button>
                </Link>
                <button className="w-full sm:w-auto border-2 border-purple-600 text-purple-600 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-semibold hover:bg-purple-600 hover:text-white transition-all duration-300 text-xs sm:text-sm md:text-base">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <div className="absolute inset-y-0 left-0 flex items-center px-2 sm:px-4">
          <button
            onClick={prevSlide}
            className="p-2 sm:p-3 bg-gray-700/50 text-white rounded-full hover:bg-gray-800 transition-all duration-300 focus:outline-none z-10"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 sm:px-4">
          <button
            onClick={nextSlide}
            className="p-2 sm:p-3 bg-gray-700/50 text-white rounded-full hover:bg-gray-800 transition-all duration-300 focus:outline-none z-10"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-3 z-10">
          {featuredProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-purple-600 w-4 sm:w-6"
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
