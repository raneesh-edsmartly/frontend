// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Footer = ({ socialLinks }) => {
  return (
    <footer className="main-footer">
      <div className="container">
        {/* Footer Header with Logo */}
        <div className="main-footer__header">
          <div className="main-footer__flex">
            <div className="main-footer__logo">
              <Link to="/">
                <img src={logo} alt="Footer Logo" className="footer-logo-image" />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="main-footer__footer">
          <div className="main-footer__flex">
            {/* Copyright and Legal Links */}
            <div className="main-footer__left">
              <p>
                ©{new Date().getFullYear()} Edsmartly Ltd.{' '}
                <span className="separator">|</span>{' '}
                <Link to="/terms-of-use">Terms of Use</Link>{' '}
                <span className="separator">|</span>{' '}
                <Link to="/privacy-policy">Privacy Policy</Link>
              </p>
            </div>

            {/* Social Media Links */}
            <div className="main-footer__right">
              <ul className="social-list">
                {socialLinks.map((social, index) => (
                  <li key={index}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="social-link"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;