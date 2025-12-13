import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import ThemeToggle from '../theme/ThemeToggle';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../../redux/UsersSlice';

const Navbar = () => {
  const [t, i18n] = useTranslation();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  const navigate = useNavigate();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  }, [location]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: t('navbar.home') },
    { path: '/about', label: t('navbar.about') },
    {
      label: t('navbar.services'),
      isDropdown: true,
      items: [
        { path: '/awareness', label: t('navbar.LService') },
        { path: '/education', label: t('navbar.EService') },
        { path: '/empowerment', label: t('navbar.HService') },
      ]
    },

    { path: '/contact', label: t('navbar.contact') },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg py-2'
        : 'bg-gradient-to-b from-black/50 to-transparent py-4'
        }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img
              src="/logo_background.jpeg"
              alt="Risala Logo"
              className="h-12 w-12 object-cover rounded-lg transition-transform group-hover:scale-105"
            />
            <span className="text-2xl font-bold font-heading bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent hidden sm:block">
              Risala
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              link.isDropdown ? (
                <div
                  key={index}
                  className="relative group"
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <button className={`flex items-center space-x-1 font-medium transition-colors ${isScrolled ? 'text-gray-700 dark:text-gray-300 hover:text-primary-600' : 'text-white hover:text-gray-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'}`}>
                    <span>{link.label}</span>
                    <FaChevronDown className={`text-xs transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  <div className={`absolute top-full left-0 mt-2 w-56 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg py-2 transition-all duration-200 ${isServicesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                    }`}>
                    {link.items.map((item, idx) => (
                      <Link
                        key={idx}
                        to={item.path}
                        className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={index}
                  to={link.path}
                  className={`relative font-medium transition-colors ${isActive(link.path)
                    ? 'text-primary-400'
                    : isScrolled
                      ? 'text-gray-700 dark:text-gray-300 hover:text-primary-600'
                      : 'text-white hover:text-gray-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'
                    }`}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400 rounded-full" />
                  )}
                </Link>
              )
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <ThemeToggle />

            {/* Language Toggle */}
            <button
              onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en')}
              className="px-3 py-1.5 text-sm font-medium text-gray-200 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 border border-gray-300 dark:border-gray-600 rounded-md transition-colors"
            >
              {i18n.language === 'en' ? 'AR' : 'EN'}
            </button>

            {/* Auth Buttons */}
            {!currentUser ? (
              <Link to="/login">
                <button className="btn-primary">
                  {t('navbar.login')}
                </button>
              </Link>
            ) : (
              <div className="flex items-center space-x-3">
                {currentUser.role === 'admin' && (
                  <Link to="/admin/dashboard">
                    <button className="px-4 py-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                      Dashboard
                    </button>
                  </Link>
                )}
                <Link to="/profile">
                  <button className="px-4 py-2 text-sm font-medium text-gray-200 dark:text-gray-300 hover:bg-primary-500 dark:hover:bg-gray-800 rounded-lg transition-colors">
                    {t('navbar.profile')}
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
        <div className="px-4 py-6 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          {/* Mobile Nav Links */}
          <div className="space-y-4">
            {navLinks.map((link, index) => (
              link.isDropdown ? (
                <div key={index}>
                  <button
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                    className="flex items-center justify-between w-full text-left text-gray-700 dark:text-gray-300 font-medium"
                  >
                    <span>{link.label}</span>
                    <FaChevronDown className={`text-xs transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isServicesOpen && (
                    <div className="mt-2 ml-4 space-y-2">
                      {link.items.map((item, idx) => (
                        <Link
                          key={idx}
                          to={item.path}
                          className="block py-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={index}
                  to={link.path}
                  className={`block py-2 font-medium ${isActive(link.path)
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-gray-700 dark:text-gray-300'
                    }`}
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>

          {/* Mobile Actions */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Theme</span>
              <ThemeToggle />
            </div>

            <button
              onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en')}
              className="w-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg"
            >
              {i18n.language === 'en' ? 'العربية' : 'English'}
            </button>

            {!currentUser ? (
              <Link to="/login" className="block">
                <button className="w-full btn-primary">
                  {t('navbar.login')}
                </button>
              </Link>
            ) : (
              <div className="space-y-2">
                {currentUser.role === 'admin' && (
                  <Link to="/admin/dashboard" className="block">
                    <button className="w-full px-4 py-2 text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                      Dashboard
                    </button>
                  </Link>
                )}
                <Link to="/profile" className="block">
                  <button className="w-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    {t('navbar.profile')}
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
