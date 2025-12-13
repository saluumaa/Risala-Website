import React from 'react';
import { FaFacebook, FaYoutube, FaTiktok } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="bg-[#489EDE] text-bodyColor py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <img
              src="/logo_background.jpeg"
              alt="logo"
              className="h-12 w-auto mb-3 rounded-full"
            />
            <p className="text-bodyColor text-opacity-80">
              Empowering communities through sustainable development and education.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="hover:text-blue-800">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-blue-800">
                  Services
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-blue-800">
                  Projects
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-blue-800">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>Phone: 08123456789</li>
              <li>Email: alrisala@gmail.com</li>
              <li>Address: Borama, Halane District</li>
            </ul>
          </div>
          <div className="flex flex-col ">
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <ul className="flex gap-3">
              <a href="https://www.facebook.com">
                <FaFacebook className="h-6 w-6 text-bodyColor" />
              </a>
              <a href="https://www.youtube.com">
                <FaYoutube className="h-6 w-6 text-bodyColor" />
              </a>
              <a href="https://www.tiktok.com">
                <FaTiktok className="h-6 w-6 text-bodyColor" />
              </a>
            </ul>
          </div>
        </div>
        <div className="border-t mt-12 pt-8 text-center text-bodyColor text-opacity-80">
          <p>&copy; 2024 Alrisala.org. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
