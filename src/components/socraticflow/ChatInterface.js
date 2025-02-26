import React, { useState, useRef } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

const ChatInterface = ({ username }) => {
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll functionality has been removed

  const sendMessage = async (text, isNewTopic = false) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Add user message to UI immediately
      const userMessage = {
        content: text,
        isUser: true,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prevMessages => [...prevMessages, userMessage]);
      
      // Prepare request payload
      const payload = {
        username: username,
        query: text,
        is_new_topic: isNewTopic
      };
      
      // Add session ID if we have one and not starting a new topic
      if (sessionId && !isNewTopic) {
        payload.session_id = sessionId;
      }
      
      // Make API request
      const response = await fetch(`${process.env.REACT_APP_API_URL}/socratic-flow/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Save session ID for subsequent messages
      setSessionId(data.session_id);
      
      // Create enhanced processing details with session ID and username
      const enhancedDetails = {
        ...(data.processing_details || {}),
        session_id: data.session_id,
        username: data.username || username
      };
      
      // Add assistant response to messages
      const assistantMessage = {
        content: data.response,
        isUser: false,
        timestamp: data.timestamp,
        processingDetails: enhancedDetails
      };
      
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
      
    } catch (err) {
      setError(`Failed to send message: ${err.message}`);
      console.error('Error sending message:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const startNewTopic = async () => {
    // If there's an existing session, end it first
    if (sessionId) {
      try {
        await fetch(`${process.env.REACT_APP_API_URL}/socratic-flow/end-session`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ session_id: sessionId }),
        });
      } catch (err) {
        console.error('Error ending session:', err);
      }
    }
    
    // Clear messages, session ID, and any error messages
    setMessages([]);
    setSessionId(null);
    setError(null);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages container */}
      <div className="flex-1 overflow-y-auto py-6 px-5 space-y-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-10 text-gray-500">
            <div className="glassmorphism-welcome p-8 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-indigo-500 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <p className="text-lg font-medium mb-3">Begin Your Socratic Journey</p>
              
            </div>
          </div>
        ) : (
          messages.map((msg, index) => (
            <ChatMessage
              key={index}
              message={msg.content}
              isUser={msg.isUser}
              timestamp={msg.timestamp}
              processingDetails={msg.processingDetails}
            />
          ))
        )}
        
        {error && (
          <div className="glassmorphism-error p-5 rounded-xl text-red-700">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {error}
            </div>
          </div>
        )}
        
        {isLoading && (
          <div className="flex justify-center p-5">
            <div className="glassmorphism-loading flex items-center space-x-2 px-6 py-3 rounded-full">
              <div className="loading-dot"></div>
              <div className="loading-dot animation-delay-200"></div>
              <div className="loading-dot animation-delay-400"></div>
              <span className="ml-2 text-gray-600">Thinking...</span>
            </div>
          </div>
        )}
        
        {/* Keep the ref but don't use it for auto-scrolling */}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <ChatInput
        onSendMessage={(text) => sendMessage(text, false)}
        onNewTopic={startNewTopic}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ChatInterface;