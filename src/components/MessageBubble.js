import React from 'react';
import './MessageBubble.css'; // Link to the CSS file for styling

const MessageBubble = ({ sender, message }) => {
  // Determine the class based on the sender to style messages differently
  const messageClass = sender === 'user' ? 'message-user' : 'message-bot';

  return (
    <div className={`message-bubble ${messageClass}`}>
      {message}
    </div>
  );
};

export default MessageBubble;
