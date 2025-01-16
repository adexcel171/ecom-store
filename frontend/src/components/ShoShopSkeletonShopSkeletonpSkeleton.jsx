// components/ShopSkeleton.js
import React from "react";

const ShopSkeleton = () => {
  return (
    <div className="container mx-auto mt-20">
      <div className="flex mt-[70px] flex-col md:flex-row">
        <div className="bg-gray-400 text-white p-3 mt-4 mb-2 md:w-[25rem]">
          <div className="h-10 bg-black rounded-full mb-2 animate-pulse"></div>
          <div className="p-5">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="mb-2 h-6 w-full bg-gray-300 animate-pulse"
              ></div>
            ))}
          </div>
          <div className="h-10 bg-black rounded-full mb-2 animate-pulse"></div>
          <div className="p-5">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="mb-5 h-6 w-full bg-gray-300 animate-pulse"
              ></div>
            ))}
          </div>
          <div className="h-10 bg-black rounded-full mb-2 animate-pulse"></div>
          <div className="p-5">
            <div className="h-10 w-full bg-gray-300 animate-pulse"></div>
          </div>
          <div className="p-5 pt-0">
            <div className="h-10 w-full bg-gray-300 animate-pulse"></div>
          </div>
        </div>
        <div className="p-3 flex-1">
          <div className="h-10 bg-gray-300 rounded-full mb-2 animate-pulse"></div>
          <div className="flex flex-wrap">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="p-3 w-full md:w-1/2 lg:w-1/3">
                <div className="h-60 w-full bg-gray-300 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopSkeleton;
