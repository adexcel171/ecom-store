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
import ShopSkeleton from "../SkeletonLoader";
import AOS from "aos";
import "aos/dist/aos.css";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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
    if (!filteredProductsQuery.isLoading) {
      let filteredProducts = filteredProductsQuery.data;

      // Price filter
      if (priceFilter) {
        filteredProducts = filteredProducts.filter(
          (product) =>
            product.price.toString().includes(priceFilter) ||
            product.price === parseInt(priceFilter, 10)
        );
      }

      // Search by name filter
      if (searchTerm) {
        filteredProducts = filteredProducts.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      dispatch(setProducts(filteredProducts));
    }
  }, [
    checked,
    radio,
    filteredProductsQuery.data,
    dispatch,
    priceFilter,
    searchTerm,
  ]);

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
    <div className="mx-3 mt-[50px] flex flex-col lg:flex-row gap-6">
      {/* Filters Section (Sidebar on Desktop, Inline on Mobile) */}
      <div className="lg:w-1/4 bg-white lg:bg-gray-50 p-4 lg:p-6 rounded-lg shadow-md lg:shadow-lg">
        {/* Search by Name */}
        <div className="mb-4 lg:mb-6" data-aos="fade-right">
          <h2 className="text-sm font-semibold text-gray-800 mb-2 flex items-center">
            <span className="w-1 h-4 bg-purple-600 rounded-full mr-2"></span>
            Search by Name
          </h2>
          <input
            type="text"
            placeholder="Enter product name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white transition-all duration-200"
          />
        </div>

        {/* Categories Filter */}
        <div
          className="mb-4 lg:mb-6"
          data-aos="fade-right"
          data-aos-delay="100"
        >
          <h2 className="text-sm font-semibold text-gray-800 mb-2 flex items-center">
            <span className="w-1 h-4 bg-purple-600 rounded-full mr-2"></span>
            Categories
          </h2>
          <div className="grid grid-cols-2 gap-2 lg:space-y-2">
            {categories?.map((c) => (
              <div
                key={c._id}
                className="flex items-center bg-white lg:bg-gray-100 px-2 py-1 lg:px-3 lg:py-2 rounded-md shadow-sm hover:shadow-md transition-all duration-200"
              >
                <input
                  type="checkbox"
                  id={c._id}
                  onChange={(e) => handleCheck(e.target.checked, c._id)}
                  className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                />
                <label
                  htmlFor={c._id}
                  className="ml-2 text-xs lg:text-sm text-gray-600 hover:text-gray-900 cursor-pointer select-none truncate"
                >
                  {c.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Brands Filter */}
        <div
          className="mb-4 lg:mb-6"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          <h2 className="text-sm font-semibold text-gray-800 mb-2 flex items-center">
            <span className="w-1 h-4 bg-purple-600 rounded-full mr-2"></span>
            Brands
          </h2>
          <div className="grid grid-cols-2 gap-2 lg:space-y-2">
            {uniqueBrands?.map((brand) => (
              <div
                key={brand}
                className="flex items-center bg-white lg:bg-gray-100 px-2 py-1 lg:px-3 lg:py-2 rounded-md shadow-sm hover:shadow-md transition-all duration-200"
              >
                <input
                  type="radio"
                  id={brand}
                  name="brand"
                  onChange={() => handleBrandClick(brand)}
                  className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                />
                <label
                  htmlFor={brand}
                  className="ml-2 text-xs lg:text-sm text-gray-600 hover:text-gray-900 cursor-pointer select-none truncate"
                >
                  {brand}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Filter */}
        <div data-aos="fade-right" data-aos-delay="300">
          <h2 className="text-sm font-semibold text-gray-800 mb-2 flex items-center">
            <span className="w-1 h-4 bg-purple-600 rounded-full mr-2"></span>
            Price
          </h2>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Enter Price"
              value={priceFilter}
              onChange={handlePriceChange}
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white transition-all duration-200"
            />
            <button
              onClick={() => window.location.reload()}
              className="w-full px-3 py-2 text-sm text-gray-600 bg-white border rounded-lg hover:bg-purple-50 hover:text-purple-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="flex-1 p-3 mt-5 lg:mt-0" data-aos="fade-left">
        <h2 className="text-xl md:text-2xl font-semibold text-center mb-4 text-gray-900">
          {products?.length} Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.length === 0 ? (
            <div className="col-span-full text-center py-8">
              <Loader />
            </div>
          ) : (
            products?.map((p, index) => (
              <div
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
