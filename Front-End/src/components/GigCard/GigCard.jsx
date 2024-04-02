import React from "react";
import "./GigCard.scss";
import { Link } from "react-router-dom";

const GigCard = ({ item }) => {
  return (
    <Link to="/gig/123" className="gigLink">
      <div className="gigCard">
        <img className="gigImg" src={item.serviceCover_url} alt="" />
        <div className="gigInfo">
          <div className="user">
          <div class="card-badge">WorkHub service</div>
            <img src={item.serviceCover_url} alt="" />
            <span>{item.serviceTitle}</span>
          </div>
          <p>{item.serviceDesc}</p>
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
