import React, { useState } from 'react';

const ChatMessage = ({ message, isUser, timestamp, processingDetails }) => {
  const [detailsOpen, setDetailsOpen] = useState(false);

  // Format timestamp nicely
  const formattedTime = timestamp ? new Date(timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit'
  }) : '';

  const formattedDate = timestamp ? new Date(timestamp).toLocaleDateString([], {
    month: 'short',
    day: 'numeric'
  }) : '';

  // Parse the content to separate parts based on the message format
  const parseContent = () => {
    if (isUser) return { displayContent: message };
    
    // For second turn onwards: "Analysis:" followed by "Content:" followed by "Socratic Question:"
    if (message.startsWith("Analysis:")) {
      // Find the index where "Content:" starts
      const contentIndex = message.indexOf("Content:");
      
      if (contentIndex !== -1) {
        // Extract analysis part (to be moved to processing details)
        const analysis = message.substring(0, contentIndex).trim();
        
        // Extract the content and Socratic Question parts
        const remainingContent = message.substring(contentIndex);
        
        return {
          analysis,
          displayContent: remainingContent
        };
      }
    }
    
    // For first turn: "Context:" followed by "Socratic Question:"
    // Just display the original message as is
    return { displayContent: message };
  };

  const { analysis, displayContent } = parseContent();

  return (
    <div className={`animate-fade-in mb-5 ${isUser ? 'ml-6 md:ml-16 flex justify-end' : 'mr-6 md:mr-16'}`}>
      {/* Message content */}
      <div className={`max-w-[85%] ${isUser ? 'user-message' : 'assistant-message'}`}>
        <div className={`px-5 py-4 rounded-2xl shadow-sm ${isUser ? 'glassmorphism-user-message' : 'glassmorphism-assistant-message'}`}>
          <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">{displayContent}</div>
          
          {/* Timestamp in a subtle format */}
          {timestamp && (
            <div className="text-xs text-gray-500 mt-2 flex justify-end items-center">
              <span>{formattedTime}</span>
              <span className="mx-1">•</span>
              <span>{formattedDate}</span>
            </div>
          )}
        </div>
        
        {/* Processing details for non-user messages */}
        {!isUser && (processingDetails || analysis) && (
          <div className={`mt-2 transition-all duration-300 ${detailsOpen ? 'opacity-100' : 'opacity-70'}`}>
            <button 
              onClick={() => setDetailsOpen(!detailsOpen)}
              className="text-xs flex items-center text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-3 w-3 mr-1 transition-transform duration-300 ${detailsOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              {detailsOpen ? 'Hide Details' : 'View Processing Details'}
            </button>
            
            {detailsOpen && (
              <div className="mt-2 glassmorphism-details p-4 rounded-xl overflow-auto max-h-60">
                {/* Display the Analysis text first if it exists */}
                {analysis && (
                  <div className="mb-4 pb-4 border-b border-gray-200">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{analysis}</p>
                  </div>
                )}
                
                {/* Add visual component for Bloom's and DOK levels */}
                {processingDetails && processingDetails.cognitive_analysis && (
                  <div className="mb-4 pb-4 border-b border-gray-200">
                    <h4 className="text-xs font-semibold mb-2">Cognitive Analysis</h4>
                    
                    {/* Bloom's Level Bar */}
                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Bloom's Level: {processingDetails.cognitive_analysis.blooms_level}</span>
                        <span>{processingDetails.cognitive_analysis.blooms_number}/6</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-blue-500 h-2.5 rounded-full" 
                          style={{ width: `${(processingDetails.cognitive_analysis.blooms_number / 6) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* DOK Level Bar */}
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Depth of Knowledge</span>
                        <span>{processingDetails.cognitive_analysis.dok_level}/4</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-red-500 h-2.5 rounded-full" 
                          style={{ width: `${(processingDetails.cognitive_analysis.dok_level / 4) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Then display the JSON processing details */}
                {processingDetails && (
                  <pre className="text-xs text-gray-700">{JSON.stringify(processingDetails, null, 2)}</pre>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;