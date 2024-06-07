import React, { useState, useEffect } from 'react'
import "./Chatbot.scss";
import { Link } from 'react-router-dom';
// import socket from '../../connection/socket.js'
import { getAuthUser } from '../../localStorage/storage';

const Chatbot = () => {
    const [message, setMessage] = useState("");
    const [isThinking, setIsThinking] = useState(false);
    const [messages, setMessages] = useState([]);

    const user = getAuthUser();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isThinking) {
            return;
        }
        console.log(message);
        // socket.emit("message", message);
        setMessages((m) => [...m, message]);
        setIsThinking(true);
    }
    // useEffect(() => {
    //     socket.on("response", (response) => {
    //         console.log(response);
    //         setIsThinking(false);
    //     })
    //     return () => {
    //         socket.off("response");
    //     };
    // }, [])

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="message">
                    <span className="messageTitle">
                        <Link className="messagePath" reloadDocument to="/userDashboard">Dashboard</Link> {'>'} Chatbot
                    </span>
                    <div className="chatPage">
                        <div id="chatScroll" className="messageContainer">

                            <div className="messages">
                                {/* {
                                    messages.loading == false && messages.err == null && messages.results && messages.results.length > 0 && (
                                        messages.results.map((message) => (
                                            <> */}
                                                <div className="item owner">
                                                    {/* <Link reloadDocument to={message.senderType == "client" ? "/profile/" + conversationData.results.client._id : "/profile/" + conversationData.results.freelancer._id}> */}
                                                        <img
                                                            src={user.image_url}
                                                        />
                                                    {/* </Link> */}
                                                    <p>
                                                        Hi
                                                    </p>
                                                </div>

                                                <div className="item">
                                                    {/* <Link reloadDocument to={message.senderType == "client" ? "/profile/" + conversationData.results.client._id : "/profile/" + conversationData.results.freelancer._id}> */}
                                                        <img
                                                            src="./img/chatbot1.png"
                                                        />
                                                    {/* </Link> */}
                                                    <div className='chatbotMessage'>
                                                        {isThinking ?
                                                            <p>
                                                                Thinking...
                                                            </p>
                                                        : <></>}
                                                    </div>
                                                </div>
                                            {/* </>
                                        ))
                                    )
                                } */}
                            </div>
                        </div>
                        <hr />
                        <div className="sendContainer">
                            <div className="write">
                                <input type="text" onChange={(e) => setMessage(e.target.value)} />
                            </div>
                            <>
                                <button type="submit" className="sendButton">Send</button>
                            </>
                        </div>
                    </div>
                </div>
            </form>
            {/* <form onSubmit={handleSubmit}>
                <input type="text" onChange={(e) => setMessage(e.target.value)} />
                <button type="submit">Send</button>
                {isThinking ? <p>Thinking...</p> : <></>}
            </form> */}
        </>
    )
}

export default Chatbot