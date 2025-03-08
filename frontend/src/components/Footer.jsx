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
    // Add newsletter subscription logic here
    setEmail("");
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Add contact form submission logic here
    setContactForm({ name: "", email: "", message: "" });
  };

  return (
    <footer className="bg-gray-900 text-gray-200">
      {/* Newsletter Section */}
      <div className="bg-purple-900/20 border-b border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Join Our Community
            </h3>
            <p className="text-gray-300 mb-6 text-sm sm:text-base">
              Stay updated with exclusive offers, new arrivals, and more!
            </p>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 text-sm sm:text-base"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-white mb-6">
              Get in Touch
            </h2>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <input
                type="text"
                value={contactForm.name}
                onChange={(e) =>
                  setContactForm({ ...contactForm, name: e.target.value })
                }
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 text-sm"
                required
              />
              <input
                type="email"
                value={contactForm.email}
                onChange={(e) =>
                  setContactForm({ ...contactForm, email: e.target.value })
                }
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 text-sm"
                required
              />
              <textarea
                value={contactForm.message}
                onChange={(e) =>
                  setContactForm({ ...contactForm, message: e.target.value })
                }
                placeholder="Your Message"
                rows="4"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 text-sm"
                required
              ></textarea>
              <button
                type="submit"
                className="px-6 py-3 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 text-sm"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-6">
              Quick Links
            </h2>
            <ul className="space-y-3">
              {[
                { to: "/support", label: "Customer Support" },
                { to: "/track-order", label: "Track Order" },
                { to: "/returns", label: "Returns & Exchanges" },
                { to: "/faq", label: "FAQ" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="flex items-center text-gray-300 hover:text-purple-400 transition-colors duration-200 group"
                  >
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2 group-hover:animate-pulse"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Section */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-6">
              About SHOPBUGIE
            </h2>
            <p className="text-gray-400 mb-4 text-sm">
              Elevating your shopping experience with curated style.
            </p>
            <ul className="space-y-3">
              {[
                { to: "/about", label: "Our Story" },
                { to: "/blog", label: "Blog" },
                { to: "/careers", label: "Careers" },
                { to: "/sustainability", label: "Sustainability" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-300 hover:text-purple-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-6">Connect</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-purple-400 mt-1" />
                <div>
                  <p className="font-medium text-gray-200">Headquarters</p>
                  <p className="text-gray-400 text-sm">123 Luxury Lane</p>
                  <p className="text-gray-400 text-sm">Tech City, TX 75001</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-purple-400" />
                <a
                  href="tel:+18888888888"
                  className="text-gray-300 hover:text-purple-400 transition-colors duration-200 text-sm"
                >
                  +1 (888) 888-8888
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-purple-400" />
                <a
                  href="mailto:hello@bigx.com"
                  className="text-gray-300 hover:text-purple-400 transition-colors duration-200 text-sm"
                >
                  hello@bigx.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} SHOPBUGIE. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {[
                { Icon: FaWhatsapp, to: "#" },
                { Icon: FaInstagram, to: "#" },
                { Icon: FaFacebookMessenger, to: "#" },
              ].map(({ Icon, to }, index) => (
                <Link
                  key={index}
                  to={to}
                  className="p-2 hover:bg-gray-800 rounded-full transition-all duration-200"
                >
                  <Icon className="text-xl text-gray-300 hover:text-purple-400" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
