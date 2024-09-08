import React, { useState, useRef, useEffect } from 'react';
import MessageInput from '../components/MessageInput';
import MessageList from '../components/MessageList';

console.log("Hello this is a test to see if the conosle logg!!!!!");

const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;



function PatientChat() {
    const [messages, setMessages] = useState([{ id: 1, sender: 'bot', message: 'Hello, how can I help you today? Please provide your name, DOB, and then tell me what the problem is' }]);
    const [input, setInput] = useState('');
    const [threadId, setThreadId] = useState('');
    const mediaRecorderRef = useRef(null);

    useEffect(() => {
        // Upon component mount, check for an existing thread ID in local storage
        console.log("Component mounted. Checking for existing thread ID...");
        const existingThreadId = localStorage.getItem('threadId');
        if (existingThreadId) {
            console.log("Existing thread ID found:", existingThreadId);
            setThreadId(existingThreadId);
        } else {
            console.log("No thread ID found. Fetching new thread ID...");
            fetchThreadId();
        }
    }, []);

    const fetchThreadId = async () => {
        const response = await fetch('https://ai-backend-2-7028975dcb70.herokuapp.com/start_session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        if (response.ok) {
            setThreadId(data.threadId);
            localStorage.setItem('threadId', data.threadId);  // Store the new thread ID in local storage
        } else {
            console.error('Failed to start session:', data.error);
        }
    };

    const sendMessage = async () => {
        if (!input.trim()) {
            console.log("No input to send");
            return;
        }
        const newMessage = { id: messages.length + 1, sender: 'user', message: input };
        setMessages([...messages, newMessage]);
        setInput('');
        const response = await fetch('https://ai-backend-2-7028975dcb70.herokuapp.com/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: input, threadId: threadId })
        });
        if (response.ok) {
            const data = await response.json();
            setMessages(prevMessages => [...prevMessages, { id: prevMessages.length + 1, sender: 'bot', message: data.message }]);
            console.log(`Received response: ${data.message}`);
        } else {
            const error = await response.text();
            console.error('Error communicating with the backend:', error);
        }
    };

    const startListening = async () => {
        console.log("Attempting to access microphone...");
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            console.log("Microphone access granted.");
    
            // Check if the user is on an iOS device and adjust mimeType accordingly
            const mimeType = isIOS ? 'audio/mp4' : 'audio/webm';
            console.log(`Using mimeType: ${mimeType}`);
    
            mediaRecorderRef.current = new MediaRecorder(stream, { mimeType });
            console.log("MediaRecorder initialized.");
    
            mediaRecorderRef.current.start();
            console.log("Recording started.");
    
            const audioChunks = [];
            mediaRecorderRef.current.ondataavailable = (event) => {
                console.log(`Received audio data chunk of size ${event.data.size}`);
                audioChunks.push(event.data);
            };
    
            // mediaRecorderRef.current.onstop = async () => {
            //     console.log("Recording stopped.");
            //     const audioBlob = new Blob(audioChunks, { type: mimeType });
            //     console.log(`Created Blob with type: ${audioBlob.type} and size: ${audioBlob.size}`);
            //     processAudio(audioBlob);
            // };



            mediaRecorderRef.current.onstop = async () => {
                console.log("Recording stopped.");
            
                // Create the audio blob from the recorded chunks
                const audioBlob = new Blob(audioChunks, { type: mimeType });
            
                // Log details about the audio Blob
                console.log(`Created Blob with type: ${audioBlob.type} and size: ${audioBlob.size}`);
            
                // Additional logging to check the audio Blob's properties
                console.log("Audio Blob MIME type:", audioBlob.type);
                console.log("Audio Blob size (bytes):", audioBlob.size);
            
                // Call your function to process the audio (upload, analyze, etc.)
                await processAudio(audioBlob);

                console.log("StartListenining function is now over!!!!");
            };
            






        } catch (error) {
            console.error('Error accessing microphone:', error);
        }
    };
    

    const endListening = () => {
        console.log("Stopping audio capture...");
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }
    };

    const processAudio = async (audioBlob) => {
        const formData = new FormData();
        formData.append("file", audioBlob);
        formData.append("threadId", threadId);
    
        console.log("Sending audio file to backend:", audioBlob);
        console.log("Thread ID:", threadId);
    
        const response = await fetch('https://ai-backend-2-7028975dcb70.herokuapp.com/process_audio', {
            method: 'POST',
            body: formData
        });
        console.log("After response");
        const result = await response.json();
        console.log("After result");
        if (response.ok) {
            console.log("Audio processed successfully:", result);
            // Update state to include user's transcribed input and bot's response
            setMessages(prevMessages => [
                ...prevMessages,
                { id: prevMessages.length + 1, sender: 'user', message: result.user_input },
                { id: prevMessages.length + 2, sender: 'bot', message: result.message }
            ]);
        } else {
            console.error('Failed to process audio:', result.error);
        }
    };
    




    // const processAudio = async (audioBlob) => {
    //     const formData = new FormData();
    //     formData.append("file", audioBlob, "filename.mp4");  // Explicitly naming the file may help in some backend processing cases
    //     formData.append("threadId", threadId);
    
    //     console.log("Sending audio file to backend:", audioBlob);
    //     console.log("Thread ID:", threadId);
    
    //     const response = await fetch('https://ai-backend-2-7028975dcb70.herokuapp.com/process_audio', {
    //         method: 'POST',
    //         body: formData
    //     });
    //     const result = await response.json();
    //     if (response.ok) {
    //         console.log("Audio processed successfully:", result);
    //     } else {
    //         console.error('Failed to process audio:', result.error);
    //     }
    // };
    




    const saveAndSendChat = async () => {
        const chatData = {
            conversation: messages,
            timestamp: new Date().toISOString()
        };
        const response = await fetch('https://ai-backend-2-7028975dcb70.herokuapp.com/send_chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(chatData)
        });
        if (response.ok) {
            const result = await response.json();
            alert('Chat sent successfully: ' + result.message);
        } else {
            const error = await response.text();
            alert('Failed to send chat: ' + error);
        }
    };

    return (
        <div>
            <h2>Patient Chat</h2>
            <MessageList messages={messages} onSaveChat={saveAndSendChat} />
            <MessageInput
                input={input}
                setInput={setInput}
                sendMessage={sendMessage}
                startListening={startListening}
                endListening={endListening}
            />
        </div>
    );
}

export default PatientChat;
