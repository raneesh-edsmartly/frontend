import React from 'react';

const ChatBackgroundWrapper = ({ children }) => {
  return (
    <div className="bg-white min-h-screen w-full p-6"> {/* Added min-h-screen and w-full */}
      {children}
    </div>
  );
};

export default ChatBackgroundWrapper;