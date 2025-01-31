import { Link } from "react-router-dom";
import { memo, useState } from "react";
import HeartIcon from "./HeartIcon";

// Base64 encoded tiny placeholder (1x1 pixel transparent PNG)
const PLACEHOLDER_IMAGE =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

const Product = memo(({ product }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="w-full max-w-[300px] p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Image Container with Aspect Ratio */}
      <div className="relative aspect-square">
        <img
          src={imageLoaded ? product.image : PLACEHOLDER_IMAGE}
          alt={product.name}
          loading="lazy"
          width={300}
          height={300}
          className={`w-full h-full object-cover rounded-t-lg transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
          style={{
            background: imageLoaded ? "transparent" : "#f3f4f6",
          }}
        />

        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse rounded-t-lg" />
        )}

        <HeartIcon product={product} />
      </div>

      {/* Product Details */}
      <div className="p-4">
        <Link
          to={`/product/${product._id}`}
          className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <h2 className="text-center space-y-2">
            <div className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300 line-clamp-2">
              {product.name}
            </div>
            <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              ₦ {product.price.toLocaleString()}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
});

Product.displayName = "Product"; // Add display name for React DevTools

export default Product;
