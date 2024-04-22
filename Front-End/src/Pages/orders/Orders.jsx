import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Orders.scss";
import Button from '@mui/material/Button';
import { getAuthUser, setAuthUser } from "../../localStorage/storage";
import axios from "axios";
import swal from "sweetalert";

const Orders = () => {
  const currentUser = {
    id: 1,
    username: "Anna",
    isSeller: false,
  };

  const { pathname } = useLocation();

  const user = getAuthUser();

  const navigate = useNavigate();

  const approve = () => {
    axios
    .post("http://localhost:3000/api/auth/signup/" + user.role, {

    })
    .then((resp) => {
      swal(
        "Congratulations you have Joined WorkHub Successfully",
        "",
        "success"
      );
      console.log(resp.data.message);
      console.log(resp.data.userData);
      setAuthUser(resp.data.userData);
      navigate("/gigs");
    })
    .catch((errors) => {
      swal(errors.response.data.message, "", "error");
      console.log(errors);
      console.log(errors.response.data.message);
    });
  }


  const [orders, setOrders] = useState({
    loading: false,
    results: null,
    err: null,
    reload: 0,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/orders/getUserOrders/" + user.role + "/" + user._id)
      .then((resp) => {
        console.log(resp);
        setOrders({ results: resp.data.ordersData, loading: false, err: null });
        console.log(orders.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [orders.reload]);


  const message = (e) => {
    const freelancerId = e;

    console.log(freelancerId);
    console.log(e.target.value);
    
    axios
    .post("http://localhost:3000/api/conversations/addConversation", {
      freelancer: freelancerId,
      client: user._id
    })
      .then((resp) => {
        const conversationId = resp.data.newConversationData[0]._id;
        // console.log(resp.data.newConversationData[0]._id);
        navigate("/message/" + conversationId);
      })
      .catch((errors) => {
        console.log(errors);
        navigate("/messages");
      });
  }

  // const decline = () => {
    
  // }

  return (
    <div className="orders">
      <div className="ordersContainer">
        <div className="title">
          <h1>{pathname=="/requests" ? "Requests" : "Orders"}</h1>
        </div>
        <table>
          <tr>
            <th>Service Image</th>
            <th>Service Title</th>
            <th>Price</th>
            <th>{user.role=="client" ? "Freelancer" : "Client"}</th>
            {pathname=="/orders" && <th>Contact</th>}
            {pathname=="/requests" && user.role=="client" && <th>Status</th>}
            {pathname=="/requests" && <th>Action</th>}
          </tr>

          {orders.results && orders.err == null && orders.loading == false &&
          orders.results.map((order) => (
          <tr>
            <td>
              <img
                className="image"
                src={order.serviceId.serviceCover_url}
                alt=""
              />
            </td>
            <td>{order.serviceId.serviceTitle}</td>
            <td>{order.serviceId.servicePrice}</td>
            <td>{user.role=="client" ? order.freelancerId.name : order.clientId.name}</td>
            { pathname=="/orders" &&
              <td>
                <button value={order.freelancerId._id} onClick={message} className="messageBtn">
                  <img className="message" src="./img/message.png" alt="" />
                </button>
              </td>
            }
          </tr>
        ))}
        </table>
      </div>
    </div>
  );
};

export default Orders;
