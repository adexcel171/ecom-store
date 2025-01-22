import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";

const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold text-red-600">
          Error loading products
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 flex justify-center">
      <div className="container max-w-full mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          {/* Sidebar */}
          <div className="lg:w-64">
            <AdminMenu />
          </div>

          {/* Main Content */}
          <div className="lg:flex-1 max-w-4xl">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  All Products ({products.length})
                </h2>
              </div>

              <div className="space-y-6">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-48 h-48">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                        />
                      </div>

                      <div className="flex-1 p-6">
                        <div className="flex flex-col h-full justify-between">
                          <div>
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-2">
                              <h3 className="text-xl font-bold text-gray-800">
                                {product.name}
                              </h3>
                              <p className="text-2xl font-bold text-blue-600">
                                ₦{product.price.toLocaleString()}
                              </p>
                            </div>

                            <p className="text-sm text-gray-500 mb-2">
                              Added{" "}
                              {moment(product.createdAt).format("MMMM Do YYYY")}
                            </p>

                            <p className="text-gray-600 mb-4">
                              {product.description?.substring(0, 160)}
                              {product.description?.length > 160 && "..."}
                            </p>
                          </div>

                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <Link
                              to={`/admin/product/update/${product._id}`}
                              className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none transition-colors duration-200"
                            >
                              Update Product
                              <svg
                                className="w-4 h-4 ml-2"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 10"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M1 5h12m0 0L9 1m4 4L9 9"
                                />
                              </svg>
                            </Link>

                            <div className="w-full sm:w-auto flex justify-center">
                              <span className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-full">
                                Stock: {product.quantity}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
