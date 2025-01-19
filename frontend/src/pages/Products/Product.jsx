import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="w-full mx-2 p-2 flex-col ">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-[200px] object-cover object-center h-[200px] rounded"
        />
        <HeartIcon product={product} />
      </div>

      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-center flex-col items-center sm:mx-3">
            <div className="text-lg  text-black">{product.name}</div>
            <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
              ₦ {product.price.toLocaleString()}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Product;
