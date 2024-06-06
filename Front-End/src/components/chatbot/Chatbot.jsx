import React, { useState, useEffect } from 'react'
import socket from '../../connection/socket.js'
const Chatbot = () => {
    const [message, setMessage] = useState("");
    const [isThinking, setIsThinking] = useState(false);
    const [messages, setMessages] = useState([]);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isThinking) {
            return;
        }
        console.log(message);
        socket.emit("message", message);
        setMessages((m) => [...m, message]);
        setIsThinking(true);
    }
    useEffect(() => {
        socket.on("response", (response) => {
            console.log(response);
            setIsThinking(false);
        })
        return () => {
            socket.off("response");
        };
    }, [])
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" onChange={(e) => setMessage(e.target.value)} />
            <button type="submit">Send</button>
            {isThinking ? <p>Thinking...</p> : <></>}
        </form>
    )
}

export default Chatbot