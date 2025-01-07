// src/components/Header.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Header = ({ navLinks }) => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if we're scrolling up or down
      if (currentScrollY > lastScrollY) {
        // Scrolling down - hide header
        setIsHeaderVisible(false);
      } else {
        // Scrolling up - show header
        setIsHeaderVisible(true);
      }
      
      // Update our last scroll position
      setLastScrollY(currentScrollY);
    };

    // Add scroll event listener
    window.addEventListener('scroll', controlHeader);

    // Cleanup
    return () => window.removeEventListener('scroll', controlHeader);
  }, [lastScrollY]); // Depend on lastScrollY to properly track scroll direction

  return (
    <header className={`site-header ${isHeaderVisible ? '' : 'header-hidden'}`}>
      <div className="main-nav">
        {/* Logo */}
        <div className="main-nav__left">
          <Link to="/" className="logo-link">
            <img src={logo} alt="Site Logo" className="logo-image" />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="main-nav__right">
          <nav className="main-nav__menu">
            <ul>
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.path}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;