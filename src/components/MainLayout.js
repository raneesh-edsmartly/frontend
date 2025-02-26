// src/components/MainLayout.js
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './MainLayout.css';

const MainLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Add auth state
  const navigate = useNavigate();

  // Regular navigation links
  const navLinks = [
    { path: '/about-us', label: 'About Us' },
    { path: '/blog', label: 'Blog' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/dashboard', label: 'Dashboard' },
  ];

  // Add auth button to the end of navigation
  const authLink = {
    path: '/login',
    label: isAuthenticated ? 'Logout' : 'Login',
    isAuth: true, // Special flag for styling
    onClick: () => {
      if (isAuthenticated) {
        // Handle logout
        setIsAuthenticated(false);
        // Additional logout logic here
      } else {
        // Navigate to login page
        navigate('/login');
      }
    }
  };

  const allNavLinks = [...navLinks, authLink];

  const socialLinks = [
    { url: 'https://www.facebook.com/', label: 'Facebook' },
    { url: 'https://www.instagram.com/', label: 'Instagram' },
    { url: 'https://twitter.com/', label: 'Twitter' },
  ];

  return (
    <div className="site-layout">
      <Header 
        navLinks={allNavLinks} 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <main className={`site-content ${isMobileMenuOpen ? 'blur-sm' : ''}`}>
        <div className="container">
          <Outlet />
        </div>
      </main>

      <Footer navLinks={navLinks} socialLinks={socialLinks} />
    </div>
  );
};

export default MainLayout;