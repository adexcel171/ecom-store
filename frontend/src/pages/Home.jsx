import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";
import Footer from "../components/Footer";
import SkeletonLoader from ".././SkeletonLoader"; // Import SkeletonLoader

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <>
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <SkeletonLoader /> // Use SkeletonLoader
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <>
          <div className="flex flex-col text-center items-center justify-center md:flex-col md:justify-center p-4 md:p-8">
            <h1 className="text-3xl md:text-4xl text-center mt-4 md:mt-0">
              Special Products
            </h1>
            <Link
              to="/shop"
              className="bg-blue-600 text-white font-bold rounded-full py-2 text-center md:mt-4 px-6 md:px-10 mt-4"
            >
              Shop
            </Link>
          </div>

          <div className="flex flex-col items-center p-4 md:p-8">
            <div className="flex justify-center flex-wrap mt-4 md:mt-8">
              {data.products.map((product) => (
                <div key={product._id} className="m-2">
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>

          <Footer />
        </>
      )}
    </>
  );
};

export default Home;
