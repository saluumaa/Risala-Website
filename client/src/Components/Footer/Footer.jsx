import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
	<div className='footer-wrapper'>
    <div className='footer'>
      <div className='footer-logo'>
				<div>
				<img src='/logo_background.jpeg' alt='logo' />
				</div>
				<div>
				<p>
					Al-Risala Organization is a non-profit organization that focuses on education and social activities.
					it was established in 2017 and has been active in various fields such as education, social, and religion.
				</p>
				</div>
			</div>
			<div className='footer-links links'>
				<h2>WHO WE ARE</h2>
				<ul>
					<a href='/'><li>Home</li> </a>
					<a href='/about'><li>About Us</li></a>
					<a href='/news'><li>News</li></a>
				</ul>
			</div>
			<div className='footer-social links'>
				<h2>Follow Us</h2>
				<ul>
					<a href='https://www.facebook.com'><li>Facebook</li></a>
					<a href='youtube.com'><li>Youtube</li></a>
					<a href='https://www.instagram.com'><li>Instagram</li></a>
				</ul>
			</div>
			<div className='footer-contact links'>
				<h2>Contact Us</h2>
				<ul>
					<li>Phone: 08123456789</li>
					<li>Email:alrisala@gmail.com</li>
					<li>Address: Borama, Halane District </li>
				</ul>
			</div>
		</div>

	 <div className='footer-credit'>
		<p>
			copyrigth &copy; 2021 Al-Risala Organization
		</p>
	</div>


	</div>
  )
}

export default Footer