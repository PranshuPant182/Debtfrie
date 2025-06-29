import React, { useState } from 'react';
import '../index.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import images from '../utils/images';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-22 w-full flex items-center px-4 md:px-12 relative" style={{
      fontFamily: 'gilroy',
      fontWeight: 400,
      fontSize: '18px',
      lineHeight: '100%',
      letterSpacing: '0%',
    }}>
      <div className="flex flex-row items-center justify-between w-full">
        {/* Logo */}
        <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
          <img src={images.Favicon} className='h-7 w-8' />
        </div>


        {/* Navigation Links - Hidden on mobile, visible on md and larger screens */}
        <div className="hidden md:flex flex-row items-center space-x-4 lg:space-x-15" style={{
          fontFamily: 'gilroy',
          fontWeight: 400,
          fontSize: '18px',
          lineHeight: '100%',
          letterSpacing: '0%',
          textAlign: 'right'
        }}>
          <Link to="/" className="cursor-pointer hover:text-gray-600">Home</Link>
          <Link to="/debtResolution" className="cursor-pointer hover:text-gray-600">Debt Resolution</Link>
          <Link to="/debtRestructuring" className="cursor-pointer hover:text-gray-600">Debt Restructuring</Link>
          {/* <Link to="/" className="cursor-pointer hover:text-gray-600">Resources</Link> */}
          <div
            className="relative group"
            onClick={() => setIsResourcesOpen(true)}
          // onMouseEnter={() => setIsResourcesOpen(true)}
          // onMouseLeave={() => setIsResourcesOpen(false)}
          >
            <div className="cursor-pointer hover:text-gray-600 flex items-center">
              Resources
              <svg
                className={`w-4 h-4 ml-1 transition-transform duration-200 ${isResourcesOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Dropdown Menu */}
            {isResourcesOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-50 py-2 text-sm text-black">
                {/* <Link to="/aboutUs" className="text-center block px-4 py-2 hover:bg-gray-100">About Us</Link> */}
                <Link to="/faqs" className="text-center block px-4 py-2 hover:bg-gray-100">FAQs</Link>
              </div>
            )}
          </div>

          <Link to="/aboutUs" className="cursor-pointer hover:text-gray-600">About Us</Link>
        </div>

        {/* Contact Button - Hidden on mobile, visible on md and larger screens */}
        <div className="hidden md:block">
          <button className="bg-blue-600 text-white text-[12px] px-3 py-2 rounded-2xl cursor-pointer" onClick={() => navigate("/contactus")}>
            CONTACT US
          </button>
        </div>

        {/* Hamburger Menu Icon - Visible only on mobile */}
        <button
          className="md:hidden flex flex-col space-y-1 p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className="block w-6 h-0.5 bg-black"></span>
          <span className="block w-6 h-0.5 bg-black"></span>
          <span className="block w-6 h-0.5 bg-black"></span>
        </button>
      </div>

      {/* Mobile Menu - Slides in from the right */}
      <div className={`md:hidden fixed top-0 right-0 h-full bg-white w-64 shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-6 flex flex-col h-full">
          {/* Logo */}
          <Link to="/" className="text-xl font-semibold mb-6">
            Logo
          </Link>

          {/* Divider */}
          <div className="border-t border-gray-200 mb-6"></div>

          {/* Menu items */}
          <div
            className="flex flex-col space-y-12 text-[16px] text-black"
            style={{ fontFamily: 'MyCustomFont', fontWeight: 400 }}
          >
            <Link to="/" className="cursor-pointer hover:text-gray-600">Home</Link>
            <Link to="/debtResolution" className="cursor-pointer hover:text-gray-600">Debt Resolution</Link>
            <Link to="/debtRestructuring" className="cursor-pointer hover:text-gray-600">Debt Restructuring</Link>
            <div
              onClick={() => setIsResourcesOpen(!isResourcesOpen)}
              className={`cursor-pointer flex justify-between items-center px-2 py-1 rounded-md transition-colors duration-200 ${isResourcesOpen ? "bg-blue-100 text-blue-700" : "hover:text-gray-600"
                }`}
            >
              <span>Resources</span>
              <svg
                className={`w-4 h-4 ml-2 transform transition-transform ${isResourcesOpen ? "rotate-180" : ""
                  }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {isResourcesOpen && (
              <div className="ml-4 flex flex-col space-y-4 text-[15px] text-gray-700 transition-all duration-200 ease-in-out">
                <Link to="/blog" className="cursor-pointer hover:text-gray-500">Blog</Link>
                <Link to="/faqs" className="cursor-pointer hover:text-gray-500">FAQs</Link>
                {/* <Link to="/" className="cursor-pointer hover:text-gray-500">Help Center</Link> */}
              </div>
            )}
            {/* <Link to="/aboutUs" className="cursor-pointer hover:text-gray-600">About Us</Link> */}
            <Link to="/contactus" className="cursor-pointer hover:text-gray-600">Contact Us</Link>
          </div>

          {/* Close button */}
          <button
            className="absolute top-4 right-4"
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>


      {/* Overlay when mobile menu is open */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMenu}
        />
      )}
    </div>
  );
}

export default Navbar;