import React from 'react';
import { Loader2 } from 'lucide-react';

const ChatInterface = ({ 
  chatHistory, 
  userInput, 
  setUserInput, 
  handleSubmit, 
  loading 
}) => {
  return (
    <div className="space-y-6">
      {chatHistory.length > 0 && (
        <div className="bg-white rounded-lg p-8">
          {chatHistory.map((entry, index) => {
            // Check if the message is an unsafe response
            const isUnsafe = entry.message.startsWith("[Note: Unsafe content]");

            return (
              <div
                key={index}
                className={`mb-4 p-4 rounded max-w-[80%] ${
                  entry.sender === 'user' 
                    ? 'bg-blue-100 ml-auto' 
                    : isUnsafe 
                      ? 'bg-red-50 border border-red-200' // Style for unsafe messages
                      : 'bg-gray-100'
                }`}
              >
                <div className="font-medium mb-2">
                  {entry.sender === 'user' ? 'You' : 'Socrates'}
                </div>
                <div 
                  dangerouslySetInnerHTML={{ 
                    __html: entry.message.replace(/\n/g, '<br />') 
                  }} 
                />
              </div>
            );
          })}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-4 sticky bottom-0 bg-white p-4 rounded-lg shadow-lg">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ask, Think, Discover . . ."
          className="flex-1 p-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !userInput.trim()}
          className="px-8 py-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
              Thinking...
            </>
          ) : (
            'Send'
          )}
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;