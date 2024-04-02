import React from "react";
import "./GigCard.scss";
import { Link } from "react-router-dom";

const GigCard = ({ item }) => {
  return (
<<<<<<< HEAD
    <Link to={"/gig/" + item._id} className="link">
=======
    <Link to="/gig/123" className="gigLink">
>>>>>>> ed27357f60e5344996d88789ebe56e4edec7ca55
      <div className="gigCard">
        <img className="gigImg" src={item.serviceCover_url} alt="" />
        <div className="gigInfo">
          <div className="user">
<<<<<<< HEAD
            <img src={item.freelancerId.image_url} alt="" />
            <span>{item.freelancerId.name}</span>
=======
          <div class="card-badge">WorkHub service</div>
            <img src={item.serviceCover_url} alt="" />
            <span>{item.serviceTitle}</span>
>>>>>>> ed27357f60e5344996d88789ebe56e4edec7ca55
          </div>
          <p>{item.serviceTitle}</p>
          <div className="star">
            <img src="./img/star.png" alt="" />
            <span>{item.serviceShortTitle}</span>
          </div>
        </div>
        <hr />
        <div className="detail">
          <div className="price">
            <h2>
             ${item.servicePrice}
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
