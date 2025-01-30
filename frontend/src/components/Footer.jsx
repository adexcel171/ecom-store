import React, { useState } from "react";
import {
  FaFacebookMessenger,
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Add newsletter subscription logic
    setEmail("");
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Add contact form submission logic
    setContactForm({ name: "", email: "", message: "" });
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300">
      {/* Newsletter Section */}
      <div className="border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-6">
              <span className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                BiG X
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-4">
              Join Our Exclusive Community
            </h3>
            <p className="mb-6 text-gray-400">
              Get early access to sales, new arrivals, and special offers
            </p>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500"
                required
              />
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 rounded-xl font-medium transition-all transform hover:scale-105"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-6 text-white">Get in Touch</h2>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <input
                type="text"
                value={contactForm.name}
                onChange={(e) =>
                  setContactForm({ ...contactForm, name: e.target.value })
                }
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <input
                type="email"
                value={contactForm.email}
                onChange={(e) =>
                  setContactForm({ ...contactForm, email: e.target.value })
                }
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <textarea
                value={contactForm.message}
                onChange={(e) =>
                  setContactForm({ ...contactForm, message: e.target.value })
                }
                placeholder="Your Message"
                rows="4"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              ></textarea>
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 rounded-lg font-medium transition-all"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-bold mb-6 text-white">Quick Links</h2>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/support"
                  className="flex items-center hover:text-purple-400 transition-colors group"
                >
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 group-hover:animate-pulse"></span>
                  Customer Support
                </Link>
              </li>
              <li>
                <Link
                  to="/track-order"
                  className="flex items-center hover:text-purple-400 transition-colors group"
                >
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 group-hover:animate-pulse"></span>
                  Track Order
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="flex items-center hover:text-purple-400 transition-colors group"
                >
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 group-hover:animate-pulse"></span>
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="flex items-center hover:text-purple-400 transition-colors group"
                >
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 group-hover:animate-pulse"></span>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* About Section */}
          <div>
            <h2 className="text-xl font-bold mb-6 text-white">About BiG X</h2>
            <p className="text-gray-400 mb-4">
              Redefining online shopping with curated collections and
              exceptional service.
            </p>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="hover:text-purple-400 transition-colors"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="hover:text-purple-400 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="hover:text-purple-400 transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/sustainability"
                  className="hover:text-purple-400 transition-colors"
                >
                  Sustainability
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-xl font-bold mb-6 text-white">Connect</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-purple-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Headquarters</p>
                  <p className="text-gray-400">123 Luxury Lane</p>
                  <p className="text-gray-400">Tech City, TX 75001</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-purple-400" />
                <span className="hover:text-purple-400 transition-colors">
                  +1 (888) 888-8888
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-purple-400" />
                <span className="hover:text-purple-400 transition-colors">
                  hello@bigx.com
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center">
            <p className="text-gray-400">
              © 2024 BiG X. Crafted with ❤️ for exceptional shopping
            </p>
            <div className="flex items-center gap-4">
              <Link
                to="#"
                className="p-2 hover:bg-gray-800 rounded-full transition-colors"
              >
                <FaWhatsapp className="text-xl hover:text-purple-400" />
              </Link>
              <Link
                to="#"
                className="p-2 hover:bg-gray-800 rounded-full transition-colors"
              >
                <FaInstagram className="text-xl hover:text-purple-400" />
              </Link>
              <Link
                to="#"
                className="p-2 hover:bg-gray-800 rounded-full transition-colors"
              >
                <FaFacebookMessenger className="text-xl hover:text-purple-400" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
