import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute, PublicRoute } from './components/auth/ProtectedRoute';
import MainLayout from './components/MainLayout';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs/AboutUs';
import Socratic from './pages/Socratic';
import MCQ from './pages/MCQ-Pro';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Pricing from './pages/Pricing';
import Dashboard from './pages/Dashboard';
import LearnMore from './pages/AboutUs/LearnMore';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ProfileSetup from './pages/profile/ProfileSetup';
import ProfileManagement from './pages/profile/ProfileManagement';
import SocraticFlow from './pages/SocraticFlow';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="socratic" element={<Socratic />} />
            <Route
              path="socraticflow"
              element={
                <ProtectedRoute>
                  <SocraticFlow />
                </ProtectedRoute>
              }
            />
            <Route path="mcq-pro" element={<MCQ />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blogs/:blog_id" element={<BlogPost />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="learn-more" element={<LearnMore />} />
            <Route
              path="login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="profile-setup"
              element={
                <ProtectedRoute>
                  <ProfileSetup />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile-management"
              element={
                <ProtectedRoute>
                  <ProfileManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;