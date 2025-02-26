import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ChatInterface from '../components/socraticflow/ChatInterface';
import './SocraticFlow.css';

const SocraticFlow = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If not loading and no user, redirect to login
    if (!loading && !user) {
      navigate('/login', { state: { from: '/socraticflow' } });
    }
  }, [user, loading, navigate]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="glassmorphism p-8 rounded-xl flex items-center justify-center">
          <div className="loading-circle"></div>
          <p className="text-lg text-gray-600 ml-3">Loading...</p>
        </div>
      </div>
    );
  }

  // Only render the page content if user is authenticated
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col">
      {/* Header Section */}
      <header className="glassmorphism-header sticky top-0 z-10 p-5 mb-6">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-1">Socratic Learning Machine</h1>
          <p className="text-sm text-gray-600">Redefining Education: The Art of Asking, Thinking, and Growing.</p>
        </div>
      </header>

      {/* Main content area with chat interface */}
      <div className="flex-1 container mx-auto px-4 pb-6 flex flex-col max-w-5xl">
        {/* User-specific welcome */}
        <div className="bg-gray-200 rounded-xl p-5 mb-6 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800">
            Welcome, {user.username}!
          </h2>
        </div>

        {/* Chat Interface */}
        <div className="glassmorphism-chat rounded-xl flex-1 flex flex-col overflow-hidden">
          <ChatInterface username={user.username} />
        </div>
      </div>
    </div>
  );
};

export default SocraticFlow;