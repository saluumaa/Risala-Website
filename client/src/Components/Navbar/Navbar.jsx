import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimesCircle } from 'react-icons/fa';
import DarkMode from '../DarkMode/DarkMode';
import './Navbar.css';

const Navbar = () => {
  const [menu, setMenu] = useState('home');
  const [isActive, setIsActive] = useState(false);
  const [isServicesDropdownVisible, setServicesDropdownVisible] = useState(false);
  const handleClick = () => {
    setIsActive(!isActive);
  };

  const handleLinkClick = () => {
    setIsActive(false); 
    setServicesDropdownVisible(false);
  };

  const toggleServicesDropdown = () => {
    setServicesDropdownVisible(!isServicesDropdownVisible);
  };

  const handleMouseEnter = () => {
    setServicesDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setServicesDropdownVisible(true);
  };


  return (
    <div>
      <nav className={isActive ? 'nav-active' : ''}>
        {/* <section className="top-nav-wrapper"> */}
        <section className='navbar-wrapper'>
          <div className='navbar-logo hidden-logo'>
            <img src='/logo_background.jpeg' alt='logo'  />
          </div>
        
        {/* </section> */}
        
          <ul className='navbar-links'>
            <li onClick={()=> {setMenu('home')}}>
              <Link style={{textDecoration: 'none'}} to="/" onClick={handleLinkClick}>Home</Link> {menu === 'home' ? <hr /> : <></>}
            </li>
            <li onClick={()=> {setMenu('about')}}>
              <Link style={{textDecoration: 'none'}} to="/about" onClick={handleLinkClick}>About Us</Link> {menu === 'about' ? <hr /> : <></>}
            </li>
          <li 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave} 
            onClick={toggleServicesDropdown}
          >
          <span className='services' style={{ textDecoration: 'none', cursor: 'pointer' }}>
            Services
          </span>
          {isServicesDropdownVisible && (
            <ul className="dropdown" style={{listStyle: 'none'}} >
              <li>
                <Link style={{ textDecoration: 'none' }} to="awareness" onClick={handleLinkClick}>
                  Health
                </Link>
              </li>
              <li>
                <Link style={{ textDecoration: 'none' }} to="education" onClick={handleLinkClick}>
                  Education
                </Link>
              </li>
              <li>
                <Link style={{ textDecoration: 'none' }} to="empowerment" onClick={handleLinkClick}>
                  Women Empowerment
                </Link>
              </li>
            </ul>
          )}
        </li>
            <li onClick={()=> {setMenu('news')}}>
              <Link style={{textDecoration: 'none'}} to="/news" onClick={handleLinkClick}>News</Link> {menu === 'news' ? <hr /> : <></>}
            </li>
            <li onClick={()=> {setMenu('contact')}}>
              <Link style={{textDecoration: 'none'}} to="/contact" onClick={handleLinkClick}>Contact Us</Link> {menu === 'contact' ? <hr /> : <></>}
            </li>
          </ul>
        </section>
        <div className='login-dark-mode'>
            <div className='dark-mode'>
              <DarkMode />
            </div>
            <div className='login-btn'>
              <Link to="/login"><button onClick={handleLinkClick} >Login</button></Link>
            </div>
        </div>
      </nav>
     
      <div className='' >
        {
          isActive ?  
          <div className='close-holder'>        
          <div className='navbar-logo'>
             <img src='/logo_background.jpeg' className=''  />
          </div>
          <section>
          <FaTimesCircle className='hamburger' onClick={handleClick} />   
          </section>
          </div>   
           :
           <div className='humberger-wrapper'>
          <div className='login-toggle-wrapper'>
          <Link to="/login"><button onClick={handleLinkClick} className='mobile-login' >Login</button></Link>
          <DarkMode />
          </div>
         <section className='fa-bars'>
           <FaBars onClick={handleClick} className='hamburger' />
           </section>
         </div>
        }

      </div>
    </div>
  );
};

export default Navbar;
