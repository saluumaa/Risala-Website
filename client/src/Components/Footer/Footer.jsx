// import React from 'react'
// import './Footer.css'
// import Message from '../message/Message'
// import Chat from '../chat/Chat'
// import { useSelector } from 'react-redux'
// import { selectUser } from '../../redux/UsersSlice'

// const Footer = () => {
// 	const currentUser = useSelector(selectUser) || null;
//   return (
// 	<div className='footer-wrapper'>
//     <div className='footer'>
//       <div className='footer-logo'>
// 				<div>
// 				<img src='/logo_background.jpeg' alt='logo' />
// 				</div>
// 				<div>
// 				<p>
// 					Al-Risala Organization is a non-profit organization that focuses on education and social activities.
// 					it was established in 2017 and has been active in various fields such as education, social, and religion.
// 				</p>
// 				</div>
// 			</div>
// 			<div className='footer-links links'>
// 				<h2>WHO WE ARE</h2>
// 				<ul>
// 					<a href='/'><li>Home</li> </a>
// 					<a href='/about'><li>About Us</li></a>
// 					<a href='/news'><li>News</li></a>
// 				</ul>
// 			</div>
// 			<div className='footer-social links'>
// 				<h2>Follow Us</h2>
// 				<ul>
// 					<a href='https://www.facebook.com'><li>Facebook</li></a>
// 					<a href='youtube.com'><li>Youtube</li></a>
// 					<a href='https://www.instagram.com'><li>Instagram</li></a>
// 				</ul>
// 			</div>
// 			<div className='footer-contact links'>
// 				<h2>Contact Us</h2>
// 				<ul>
// 					<li>Phone: 08123456789</li>
// 					<li>Email:alrisala@gmail.com</li>
// 					<li>Address: Borama, Halane District </li>
// 				</ul>
// 			</div>

// 			{/* <div className='chat-box'>
// 				<Chat	/>
// 			</div> */}
// 		</div>

		
// 	 <div className='footer-credit'>
// 		<p>
// 			copyrigth &copy; 2021 Al-Risala Organization
// 		</p>
// 	</div>


// 	</div>
//   )
// }

// export default Footer

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
