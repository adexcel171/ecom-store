import React, { useState, useEffect } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";
import "./Navigation.css";
import { FaShoppingCart } from "react-icons/fa";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMobileMenu = (e) => {
    e.stopPropagation();
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  useEffect(() => {
    const handleScroll = () => {
      if (dropdownOpen) {
        setDropdownOpen(false);
      }
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dropdownOpen, isMobileMenuOpen]);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{ zIndex: 9999 }}
      className="fixed top-0 w-full bg-gray-100 shadow-md"
    >
      {/* Desktop Navigation */}
      <div className="hidden xl:flex lg:flex md:flex justify-between items-center h-[75px] px-4">
        <div className="flex flex-row justify-center space-x-6 items-center">
          <Link to="/" className="flex items-center">
            <h1 className="flex items-center font-extrabold text-2xl text-blue-900">
              <FaShoppingCart className="mr-2" /> {/* Shop icon */}
              XCEL
            </h1>
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/shop" className="flex flex-col items-center text-black">
              <AiOutlineShopping size={25} />
              {/* <span className="text-sm">Shop</span> */}
            </Link>

            <Link
              to="/cart"
              className="flex flex-col items-center relative text-black"
            >
              <AiOutlineShoppingCart size={25} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 px-1 py-0 text-xs text-white bg-rose-600 rounded-full">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              )}
              {/* <span className="text-sm">Cart</span> */}
            </Link>

            <Link
              to="/favorite"
              className="flex flex-col items-center text-black"
            >
              <FaHeart className="flex" size={25} />
              <FavoritesCount />
              {/* <span className="text-sm">Favorite</span> */}
            </Link>
          </div>
        </div>

        <div className="flex items-center">
          {userInfo ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center text-gray-800 focus:outline-none"
              >
                <span className="text-black mr-2">{userInfo.username}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 ml-1 ${
                    dropdownOpen ? "transform rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="blue"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="4"
                    d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                  />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                  <ul className="py-1">
                    {userInfo.isAdmin && (
                      <>
                        <li>
                          <Link
                            to="/admin/dashboard"
                            className="block px-4 py-2 hover:bg-gray-100"
                            onClick={() => setDropdownOpen(false)}
                          >
                            Dashboard
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/productlist"
                            className="block px-4 py-2 hover:bg-gray-100"
                            onClick={() => setDropdownOpen(false)}
                          >
                            Products
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/categorylist"
                            className="block px-4 py-2 hover:bg-gray-100"
                            onClick={() => setDropdownOpen(false)}
                          >
                            Category
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/orderlist"
                            className="block px-4 py-2 hover:bg-gray-100"
                            onClick={() => setDropdownOpen(false)}
                          >
                            Orders
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/userlist"
                            className="block px-4 py-2 hover:bg-gray-100"
                            onClick={() => setDropdownOpen(false)}
                          >
                            Users
                          </Link>
                        </li>
                      </>
                    )}
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={logoutHandler}
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="flex items-center transition-transform transform hover:translate-x-1"
              >
                <AiOutlineLogin className="mr-2" size={18} />
              </Link>
              <Link
                to="/register"
                className="flex items-center transition-transform transform hover:translate-x-2"
              >
                <AiOutlineUserAdd className="mr-2" size={18} />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="xl:hidden lg:hidden md:hidden flex justify-between items-center h-[60px] px-4">
        {/* Logo */}
        <div className="flex justify-center items-center">
          <Link to="/" className="flex items-center">
            <h1 className="flex items-center font-extrabold text-2xl text-blue-900">
              <FaShoppingCart className="mr-2" /> {/* Shop icon */}
              XCEL
            </h1>
          </Link>
          <Link
            to="/shop"
            className="flex items-center mr-4  space-x-10 py-2 border-b"
          >
            <AiOutlineShopping className="mr-2" size={24} />
          </Link>

          <Link
            to="/cart"
            className="flex items-center space-x-10 py-2 border-b relative"
            // onClick={toggleMobileMenu}
          >
            <AiOutlineShoppingCart className="mr-2" size={24} />

            {cartItems.length > 0 && (
              <span className="absolute right-0 px-2 py-1 mb-7 text-xs text-white bg-rose-600 rounded-full">
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </span>
            )}
          </Link>
        </div>

        {/* Hamburger Menu */}
        <button
          onClick={toggleMobileMenu}
          className="focus:outline-none text-black"
        >
          {isMobileMenuOpen ? (
            <AiOutlineClose size={24} />
          ) : (
            <AiOutlineMenu size={24} />
          )}
        </button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div
              className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg transform translate-x-0 transition-transform duration-300 ease-in-out z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4">
                <div className="flex justify-end mb-4">
                  <button
                    onClick={toggleMobileMenu}
                    className="focus:outline-none text-black"
                  >
                    <AiOutlineClose size={24} />
                  </button>
                </div>

                {/* Mobile Menu Items */}
                <nav className="space-y-4">
                  {/* User-specific menu items */}
                  {userInfo ? (
                    <>
                      {userInfo.isAdmin && (
                        <>
                          <Link
                            to="/admin/dashboard"
                            className="block py-2 border-b"
                            onClick={toggleMobileMenu}
                          >
                            Dashboard
                          </Link>
                          <Link
                            to="/admin/productlist"
                            className="block py-2 border-b"
                            onClick={toggleMobileMenu}
                          >
                            Products
                          </Link>
                          <Link
                            to="/admin/categorylist"
                            className="block py-2 border-b"
                            onClick={toggleMobileMenu}
                          >
                            Category
                          </Link>
                          <Link
                            to="/admin/orderlist"
                            className="block py-2 border-b"
                            onClick={toggleMobileMenu}
                          >
                            Orders
                          </Link>
                          <Link
                            to="/admin/userlist"
                            className="block py-2 border-b"
                            onClick={toggleMobileMenu}
                          >
                            Users
                          </Link>
                        </>
                      )}
                      <Link
                        to="/profile"
                        className="block py-2 border-b"
                        onClick={toggleMobileMenu}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          logoutHandler();
                          toggleMobileMenu();
                        }}
                        className="block w-full py-2 text-left border-b"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="flex items-center py-2 border-b"
                        onClick={toggleMobileMenu}
                      >
                        <AiOutlineLogin className="mr-2" size={20} />
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="flex items-center py-2 border-b"
                        onClick={toggleMobileMenu}
                      >
                        <AiOutlineUserAdd className="mr-2" size={20} />
                        Register
                      </Link>
                    </>
                  )}
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;
