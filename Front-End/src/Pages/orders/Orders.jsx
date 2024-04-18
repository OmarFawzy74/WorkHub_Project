import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Orders.scss";
import Button from '@mui/material/Button';
import { getAuthUser } from "../../localStorage/storage";

const Orders = () => {
  const currentUser = {
    id: 1,
    username: "Anna",
    isSeller: false,
  };

  const { pathname } = useLocation();

  const user = getAuthUser();

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
            <th>Contact</th>
            {pathname=="/requests" && user.role=="client" && <th>Status</th>}
            {pathname=="/requests" &&<th>Action</th>}
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
            <td>
              <img className="message" src="./img/message.png" alt="" />
            </td>
            {pathname=="/requests" && user.role=="client" && <td>Pending</td>}
            {pathname=="/requests" && <td><Button variant="contained" className="approveBtn">Approve</Button> <Button variant="contained" className="delcineBtn">Decline</Button></td>}
          </tr>
          <tr>
            <td>
              <img
                className="image"
                src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
            </td>
            <td>Ai generated concept art</td>
            <td>79.<sup>99</sup></td>
            <td>Francisco Chang</td>
            <td>
              <img className="message" src="./img/message.png" alt="" />
            </td>
            {pathname=="/requests" && user.role=="client" && <td>Pending</td>}

            {pathname=="/requests" && <td><Button variant="contained" className="approveBtn">Approve</Button> <Button variant="contained" className="delcineBtn">Decline</Button></td>}
          </tr>
          <tr>
            <td>
              <img
                className="image"
                src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
            </td>
            <td>High quality digital character</td>
            <td>110.<sup>99</sup></td>
            <td>Roland Mendel</td>
            <td>
              <img className="message" src="./img/message.png" alt="" />
            </td>
            {pathname=="/requests" && <td><Button variant="contained" className="approveBtn">Approve</Button> <Button variant="contained" className="delcineBtn">Decline</Button></td>}
          </tr>
          <tr>
            <td>
              <img
                className="image"
                src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
            </td>
            <td>Illustration hyper realistic painting</td>
            <td>39.<sup>99</sup></td>
            <td>Helen Bennett</td>
            <td>
              <img className="message" src="./img/message.png" alt="" />
            </td>
          </tr>
          <tr>
            <td>
              <img
                className="image"
                src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
            </td>
            <td>Original ai generated digital art</td>
            <td>119.<sup>99</sup></td>
            <td>Yoshi Tannamuri</td>
            <td>
              <img className="message" src="./img/message.png" alt="" />
            </td>
          </tr>
          <tr>
            <td>
              <img
                className="image"
                src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
            </td>
            <td>Text based ai generated art</td>
            <td>49.<sup>99</sup></td>
            <td>Giovanni Rovelli</td>
            <td>
              <img className="message" src="./img/message.png" alt="" />
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Orders;
