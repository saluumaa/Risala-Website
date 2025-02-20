import React, { useState } from 'react';
import { motion } from "framer-motion"
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimesCircle } from 'react-icons/fa';
import ThemeToggle from '../theme/ThemeToggle';
import { useTranslation } from 'react-i18next';
import './Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../../redux/UsersSlice';

const Navbar = () => {
  const [t, i18n] = useTranslation()
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser)
  const [menu, setMenu] = useState('home');
  const [isActive, setIsActive] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleClick = () => {
    setIsActive(!isActive);
  };

  const handleLinkClick = () => {
    setIsActive(false); 
    setDropdownOpen(false);
  };

  // const toggleServicesDropdown = () => {
  //   setServicesDropdownVisible(!isServicesDropdownVisible);
  // };

  // const handleMouseEnter = () => {
  //   setServicesDropdownVisible(true);
  // };

  // const handleMouseLeave = () => {
  //   setServicesDropdownVisible(true);
  // };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="navbar-container">
      <nav className={isActive ? 'nav-active' : ''}>
    
        <motion.section className='navbar-wrapper'
            initial={{ x: 100 }}
            animate={{ x: 0 }}
          transition={{ ease: "easeOut", duration: 1 }}
        >          
          <div className='navbar-logo hidden-logo'>
            <Link to="/" >
            <img src='/logo_background.jpeg' alt='logo'  />
            </Link>
          </div>
        
        {/* </section> */}
        
          <ul className='navbar-links'>
            <li onClick={()=> {setMenu('home')}}>
              <Link style={{textDecoration: 'none'}} to="/" onClick={handleLinkClick}> {t('navbar.home')} </Link> {menu === 'home' ? <hr /> : <></>}
            </li>
            <li onClick={()=> {setMenu('about')}}>
              <Link style={{textDecoration: 'none'}} to="/about" onClick={handleLinkClick}> {t('navbar.about')} </Link> {menu === 'about' ? <hr /> : <></>}
            </li>
          {/* <li 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave} 
            onClick={toggleServicesDropdown}
          >
          <span className='services' style={{ textDecoration: 'none', cursor: 'pointer' }}>
            {t('navbar.services')}
          </span>
          {isServicesDropdownVisible && (
            <ul className="dropdown" style={{listStyle: 'none'}} >
              <li>
                <Link style={{ textDecoration: 'none' }} to="/awareness" onClick={handleLinkClick}>
                  Health
                </Link>
              </li>
              <li>
                <Link style={{ textDecoration: 'none' }} to="/education" onClick={handleLinkClick}>
                  Education
                </Link>
              </li>
              <li>
                <Link style={{ textDecoration: 'none' }} to="/empowerment" onClick={handleLinkClick}>
                  Women Empowerment
                </Link>
              </li>
            </ul>
          )}
          </li> */}

            {/* Services Dropdown */}
            <div className="dropdown-container" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
              <button className="dropdown-toggle">{t('navbar.services')}</button>
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <Link to="/awareness" onClick={handleLinkClick}>Health</Link>
                  <Link to="/education" onClick={handleLinkClick}>Education</Link>
                  <Link to="/empowerment" onClick={handleLinkClick}>Women Empowerment</Link>
                </div>
              )}
            </div>

            <li onClick={()=> {setMenu('news')}}>
              <Link style={{textDecoration: 'none'}} to="/news" onClick={handleLinkClick}> {t('navbar.news')} </Link> {menu === 'news' ? <hr /> : <></>}
            </li>
            <li onClick={()=> {setMenu('contact')}}>
              <Link style={{textDecoration: 'none'}} to="/contact" onClick={handleLinkClick}> {t('navbar.contact')} </Link> {menu === 'contact' ? <hr /> : <></>}
            </li>
          </ul>
        </motion.section>
        <motion.div className='login-dark-mode'
           initial={{ x: 100 }}
           animate={{ x: 0 }}
         transition={{ ease: "easeOut", duration: 1 }}
        >
            <div className='dark-mode'>
              <ThemeToggle />
            </div>
            <div className='login-btn'>
              {!currentUser ? (
                <Link to="/login">
                  <button onClick={handleLinkClick} className='login'>{t('navbar.login')}</button>
                </Link>
              ) : (
                currentUser?.role === 'admin' ? (
                  <Link to="/profile">
                    <button className='profile'>{t('navbar.profile')}</button>
                  </Link>
                ) : (
                  <button className='logout' onClick={handleLogout}>{t('navbar.logout')}</button>
                )
              )}
            </div>
            {i18n.language === 'en' ? <button onClick={() => i18n.changeLanguage('ar')} className='lang-btn'>AR</button> : 
            <button onClick={() => i18n.changeLanguage('en')} className='lang-btn'>EN</button>}
        </motion.div>
      </nav>
     
      <div className='mobile-container' >
        {
          isActive ?  
          <div className='close-holder'>        
          <div className='navbar-logo'>
             <img src='/logo_background.jpeg' className='mobile-logo'  />
          </div>
          <section>
          <FaTimesCircle className='hamburger' onClick={handleClick} />   
          </section>
          </div>   
           :
          <div className='humberger-wrapper'>
          <div className='login-toggle-wrapper'>
          {!currentUser ? (
                <Link to="/login">
                  <button onClick={handleLinkClick} className='login'>{t('navbar.login')}</button>
                </Link>
              ) : (
                currentUser?.role === 'admin' ? (
                  <Link to="/profile">
                    <button className='profile'>{t('navbar.profile')}</button>
                  </Link>
                ) : (
                  <button className='logout' onClick={handleLogout}>{t('navbar.logout')}</button>
                )
              )}
          <ThemeToggle />
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

