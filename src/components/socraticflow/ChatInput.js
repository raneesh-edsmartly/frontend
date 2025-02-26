import React, { useState } from 'react';

const ChatInput = ({ onSendMessage, onNewTopic, isLoading }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== '') {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="glassmorphism-input border-t border-white/20 p-5">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <textarea
          className="w-full p-4 glassmorphism-textarea rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-400/70 transition-all"
          placeholder="Type here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          disabled={isLoading}
          style={{ backgroundColor: 'rgba(46, 46, 46, 0.09)' }}
        ></textarea>
        
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onNewTopic}
            className="glassmorphism-button-secondary px-5 py-3 rounded-xl transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-400/70 disabled:opacity-50"
            disabled={isLoading}
          >
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Topic
            </span>
          </button>
          
          <button
            type="submit"
            className="glassmorphism-button-primary px-5 py-3 rounded-xl transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400/70 disabled:opacity-50"
            disabled={isLoading || message.trim() === ''}
          >
            {isLoading ? (
              <span className="flex items-center">
                <div className="h-4 w-4 mr-2 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                Sending...
              </span>
            ) : (
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Send Message
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;