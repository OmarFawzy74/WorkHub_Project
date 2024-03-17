import React from "react";
import { Link } from "react-router-dom";
import "./Message.scss";

const Message = () => {
  return (
    <div className="message">
      <div className="messageContainer">
        <span className="messageTitle">
          <Link to="/messages">Messages</Link> {'>'} John Doe {'>'}
        </span>
        <div className="messages">
          <div className="item">
            <img
              src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
            />
            <p>
              How r u?
            </p>
          </div>
          <div className="item owner">
            <img
              src="https://images.pexels.com/photos/1115697/pexels-photo-1115697.jpeg?auto=compress&cs=tinysrgb&w=1600"
            />
            <p>
              i am fine and u
            </p>
          </div>
          <div className="item">
            <img
              src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
            />
            <p>
            i am good
            </p>
          </div>

        </div>
        <hr />
        <div className="write">
          <textarea type="text" placeholder="Write a message" />
          <button>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Message;
