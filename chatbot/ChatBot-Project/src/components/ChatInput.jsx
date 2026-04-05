import { useState } from 'react'
import { Chatbot } from 'supersimpledev';

import './ChatInput.css'

export function ChatInput( {chatMessages,setChatMessages}){
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