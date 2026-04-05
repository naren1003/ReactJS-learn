import { useState, useRef, useEffect } from 'react'
import { Chatbot } from 'supersimpledev'
import RobotProfileImage from './assets/robot.png';
import UserProfileImage from './assets/user.png';

import './App.css'
function ChatInput( {chatMessages,setChatMessages}){
    const [inputText,setInputText] = useState('');

    function keyPressed(event){
        if(event.key === 'Enter'){
            sendMessage();
        }else if(event.key === 'Escape'){
            setInputText('');
        }
    }

    function saveInputText(event){
        setInputText(event.target.value);
    }

    async function sendMessage(){
        setInputText('');
        const newChatMessages = [
            ...chatMessages,
            {
                message: inputText,
                sender: 'user',
                id:crypto.randomUUID()
            }
        ];

        setChatMessages([
            ...newChatMessages,
            {
                message: 'Loading...',
                sender: 'robot',
                id: crypto.randomUUID()
            }
        ]);

        const response =await Chatbot.getResponseAsync(inputText);
        setChatMessages([
            ...newChatMessages,
            {
                message: response,
                sender: 'robot',
                id:crypto.randomUUID()
            }
        ]);
    }

    return(
        <div className ="chat-input-container">
            <input 
                placeholder = "Send a message to ChatBot" 
                size="30"
                onChange = {saveInputText}
                value = {inputText}
                onKeyDown = {keyPressed}
                className = "chat-input"
              />
            <button 
                onClick={sendMessage} 
                className = "send-button"
            >send</button>
        </div>
    );
}

function ChatMessage({message,sender}){
    return(
        <div className = {sender === 'user' ?
                          "chat-message-user" : 
                          "chat-message-robot"}>

            {sender === 'robot' && (
                <img src={RobotProfileImage} className = "chat-message-profile" />
            )}
            <div className = "chat-message-text">
                {message}
            </div>
            {sender === 'user' && (
                <img src={UserProfileImage}  className = "chat-message-profile" />
            )}

        </div>
    );
}

function ChatMessages({chatMessages,setChatMessages}){ 
    const chatMessagesRef = useRef(null);

    useEffect(()=>{
        const containerElem = chatMessagesRef.current;
        if(containerElem){
            containerElem.scrollTop = containerElem.scrollHeight; 
        }
    },[chatMessages])
    return(
        <div 
        className="chat-message-container"
        ref ={chatMessagesRef}>  
            {chatMessages.map((chatMessage) => {
                return(
                    <ChatMessage 
                        message = {chatMessage.message}
                        sender = {chatMessage.sender}
                        key = {chatMessage.id}
                    />
                );
            })} 
        </div>
    );
}

function App(){
    const [chatMessages,setChatMessages] = useState([]);

    return(
        <div className = "app-container">
            {chatMessages.length === 0 && (
                <p className="welcome-message">
                    Welcome to the chatbot project! Send a message using the textbox below.
                </p>
            )}
            <ChatMessages 
            chatMessages = {chatMessages}
            setChatMessages = {setChatMessages}
            />
            <ChatInput 
            chatMessages = {chatMessages}
            setChatMessages = {setChatMessages}
            />
        </div>
    );
}

export default App
