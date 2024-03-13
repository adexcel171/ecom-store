import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  return (
    <div className=" mx-2 px-3 p-3">
  <div className="relative">
    <img
      src={product.image}
      alt={product.name}
      className="w-[400px] h-[400px] rounded"
    />
    <HeartIcon product={product} />
  </div>

  <div className="p-4">
    <Link to={`/product/&#x20a6;{product._id}`}>
      <h2 className="flex justify-between items-center">
        <div>{product.name}</div>
        <span className="bg-teal-100 text-teal-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-teal-900 dark:text-teal-300">
          &#x20a6;{product.price}
        </span>
      </h2>
    </Link>
  </div>
</div>

  );
};

export default SmallProduct;
