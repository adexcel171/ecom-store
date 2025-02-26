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
    }, 5000);
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
    <div className="relative bg-gray-100 py-10">
      <h1 className="text-center text-3xl font-bold mb-6">Special Products</h1>
      <div className="relative flex items-center justify-center max-w-7xl mx-auto overflow-hidden h-[80vh] rounded-lg shadow-lg bg-white">
        {featuredProducts.map((product, index) => (
          <div
            key={product.id}
            className={`absolute inset-0 flex flex-col md:flex-row w-full h-full transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Image Section */}
            <div className="w-full md:w-1/2 h-full">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/2 flex flex-col justify-center px-8 space-y-6 bg-white">
              <span className="text-gray-600 uppercase tracking-wide text-sm font-semibold">
                {product.category}
              </span>
              <h1 className="text-4xl font-bold text-gray-900">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600">{product.description}</p>
              <p className="text-2xl font-bold text-gray-800">
                {product.price}
              </p>
              <div className="flex gap-4">
                <Link to="/shop">
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-blue-700 transition-colors">
                    <ShoppingBag className="w-5 h-5" /> Shop Now
                  </button>
                </Link>
                <button className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-100 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {/* <div className="absolute inset-0 flex items-center justify-between px-4">
        <button
          onClick={prevSlide}
          className="p-3 bg-gray-800/70 text-white rounded-full hover:bg-gray-900 transition"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="p-3 bg-gray-800/70 text-white rounded-full hover:bg-gray-900 transition"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div> */}

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
        {featuredProducts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "w-6 bg-blue-600"
                : "bg-gray-400 hover:bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
