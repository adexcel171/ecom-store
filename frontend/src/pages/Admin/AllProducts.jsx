import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";

const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  return (
    <>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row">
          <div className="p-3">
            <div className="ml-2 text-xl font-bold h-12">
              All Products ({products.length})
            </div>
            <div className="flex flex-col">
              {products.map((product) => (
                <Link
                  key={product._id}
                  to={`/admin/product/update/${product._id}`}
                  className="block mb-4 md:mb-8 overflow-hidden border rounded-lg"
                >
                  <div className="flex flex-col md:flex-row">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full md:w-48 h-auto object-cover"
                    />
                    <div className="p-4 flex flex-col justify-between">
                      <div>
                        <h5 className="text-xl font-semibold mb-2">
                          {product?.name}
                        </h5>
                        <p className="text-gray-400 text-xs mb-2">
                          {moment(product.createdAt).format("MMMM Do YYYY")}
                        </p>
                        <p className="text-gray-400 text-sm mb-2">
                          {product?.description?.substring(0, 160)}...
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <Link
                          to={`/admin/product/update/${product._id}`}
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Update Product
                          <svg
                            className="w-3.5 h-3.5 ml-2"
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
                        <p className="text-gray-800 font-semibold">
                          ${product?.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="md:w-1/4 p-3 mt-2">
            <AdminMenu />
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;
