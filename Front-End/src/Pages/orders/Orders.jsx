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

  // const approve = () => {
  //   axios
  //   .post("http://localhost:3000/api/auth/signup/" + user.role, {

  //   })
  //   .then((resp) => {
  //     swal(
  //       "Congratulations you have Joined WorkHub Successfully",
  //       "",
  //       "success"
  //     );
  //     console.log(resp.data.message);
  //     console.log(resp.data.userData);
  //     setAuthUser(resp.data.userData);
  //     navigate("/gigs");
  //   })
  //   .catch((errors) => {
  //     swal(errors.response.data.message, "", "error");
  //     console.log(errors);
  //     console.log(errors.response.data.message);
  //   });
  // }


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
    let freelancerId;
    let clientId;

    if(user.role == "client") {
      freelancerId = e.target.value;
      clientId = user._id;
    }

    if(user.role == "freelancer") {
      freelancerId = user._id;
      clientId = e.target.value;
    }

    // var actualConversationId;

    axios
    .post("http://localhost:3000/api/conversations/addConversation", {
      freelancer: freelancerId,
      client: clientId
    })
      .then((resp) => {
        const conversationId = resp.data.newConversationData[0]._id;
        window.location = "http://localhost:3001/message/" + conversationId
      })
      .catch((errors) => {
        console.log(errors);
        const conversationId = errors.response.data.conversationData._id;
        window.location = "http://localhost:3001/message/" + conversationId
      });
  }

  // const decline = () => {
    
  // }

  return (
    <div className="orders">
      <div className="ordersContainer">
        <div className="title">
          <h1><Link reloadDocument className="breadcrumbsLink" to={"/gigs"}><img className="homeIconImg" src="./img/marketplace-1.png" /> Marketplace {'>'} </Link>{pathname=="/requests" ? "Requests" : "Orders"}</h1>
        </div>
        <table>
          <tr>
          <th>{user.role=="client" ? "Freelancer" : "Client"}</th>
            <th>Service Image</th>
            <th>Service Title</th>
            <th>Price</th>
            <th>Contact</th>
            <th>Order Status</th>
            {user.role=="client" && <th>Status</th>}
            <th>Action</th>
          </tr>

          {orders.results && orders.err == null && orders.loading == false &&
          orders.results.map((order) => (
          <tr>
            <td><Link reloadDocument className="link" to={user.role == "client" ? "/profile/" + order?.freelancerId._id : "/profile/" + order?.clientId._id }>{user.role == "client" ? order.freelancerId.name : order.clientId.name}</Link></td>
            <td>
            <Link reloadDocument to={"/gig/" + order?.serviceId._id}>
                <img
                    className="image"
                    src={order.serviceId.serviceCover_url}
                    alt=""
                />
            </Link> 
            </td>
            <td>{order.serviceId.serviceTitle}</td>
            <td>{order.serviceId.servicePrice}</td>
            { pathname=="/orders" &&
              <td>
                <button value={user.role == "freelancer" ? order.clientId._id : order.freelancerId._id} onClick={message} className="messageBtn">
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
