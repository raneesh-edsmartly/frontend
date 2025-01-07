// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import MainLayout from './components/MainLayout';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs/AboutUs'; // Updated path for AboutUs
import Socratic from './pages/Socratic';
import MCQ from './pages/MCQ';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Pricing from './pages/Pricing';
import Dashboard from './pages/Dashboard';
import LearnMore from './pages/AboutUs/LearnMore'; // Import the LearnMore component

const App = () => {
  return (
    <Router>
      {/* ToastContainer should be outside the Routes */}
      <ToastContainer />
      <Routes>
        {/* Use MainLayout as a parent route */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="socratic" element={<Socratic />} />
          <Route path="mcq" element={<MCQ />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blogs/:blog_id" element={<BlogPost />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="learn-more" element={<LearnMore />} /> {/* LearnMore route */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;