// src/components/MainLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './MainLayout.css';

const MainLayout = () => {
  // Navigation links data
  const navLinks = [
    { path: '/about-us', label: 'About Us' },
    // { path: '/socratic', label: 'Socratic' },
    // { path: '/mcq', label: 'MCQ' },
    { path: '/blog', label: 'Blog' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/dashboard', label: 'Dashboard' },
  ];

  // Social media links data
  const socialLinks = [
    { url: 'https://www.facebook.com/', label: 'Facebook' },
    { url: 'https://www.instagram.com/', label: 'Instagram' },
    { url: 'https://twitter.com/', label: 'Twitter' },
  ];

  return (
    <div className="site-layout">
      {/* Header Section */}
      <Header navLinks={navLinks} />

      {/* Main Content */}
      <main className="site-content">
        <div className="container">
          <Outlet /> {/* This is where the child routes will be rendered */}
        </div>
      </main>

      {/* Footer Section */}
      <Footer navLinks={navLinks} socialLinks={socialLinks} />
    </div>
  );
};

export default MainLayout;