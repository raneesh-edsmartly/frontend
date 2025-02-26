import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';
import { useAuth } from '../context/AuthContext'; // Import useAuth

const Header = ({ navLinks, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth(); // Get user and logout from AuthContext
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', isMobileMenuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname, setIsMobileMenuOpen]);

  const handleAuthClick = () => {
    if (user) {
      // Handle logout
      logout(); // Call the logout function from AuthContext
      navigate('/login'); // Redirect to login page after logout
    } else {
      navigate('/login'); // Redirect to login page if not authenticated
    }
  };

  // Filter regular nav links and auth link
  const regularNavLinks = navLinks.filter(link => !link.isAuth);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 
      ${isScrolled ? 'bg-black/95 shadow-lg' : 'bg-black'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={logo} 
              alt="EdSmartly Logo" 
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {regularNavLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-white hover:text-blue-400 transition-colors duration-200 text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
            {/* Auth Button */}
            <button
              onClick={handleAuthClick}
              className="bg-gray-500/20 hover:bg-gray-500/50 text-white px-6 py-2 rounded-lg transition-colors duration-700 text-sm font-medium"
            >
              {user ? 'Logout' : 'Login'} {/* Change button text based on user state */}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white hover:text-blue-400 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`fixed inset-0 bg-black transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
        style={{ top: '4rem' }}
      >
        <nav className="flex flex-col p-4">
          {regularNavLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-white hover:text-blue-400 py-3 text-lg font-medium transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {/* Mobile Auth Button */}
          <button
            onClick={() => {
              handleAuthClick();
              setIsMobileMenuOpen(false);
            }}
            className="bg-gray-500/20 hover:bg-gray-500/50 text-white py-3 mt-2 rounded-lg transition-colors duration-700 text-lg font-medium"
          >
            {user ? 'Logout' : 'Login'} {/* Change button text based on user state */}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;