import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Messages.scss";
import { getAuthUser } from "../../localStorage/storage";
import axios from "axios";

const Messages = () => {
  
  const user = getAuthUser();

  const navigate = useNavigate();

  const [conversations, setConversations] = useState({
    loading: true,
    results: null,
    err: null,
    status: null,
    id: "",
    reload: 0
  });

  useEffect(() => {
    axios.get("http://localhost:3000/api/conversations/getConversationsByUserId/" + user._id)
      .then(
        resp => {
          // console.log(resp);
          console.log(resp.data);
          console.log(resp.data.result);
          let data = resp.data.result

          if(!Array.isArray(data)) {
            data = [resp.data.result];
          }

          setConversations({ results: data, loading: false, err: null });
        }
      ).catch(err => {
        console.log(err);
        // setConversation({ ...conversation, loading: false, err: err.response.data.errors });
      })
  }, [conversations.reload]);

  const openChat = (e) => {
    const conservationId = e.target.id;
    navigate("/message/" + conservationId);
  }


  const message = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
  maxime cum corporis esse aspernatur laborum dolorum? Animi
  molestias aliquam, cum nesciunt, aut, ut quam vitae saepe repellat
  nobis praesentium placeat.`;

  return (
    <div className="messages">
      <div className="messagesContainer">
        <div className="title">
          <h1>Messages</h1>
        </div>

        <table>

          <tr>
            <th className="userName">{user.role == "freelancer" ? "Client" : "Freelancer"}</th>
            <th className="lastMessage">Last Message</th>
            <th className="date">Date</th>
            <th className="action">Action</th>
          </tr>

          {conversations.loading == false &&
            conversations.err == null &&
            conversations.results &&
            conversations.results.length > 0 &&
            conversations.results.map((conversation) => (
              <>
                <tr className="active">
                  <td className="userNameData">{user.role == "freelancer" ? conversation.client.name : conversation.freelancer.name}</td>
                  <td className="lastMessageData">
                    <Link id={conversation._id} onClick={openChat} className="link">
                      {message.substring(0, 100)}...
                    </Link>
                  </td>
                  <td>1 hour ago</td>
                  <td>
                    <button>Mark as Read</button>
                  </td>
                </tr>
              </>
            ))}

          {/* <tr>
            <th>{user.role == "freelancer" ? "Client" : "Freelancer"}</th>
            <th>Last Message</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
          <tr className="active">
            <td>Charley Sharp</td>
            <td>
              <Link to="/message/123" className="link">
                {message.substring(0, 100)}...
              </Link>
            </td>
            <td>1 hour ago</td>
            <td>
              <button>Mark as Read</button>
            </td>
          </tr> */}
          {/* <tr className="active">
            <td>John Doe</td>

            <td>
              <Link to="/message/123" className="link">
                {message.substring(0, 100)}...
              </Link>
            </td>
            <td>2 hours ago</td>
            <td>
              <button>Mark as Read</button>
            </td>
          </tr>
          <tr>
            <td>Elinor Good</td>
            <td>
              <Link to="/message/123" className="link">
                {message.substring(0, 100)}...
              </Link>
            </td>
            <td>1 day ago</td>
          </tr>
          <tr>
            <td>Garner David </td>
            <td>
              <Link to="/message/123" className="link">
                {message.substring(0, 100)}...
              </Link>
            </td>
            <td>2 days ago</td>
          </tr>
          <tr>
            <td>Troy Oliver</td>
            <td>{message.substring(0, 100)}</td>
            <td>1 week ago</td>
          </tr> */}
        </table>
      </div>
    </div>
  );
};

export default Messages;
