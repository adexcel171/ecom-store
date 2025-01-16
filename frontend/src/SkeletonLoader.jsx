import React from "react";

const SkeletonLoader = () => {
  // Generate 8 product cards for the skeleton
  const productCards = Array(8).fill(0);

  return (
    <div className="animate-pulse">
      {/* Header Section Skeleton */}
      <div className="w-full h-[400px] bg-gray-200" />

      {/* Special Products Section */}
      <div className="flex flex-col text-center items-center justify-center p-4 md:p-8">
        {/* Title Skeleton */}
        <div className="h-10 bg-gray-200 w-64 rounded-lg mb-4" />

        {/* Shop Button Skeleton */}
        <div className="h-10 bg-gray-200 w-32 rounded-full" />
      </div>

      {/* Products Grid */}
      <div className="flex flex-col items-center p-4 md:p-8">
        <div className="flex justify-center flex-wrap mt-4 md:mt-8 gap-4">
          {productCards.map((_, index) => (
            <div
              key={index}
              className="w-[280px] h-[400px] bg-white rounded-lg shadow-md overflow-hidden"
            >
              {/* Product Image Skeleton */}
              <div className="w-full h-[200px] bg-gray-200" />

              {/* Product Content */}
              <div className="p-4">
                {/* Product Title */}
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />

                {/* Product Description */}
                <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-4" />

                {/* Price and Rating */}
                <div className="flex justify-between items-center mt-4">
                  <div className="h-6 bg-gray-200 rounded w-20" />
                  <div className="h-6 bg-gray-200 rounded w-32" />
                </div>

                {/* Add to Cart Button */}
                <div className="h-10 bg-gray-200 rounded-full mt-4" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Skeleton */}
      <div className="w-full h-[200px] bg-gray-200 mt-8" />
    </div>
  );
};

export default SkeletonLoader;
