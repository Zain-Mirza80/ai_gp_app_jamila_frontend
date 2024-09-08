import React, { useState } from 'react';
import './MessageInput.css';

const MessageInput = ({ input, setInput, sendMessage, startListening, endListening }) => {
    const [isRecording, setIsRecording] = useState(false);

    const toggleRecording = () => {
        console.log("Toggle recording: current state, THIS IS MESSAGEINPUT.JS", isRecording);
        setIsRecording(!isRecording);
        if (!isRecording) {
            console.log("Starting recording...");
            startListening();
        } else {
            console.log("Stopping recording...");
            endListening();
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            console.log("Enter key pressed, sending message");
            sendMessage();
        }
    };

    return (
        <div className="input-container">
            <input
                type="text"
                value={input}
                onChange={(e) => {
                    console.log("Input changed:", e.target.value);
                    setInput(e.target.value);
                }}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="message-input"
            />
            <button onClick={sendMessage} className="send-button">Send</button>
            <button onClick={toggleRecording} className="mic-button" style={{ backgroundColor: isRecording ? 'red' : 'green' }}>
                {isRecording ? 'Stop' : '🎤'}
            </button>
        </div>
    );
};

export default MessageInput;
