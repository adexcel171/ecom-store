import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1>ERROR</h1>;
  }

  return (
    <>
      <div className="flex flex-col md:flex-row justify-center p-3">
  <div className="w-full md:w lg:w-full md:w-full sm:w-full max-w-screen-md">
    <div className="grid grid-cols-1 md:grid-cols-1 gap-1">
    <div className="w-full mr-2">
    <ProductCarousel />
  </div>
      {/* {data.map((product) => (
        <div key={product._id} className="md:grid md:grid-cols-2 md:gap-1 md:p-2">
          <SmallProduct product={product} />
        </div>
      ))} */}
    </div>
  </div>
 
</div>


    </>
  );
};

export default Header;
