import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";
import ShopSkeleton from "./../components/ShoShopSkeletonShopSkeletonpSkeleton";
import AOS from "aos";
import "aos/dist/aos.css";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) => {
            return (
              product.price.toString().includes(priceFilter) ||
              product.price === parseInt(priceFilter, 10)
            );
          }
        );

        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.5,
      },
    },
  };

  const childVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration: 0.5,
      },
    },
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  if (categoriesQuery.isLoading || filteredProductsQuery.isLoading) {
    return <ShopSkeleton />;
  }

  return (
    <div className="mx-3 mt-[50px]">
      {/* Filters Section */}
      <div
        className="w-full bg-white shadow-lg border-b mt-[70px] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
        data-aos="fade-down"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Categories Filter */}
            <div className="flex-1 bg-gray-50 p-4 rounded-lg transition-all duration-300 hover:bg-gray-100">
              <h2 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                <span className="w-1 h-4 bg-blue-500 rounded-full mr-2"></span>
                Categories
              </h2>
              <div className="flex flex-wrap gap-3">
                {categories?.map((c, index) => (
                  <div
                    key={c._id}
                    className="flex items-center bg-white px-3 py-2 rounded-md shadow-sm transition-all duration-200 hover:shadow-md"
                    data-aos="fade-up"
                    data-aos-delay={`${index * 50}`}
                  >
                    <input
                      type="checkbox"
                      id={c._id}
                      onChange={(e) => handleCheck(e.target.checked, c._id)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                    />
                    <label
                      htmlFor={c._id}
                      className="ml-2 text-sm text-gray-600 hover:text-gray-900 cursor-pointer select-none"
                    >
                      {c.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Brands Filter */}
            <div className="flex-1 bg-gray-50 p-4 rounded-lg transition-all duration-300 hover:bg-gray-100">
              <h2 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                <span className="w-1 h-4 bg-green-500 rounded-full mr-2"></span>
                Brands
              </h2>
              <div className="flex flex-wrap gap-3">
                {uniqueBrands?.map((brand) => (
                  <div
                    key={brand}
                    className="flex items-center bg-white px-3 py-2 rounded-md shadow-sm transition-all duration-200 hover:shadow-md"
                  >
                    <input
                      type="radio"
                      id={brand}
                      name="brand"
                      onChange={() => handleBrandClick(brand)}
                      className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200"
                    />
                    <label
                      htmlFor={brand}
                      className="ml-2 text-sm text-gray-600 hover:text-gray-900 cursor-pointer select-none"
                    >
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="flex-1 bg-gray-50 p-4 rounded-lg transition-all duration-300 hover:bg-gray-100">
              <h2 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                <span className="w-1 h-4 bg-purple-500 rounded-full mr-2"></span>
                Price
              </h2>
              <div className="flex flex-col sm:flex-row gap-3 items-center">
                <input
                  type="text"
                  placeholder="Enter Price"
                  value={priceFilter}
                  onChange={handlePriceChange}
                  className="w-full sm:w-[100px] px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white transition-all duration-200"
                />
                <button
                  onClick={() => window.location.reload()}
                  className="w-full sm:w-auto px-4 py-2 text-sm text-gray-600 bg-white border rounded-lg hover:bg-gray-50 hover:text-gray-900 active:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="p-3 mt-5" data-aos="fade-left">
        <h2 className="h4 text-center mb-2">{products?.length} Products</h2>
        <div className="flex justify-center flex-wrap gap-4">
          {products.length === 0 ? (
            <Loader />
          ) : (
            products?.map((p, index) => (
              <div
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-3"
                key={p._id}
                data-aos="fade-up"
                data-aos-delay={`${index * 100}`}
              >
                <ProductCard p={p} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
