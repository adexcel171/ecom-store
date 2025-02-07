import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Featured products data
  const featuredProducts = [
    {
      id: 1,
      name: "Premium Headphones",
      description: "Wireless Noise Cancelling",
      price: "₦ 30,000",
      category: "Electronics",
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

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === featuredProducts.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === featuredProducts.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? featuredProducts.length - 1 : prev - 1
    );
  };

  return (
    <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      <h1 className="text-center text-2xl font-bold py-[50px]">
        Special Products
      </h1>
      {/* Main Hero Section */}
      <div className="relative h-[80vh] w-full">
        {/* Carousel */}
        <div className="h-full relative">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
              </div>

              {/* Content */}
              <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="h-full flex items-center">
                  <div className="max-w-xl space-y-8">
                    {/* Category Tag */}
                    <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                      {product.category}
                    </span>

                    {/* Product Details */}
                    <div className="space-y-4">
                      <h1 className="text-5xl sm:text-6xl font-bold text-white">
                        {product.name}
                      </h1>
                      <p className="text-xl text-gray-200">
                        {product.description}
                      </p>
                      <p className="text-3xl font-bold text-white">
                        {product.price}
                      </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-4">
                      <Link className=" z-50 cursor-pointer " to="/shop">
                        <button
                          type="button" // Ensures no form submission behavior if button is inside a form
                          className="bg-white z-50 w-[200px] text-black px-8 cursor-pointer py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-gray-300 transition-colors"
                        >
                          <ShoppingBag className="w-5 h-5" />
                          Shop Now
                        </button>
                      </Link>
                      <button className="border-2  w-[200px]  border-white cursor-pointer text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-white/80 hover:bg-white transition-colors transform hover:scale-105"
          >
            <ChevronLeft className=" hidden md:flex w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-white/80 hover:bg-white transition-colors transform hover:scale-105"
          >
            <ChevronRight className="w-6 hidden md:flex h-6" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {featuredProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-8 bg-white"
                  : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
