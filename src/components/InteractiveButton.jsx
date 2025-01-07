import React from 'react';
import { ArrowRight } from 'lucide-react';

const InteractiveButton = ({ text, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`group relative inline-flex items-center gap-2 py-3 px-6 font-medium text-blue-900 hover:text-blue-700 transition-colors duration-300 ${className}`}
    >
      <span>{text}</span>
      <ArrowRight 
        className="w-4 h-4 transition-transform duration-300 transform group-hover:translate-x-1"
      />
      <div className="absolute bottom-0 left-0 h-0.5 w-full bg-blue-900 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </button>
  );
};

export default InteractiveButton;