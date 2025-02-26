import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import HomeImage from '../assets/home.jpg';
import './Home.css';

const Homepage = () => {
  // Static vignette settings - adjust these values directly in the code
  const [vignetteSettings] = useState({
    opacity: 70,  // Opacity percentage (0-100)
    spread: 40,   // Spread percentage (0-100)
    color: '#000000' // Vignette color (hex)
  });

  // State for image loading
  const [imagesLoaded, setImagesLoaded] = useState({
    hero: false,
  });

  // State for background color transition
  const [backgroundColor, setBackgroundColor] = useState('bg-[#0B1120]'); // Start with dark blue

  // Intersection Observer for animations
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Simulated progressive image loading
  useEffect(() => {
    const loadImage = (src, key) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImagesLoaded(prev => ({ ...prev, [key]: true }));
        // Change background color to deep purple when the hero image is loaded
        if (key === 'hero') {
          setBackgroundColor('bg-[#1A1033]');
        }
      };
    };

    // Load images progressively with a delay to simulate a loading sequence
    setTimeout(() => loadImage(HomeImage, 'hero'), 100);
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#0B1120] to-[#1A1033]">
      {/* Hero Section with Progressive Loading and Vignette */}
      <section 
        ref={heroRef}
        className={`relative w-full transition-opacity duration-1000 ${
          heroInView ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Hero Image Container with Dynamic Background Transition */}
        <div className={`h-screen ${backgroundColor} relative transition-colors duration-1000`}>
          <div className={`w-full h-full transition-opacity duration-700 ${
            imagesLoaded.hero ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}>
            <img 
              src={HomeImage}
              alt="Home" 
              className="w-full h-full object-cover"
            />
            {/* Vignette Overlay */}
            <div 
              className="absolute inset-0"
              style={{
                background: `radial-gradient(
                  circle at center,
                  transparent ${100 - vignetteSettings.spread}%,
                  ${vignetteSettings.color}${Math.round(vignetteSettings.opacity * 0.01 * 255).toString(16).padStart(2, '0')} 100%
                )`
              }}
            />
          </div>
        </div>
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-0">
          <div className="w-full px-4 md:px-8">
            <div className={`bg-[#1E1E2E]/30 backdrop-blur-1 rounded-xl p-4 md:p-8 shadow-lg border border-[rgba(147, 112, 219, 0.2)] mx-20 text-center transform transition-all duration-1000 ${
              heroInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}>
              <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-[#E2E0FF] to-[#FFFFFF] bg-clip-text text-transparent mb-4 md:mb-6">
                Transforming Education with Socratic Learning Machines
              </h1>
              <p className="text-lg md:text-xl text-[#E5E7EB] mb-6 md:mb-8">
                Discover how we are pushing the boundaries of education
              </p>
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center">
                <Link to="/socraticflow" className="w-full md:w-auto">
                  <button className="w-full bg-[#2E1065]/20 text-[#C7D2FE] px-6 py-3 rounded-lg font-medium hover:bg-[#2E1065]/30 transition duration-300">
                    Socratic Learning Machine
                  </button>
                </Link>
                <Link to="/mcq-pro" className="w-full md:w-auto">
                  <button className="w-full bg-[#2E1065]/20 text-[#C7D2FE] px-6 py-3 rounded-lg font-medium hover:bg-[#2E1065]/30 transition duration-300">
                    Socratic Quiz Studio
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;