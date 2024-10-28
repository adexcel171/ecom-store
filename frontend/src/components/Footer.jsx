import React from "react";
import { FaFacebookMessenger, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-500 text-white mt-7 px-4">
      <div className="container mx-auto flex py-6 px-4 flex-col lg:flex-row justify-between items-start lg:items-center">
        <div className="mb-2 lg:mb-0">
          <h2 className="text-lg font-semibold mb-2">NEED HELP?</h2>
          <ul className="text-white">
            <li>
              <a href="#">Chat with us</a>
            </li>
            <li>
              <a href="#">Help Center</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
          </ul>
        </div>
        <div className="mb-4 lg:mb-0">
          <h2 className="text-lg font-semibold mb-2">USEFUL LINKS</h2>
          <ul className="text-white">
            <li>
              <a href="#">Service Center</a>
            </li>
            <li>
              <a href="#">How to shop on StoreX?</a>
            </li>
            <li>
              <a href="#">Delivery options and timelines</a>
            </li>

            <li>
              <a href="#">Corporate and bulk purchases</a>
            </li>
            <li>
              <a href="#">Report a Product</a>
            </li>
            <li>
              <a href="#">Dispute Resolution Policy</a>
            </li>
            <li>
              <a href="#">Returns & Refund Timeline</a>
            </li>
            <li>
              <a href="#">Return Policy</a>
            </li>
          </ul>
        </div>
        <hr />
        <div className="mb-4 lg:mb-0">
          <h2 className="text-lg font-semibold mb-2">ABOUT SHOP X</h2>
          <ul className="text-white">
            <li>
              <a href="#">About us</a>
            </li>
            <li>
              <a href="#">StoreX careers</a>
            </li>
            <li>
              <a href="#">StoreX Express</a>
            </li>
            <li>
              <a href="#">Terms and Conditions</a>
            </li>

            <li>
              <a href="#">StoreX Payment Information Guidelines</a>
            </li>
            <li>
              <a href="#">Cookie Notice</a>
            </li>

            <li>
              <a href="#">Tech Week 2024</a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">MAKE MONEY WITH StoreX</h2>
          <ul className="text-white">
            <li>
              <a href="#">Sell on StoreX</a>
            </li>
            <li>
              <a href="#">Vendor hub</a>
            </li>
            <li>
              <a href="#">Become a Sales Consultant</a>
            </li>
            <li>
              <a href="#">Become a Logistics Service Partner</a>
            </li>
            <li>
              <a href="#">Join the StoreX DA Academy</a>
            </li>
            <li>
              <a href="#">Join the StoreX KOL Program</a>
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <div className=" flex justify-between items-center pt-7 text-center mt-4 pb-4">
        <p className="text-white">
          © 2024 Your Ecommerce Website. All rights reserved.
        </p>
        <div className="flex justify-between items-center px-5">
          <FaInstagram className="mx-3 cursor-pointer" />
          <FaFacebookMessenger className="mx-3 cursor-pointer" />
          <FaWhatsapp className="mx-3  cursor-pointer" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
