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



  const [requests, setRequests] = useState({
    loading: false,
    results: null,
    err: null,
    reload: 0,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/requests/getAllRequests")
      .then((resp) => {
        console.log(resp);
        // setServices({ results: resp.data.services, loading: false, err: null });
        // console.log(resp.data.services);
      })
      .catch((err) => {
        console.log(err);
        // setConversation({ ...conversation, loading: false, err: err.response.data.errors });
      });
  }, [requests.reload]);

  const decline = () => {
    
  }

  return (
    <div className="orders">
      <div className="ordersContainer">
        <div className="title">
          <h1>{pathname=="/requests" ? "Requests" : "Orders"}</h1>
        </div>
        <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            {<th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>}
            {pathname=="/orders" && <th>Contact</th>}
            {pathname=="/requests" && user.role=="client" && <th>Status</th>}
            {pathname=="/requests" && <th>Action</th>}
          </tr>
          <tr>
            <td>
              <img
                className="image"
                src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
            </td>
            <td>Stunning concept art</td>
            <td>59.<sup>99</sup></td>
            <td>Maria Anders</td>
            { pathname=="/orders" &&
              <td>
                <img className="message" src="./img/message.png" alt="" />
              </td>
            }
            {pathname=="/requests" && user.role=="client" && <td>Pending</td>}
            {pathname=="/requests" && 
              <td>
                <Button variant="contained" className="approveBtn" onClick={approve}>Approve</Button> 
                <Button variant="contained" className="delcineBtn" onClick={decline}>Decline</Button>
              </td>
            }
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Orders;
