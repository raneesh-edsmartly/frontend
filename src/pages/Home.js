import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import HomeImage from '../assets/home.jpg'; // Import the home image
import SocraticImage from '../assets/socratic.jpg'; // Import the Socratic image
import McqImage from '../assets/mcq.jpg'; // Import the MCQ image

const Homepage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section with Image */}
      <section className="w-full relative">
        {/* Image with original aspect ratio */}
        <img src={HomeImage} alt="Home" className="w-full h-auto object-cover" />
        
        {/* Glassmorphic Hero Content with Manual Blur Control */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-[0px]">
          <div className="max-w-6xl mx-auto text-center px-4">
            <div className="bg-white/30 backdrop-blur-[1px] rounded-2xl p-8 shadow-lg border border-white/20">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                Transforming Education with Socratic Learning Machines
              </h1>
              <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
                Discover how we are pushing the boundaries of education
              </p>
              <div className="space-x-4">
                {/* Link to Socratic.js */}
                <Link to="/socratic">
                  <button className="bg-white/20 text-gray-900 px-8 py-3 rounded-lg font-medium hover:bg-gray-300/50 transition duration-300">
                    Socratic Learning Machine
                  </button>
                </Link>
                {/* Link to MCQ.js */}
                <Link to="/mcq">
                  <button className="bg-white/20 text-gray-900 px-8 py-3 rounded-lg font-medium hover:bg-gray-300/50 transition duration-300">
                    Socratic MCQ Generator
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Our Solutions
          </h2>
          
          {/* Socratic Learning System */}
          <div className="mb-20">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Socratic Learning System
            </h3>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white/30 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/20">
                <p className="text-gray-700 mb-6">
                  Our advanced AI-powered dialogue system transforms traditional textbooks into 
                  interactive learning experiences. Using sophisticated retrieval-augmented 
                  generation technology, students can engage in meaningful conversations about 
                  their study material.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-1">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <span className="text-gray-700">Transform any educational content into an interactive learning experience</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-1">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <span className="text-gray-700">Adapt to each student's pace and learning style</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white/30 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/20">
                {/* Interactive demo with Socratic image */}
                <div className="bg-gray-100/50 h-64 rounded-lg flex items-center justify-center overflow-hidden">
                  <img src={SocraticImage} alt="Socratic Learning System" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>

          {/* MCQ Generation System */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Socratic MCQ Generation System
            </h3>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white/30 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/20">
                {/* Assessment demo with MCQ image */}
                <div className="bg-gray-100/50 h-64 rounded-lg flex items-center justify-center overflow-hidden">
                  <img src={McqImage} alt="MCQ Generation System" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="bg-white/30 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/20">
                <p className="text-gray-700 mb-6">
                  Our intelligent assessment system generates high-quality multiple choice 
                  questions that align perfectly with educational standards while adapting 
                  to individual student needs.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-1">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <span className="text-gray-700">Questions mapped to educational frameworks and learning objectives</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-1">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <span className="text-gray-700">Assessment difficulty that adjusts to student performance</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/30 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/20">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Join the Educational Revolution with EDSMARTLY
            </h2>
            <div className="space-y-4">
              <button className="bg-cyan-500/90 text-white px-8 py-3 rounded-lg font-medium hover:bg-cyan-700/90 transition duration-300 w-full md:w-auto md:ml-4">
                Request a Demo
              </button>
              <button className="bg-cyan-500/90 text-white px-8 py-3 rounded-lg font-medium hover:bg-cyan-700/90 transition duration-300 w-full md:w-auto md:ml-4">
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;