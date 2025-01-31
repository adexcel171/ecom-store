import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// Import images
import headphonesImage from "../assets/bluetooth.png";
import smartwatchImage from "../assets/Smart Watch.png";
import sneakersImage from "../assets/designer.png"; // Fixed: Added .jpg extension
import speakerImage from "../assets/bluetooth.png";
import sunglassesImage from "../assets/sun.png"; // Fixed: Corrected typo
import leatherjacket from "../assets/jacket.png"; // Fixed: Corrected typo

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sample data for products
  const popularProducts = [
    {
      id: 1,
      name: "Wireless Headphones",
      image: headphonesImage, // Use imported image
    },
    {
      id: 2,
      name: "Leather Jacket",
      image: leatherjacket, // Ensure this file exists
    },
    {
      id: 3,
      name: "Smart Watch",
      image: smartwatchImage, // Use imported image
    },
  ];

  const productOfTheMonth = {
    id: 4,
    name: "Designer Sneakers",
    image: sneakersImage, // Use imported image
  };

  const featuredProducts = [
    {
      id: 5,
      name: "Bluetooth Speaker",
      image: speakerImage, // Use imported image
    },
    {
      id: 6,
      name: "Sunglasses",
      image: sunglassesImage, // Use imported image
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Grid Container */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Product of the Month (Left Section) */}
        <div className="md:col-span-5 lg:col-span-4 relative overflow-hidden rounded-xl shadow-lg group">
          <img
            src={productOfTheMonth.image}
            alt={productOfTheMonth.name}
            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end p-6">
            <h3 className="text-2xl font-bold text-white">
              {productOfTheMonth.name}
            </h3>
          </div>
        </div>

        {/* Popular Products Carousel (Middle Section) */}
        <div className="md:col-span-7 lg:col-span-8 relative rounded-xl shadow-lg overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-between z-10 px-4">
            <button
              onClick={() =>
                setCurrentSlide((prev) =>
                  prev === 0 ? popularProducts.length - 1 : prev - 1
                )
              }
              className="p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all"
            >
              <FiChevronLeft className="w-6 h-6 text-slate-800" />
            </button>
            <button
              onClick={() =>
                setCurrentSlide((prev) =>
                  prev === popularProducts.length - 1 ? 0 : prev + 1
                )
              }
              className="p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all"
            >
              <FiChevronRight className="w-6 h-6 text-slate-800" />
            </button>
          </div>
          <div className="relative h-full">
            {popularProducts.map((product, index) => (
              <div
                key={product.id}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end p-6">
                  <h3 className="text-2xl font-bold text-white">
                    {product.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Products (Bottom Section) */}
        <div className="md:col-span-12 lg:col-span-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="relative overflow-hidden rounded-xl shadow-lg group"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end p-6">
                <h3 className="text-xl font-bold text-white">{product.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
