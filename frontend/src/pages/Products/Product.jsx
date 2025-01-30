import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="w-full  p-2 flex-col ">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-[300px] object-cover object-center h-[200px] rounded"
        />
        <HeartIcon product={product} />
      </div>

      <div className="p-4 w-full flex justify-center flex-col items-center">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-center flex-col items-center">
            <div className="text-center font-medium  text-black">
              {product.name}
            </div>
            <span className="bg-blue-100 text-black  font-medium  text-center  py-0.5 rounded dark:bg-gray-300 dark:text-black">
              ₦ {product.price.toLocaleString()}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Product;
