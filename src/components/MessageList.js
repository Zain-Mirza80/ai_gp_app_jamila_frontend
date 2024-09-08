import React, { useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';

const MessageList = ({ messages }) => {
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Function to trigger saving and sending the chat
  const handleSaveChat = async () => {
    const chatData = {
      conversation: messages,
      timestamp: new Date().toISOString()
    };

    try {
      const response = await fetch('https://ai-backend-2-7028975dcb70.herokuapp.com/send_chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(chatData)
      });
      const result = await response.json();
      alert(result.message);  // Notify the user that the chat was sent
    } catch (error) {
      console.error('Error sending chat:', error);
      alert('Failed to send chat');
    }
  };

  return (
    <div className="message-list">
      {messages.map(msg => (
        <MessageBubble key={msg.id} sender={msg.sender} message={msg.message} />
      ))}
      <div ref={endOfMessagesRef} />
      <button onClick={handleSaveChat} className="save-chat-button">Save and Send Chat</button>
    </div>
  );
};

export default MessageList;
