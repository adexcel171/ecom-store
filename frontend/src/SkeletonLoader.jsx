import React from 'react';

const SkeletonLoader = () => {
  return (
    <>
      <div className="flex flex-col text-center items-center justify-start md:flex-row md:justify-between p-4 md:p-8">
        <div className="w-48 h-8 bg-gray-300 rounded-md mt-4 md:mt-0 animate-pulse"></div>
        <div className="bg-teal-600 rounded-full py-2 px-6 md:px-10 mt-4 md:mt-0 w-24 h-8 animate-pulse"></div>
      </div>

      <div className="flex flex-col items-center p-4 md:p-8">
        <div className="flex justify-center flex-wrap mt-4 md:mt-8">
          {Array(8).fill().map((_, index) => (
            <div key={index} className="m-2">
              <div className="w-48 h-64 bg-gray-300 rounded-md animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SkeletonLoader;
