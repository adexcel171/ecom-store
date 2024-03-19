import React, { useState, useEffect } from "react";
import { AiOutlineHome, AiOutlineShopping, AiOutlineLogin, AiOutlineUserAdd, AiOutlineShoppingCart } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";
import "./Navigation.css";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();
  useEffect(() => {
    const handleScroll = () => {
      if (dropdownOpen) {
        setDropdownOpen(false);
      }
    };
  
    const handleTouch = () => {
      if (dropdownOpen) {
        setDropdownOpen(false);
      }
    };
  
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("touchstart", handleTouch);
  
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchstart", handleTouch);
    };
  }, [dropdownOpen]);
  

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const closeSidebar = () => {
      setShowSidebar(false);
    };

    document.body.addEventListener("click", closeSidebar);

    return () => {
      document.body.removeEventListener("click", closeSidebar);
    };
  }, []);

  return (
    <div
      style={{ zIndex: 9999 }}
      className={`${
        showSidebar ? "hidden" : "flex"
      } xl:flex lg:flex md:hidden sm:hidden flex-row justify-between shadow-md ring-1 ring-teal-300 ring-offset-2 ring-offset-white p-4 text-white bg-teal-500 w-full h-[50px] fixed top-0`}
    >
      <div className="flex flex-row justify-center space-x-4 mb-[20px]">
        <Link to='/' className="flex items-center transition-transform transform hover:translate-x-2">
          <AiOutlineHome className="mr-2 mt-[10px] mb-[3px]" size={20} />
        </Link>
        <Link to="/shop" className="flex items-center transition-transform transform hover:translate-x-2">
          <AiOutlineShopping className="mr-2 mt-[10px] mb-[3px]" size={20} />
        </Link>
        <Link to="/cart" className="flex relative">
          <div className="flex items-center transition-transform transform hover:translate-x-2">
            <AiOutlineShoppingCart className="mb-[3px] mt-[10px] mr-2" size={20} />
          </div>
          <div className="absolute top-0">
            {cartItems.length > 0 && (
              <span>
                <span className="px-1 py-0 text-sm text-white bg-teal-500 rounded-full">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              </span>
            )}
          </div>
        </Link>
        <Link to="/favorite" className="flex relative">
          <div className="flex justify-center items-center top-0 transition-transform transform hover:translate-x-2">
            <FaHeart className="mb-[3px] mt-[10px] mr-2" size={20} />
            <FavoritesCount />
          </div>
        </Link>
      </div>

      <div className="">
        <button
          onClick={toggleDropdown}
          className="flex items-center text-gray-800 mb-[3px] focus:outline-none"
        >
          {userInfo ? (
            <span className="text-white mb-[6px] mr-2">{userInfo.username}</span>
          ) : (
            <></>
          )}
          {userInfo && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 mt-1 mb-3 w-4 ml-1 ${
                dropdownOpen ? "transform rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
                d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          )}
        </button>

        <ul
          className={`absolute right-0 top-8 mt-4 space-y-2 bg-white text-gray-600 ${
            dropdownOpen ? "" : "hidden"
          } transition-all duration-300`}
        >
          {userInfo && (
            <>
              {userInfo.isAdmin && (
                <>
                  <li>
                    <Link
                      to="/admin/dashboard"
                      className="block px-4 pt-3 py-2 hover:bg-gray-100"
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
                  className="block px-4 py-4 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={logoutHandler}
                  className="block w-full px-4 py-4 text-left hover:bg-gray-100"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>

        {!userInfo && (
          <ul className="flex justify-between items-center px-5">
            <li>
            <Link
                  to="/login"
                  className="flex flex-row align-center px-3 mb-[3px] justify-between transition-transform transform hover:translate-x-1"
                  onClick={() => setDropdownOpen(false)}
                >
                  <AiOutlineLogin className="mr-2" size={18} />
                  {/* <span className="text-">LOGIN</span> */}
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="flex items-center mb-[3px]  transition-transform transform hover:translate-x-2"
                  onClick={() => setDropdownOpen(false)}
                >
                  <AiOutlineUserAdd className=" mr-2" size={18} />
                  {/* <span className="text-red">REGISTER</span> */}
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    
  );
};

export default Navigation;

