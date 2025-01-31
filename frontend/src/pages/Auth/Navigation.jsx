import React, { useState, useEffect } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import { FaHeart, FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
      if (dropdownOpen || isMobileMenuOpen) {
        setDropdownOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      {/* Desktop Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            <span>BIG X</span>
          </Link>

          {/* Main Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
            >
              <AiOutlineHome className="mr-1" />
              Home
            </Link>
            <Link
              to="/shop"
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
            >
              <AiOutlineShopping className="mr-1" />
              Shop
            </Link>
            <Link
              to="/favorite"
              className="flex items-center text-gray-600 hover:text-blue-600 relative"
            >
              <FavoritesCount />

              <FaHeart className="mr-1" />
            </Link>
            <Link
              to="/cart"
              className="flex items-center text-gray-600 hover:text-blue-600 relative"
            >
              <AiOutlineShoppingCart className="mr-1" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              )}
            </Link>
          </div>

          {/* User Section */}
          <div className="hidden md:flex items-center space-x-4">
            {userInfo ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <AiOutlineUser />
                  <span>{userInfo.username}</span>
                  <FaChevronDown className="text-sm mt-0.5" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border">
                    <div className="p-2 space-y-1">
                      {userInfo.isAdmin && (
                        <>
                          <Link
                            to="/admin/dashboard"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                          >
                            Dashboard
                          </Link>
                          <Link
                            to="/admin/productlist"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                          >
                            Products
                          </Link>
                          <Link
                            to="/admin/orderlist"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                          >
                            Orders
                          </Link>
                        </>
                      )}
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={logoutHandler}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            className="md:hidden p-2 text-gray-600 hover:text-blue-600"
          >
            {isMobileMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden fixed inset-0 bg-gray-900 z-40 transition-opacity ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div
          className={`absolute right-0 top-0 h-full w-64 bg-gray-800 transform transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Section */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xl font-bold text-white">BIG X</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-gray-400 hover:text-white"
              >
                <AiOutlineClose />
              </button>
            </div>
            {userInfo ? (
              <div className="flex items-center space-x-2 text-gray-400">
                <AiOutlineUser />
                <span className="text-black">{userInfo.username}</span>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="flex-1 text-center px-4 py-2 text-white hover:bg-gray-700 rounded-lg"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="flex-1 text-center px-4 py-2 text-white hover:bg-gray-700 rounded-lg"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-2 bg-gray-800">
            {" "}
            {/* Ensure this has a dark background */}
            <Link
              to="/"
              className="block p-2 text-white hover:bg-gray-700 rounded-lg"
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="block p-2 text-white hover:bg-gray-700 rounded-lg"
            >
              Shop
            </Link>
            <Link
              to="/favorite"
              className="block p-2 text-white hover:bg-gray-700 rounded-lg"
            >
              Favorites
            </Link>
            <Link
              to="/cart"
              className="block p-2 text-white hover:bg-gray-700 rounded-lg"
            >
              Cart ({cartItems.reduce((a, c) => a + c.qty, 0)})
            </Link>
            {userInfo?.isAdmin && (
              <div className="pt-4 border-t border-gray-700">
                <div className="text-sm text-gray-400 px-2 text-black py-1">
                  Admin
                </div>
                <Link
                  to="/admin/dashboard"
                  className="block p-2 text-white hover:bg-gray-700 rounded-lg"
                >
                  Dashboard
                </Link>
                <Link
                  to="/admin/productlist"
                  className="block p-2 text-white hover:bg-gray-700 rounded-lg"
                >
                  Products
                </Link>
                <Link
                  to="/admin/orderlist"
                  className="block p-2 text-white hover:bg-gray-700 rounded-lg"
                >
                  Orders
                </Link>
              </div>
            )}
            {userInfo && (
              <button
                onClick={logoutHandler}
                className="w-full text-left p-2 text-red-500 hover:bg-red-900 rounded-lg"
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
