import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Message.scss";
import axios from "axios";
import swal from "sweetalert";
import { getAuthUser } from "../../localStorage/storage";

const Message = () => {

  let { id } = useParams();

  const [message, setMessage] = useState({
    err: null,
    loading: false,
    data: "",
  });

  const user = getAuthUser();

  const sendMessage = () => {
    // e.preventDefault();
    axios
      .post("http://localhost:3000/api/messages/addMessage", {
        conversation: id,
        senderId: user._id,
        senderType: user.role,
        messageContent: message.data
      })
      .then((resp) => {
        // swal("Congratulations you have Joined WorkHub Successfully", "", "success");
        console.log(resp);
        setMessages({ ...messages, reload: messages.reload + 1});
        setMessage({ ...messages, data: ""});
        // console.log(resp.data.userData);
        // setAuthUser(resp.data.userData);
        // navigate("/gigs");
      })
      .catch((errors) => {
        // swal(errors.response.data.message, "", "error");
        console.log(errors);
        // console.log(errors.response.data.message);
      });
  }

  const [messages, setMessages] = useState({
    loading: true,
    results: null,
    err: null,
    status: null,
    reload: 0
  });


  useEffect(() => {
    axios.get("http://localhost:3000/api/messages/getConversationMessages/" + id)
      .then(
        resp => {
          console.log(resp);
          setMessages({ results: resp.data, loading: false, err: null });
        }
      ).catch(err => {
        setMessages({ ...messages, loading: false, err: err.response.data.errors });
      })
  }, [messages.reload]);


  return (
    <div className="message">
      <span className="messageTitle">
          <Link to="/messages">Messages</Link> {'>'} John Doe {'>'}
        </span>
    <div className="chatPage">   
      <div className="messageContainer">
        <div className="messages">
          {
            messages.loading == false && messages.err == null && messages.results && messages.results.length > 0 && (
              messages.results.map((message) => (
                <>
                  <div className={message.senderType == "client" ? "item owner" : "item"}>
                    <img
                      src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    />
                    <p>
                      {message.messageContent}
                    </p>
                  </div>
                </>
              ))
            )
          }
        </div>
      </div>
      <hr />
      <div className="sendContainer">
        <div className="write">
          <textarea value={message.data} type="text" placeholder="Write a message" onChange={(e) =>
            setMessage({ ...message, data: e.target.value })
          } />
        </div>
        <>
          <button className="sendButton" onClick={sendMessage}>Send</button>
        </>
      </div>
    </div> 
    </div>
  );
};

export default Message;
