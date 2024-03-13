import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="max-w-[25rem] mx-2 p-2 flex-col ">
  <div className="relative">
    <img
      src={product.image}
      alt={product.name}
      className="w-[300px] h-[300px] rounded"
    />
    <HeartIcon product={product} />
  </div>

  <div className="p-4">
    <Link to={`/product/&#x20a6;{product._id}`}>
      <h2 className="flex justify-between items-center sm:mx-3">
        <div className="text-lg  text-black">{product.name}</div>
        <span className="bg-teal-100 text-teal-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-teal-900 dark:text-teal-300">
          &#x20a6; {product.price}
        </span>
      </h2>
    </Link>
  </div>
</div>

  );
};

export default Product;
