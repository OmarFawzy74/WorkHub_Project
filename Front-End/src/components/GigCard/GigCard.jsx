import React from "react";
import "./GigCard.scss";
import { Link } from "react-router-dom";

const GigCard = ({ item }) => {
  return (
    <Link to={"/gig/" + item._id} className="link">
      <div className="gigCard">
        <img src={item.serviceCover_url} alt="" />
        <div className="info">
          <div className="user">
            <img src={item.freelancerId.image_url} alt="" />
            <span>{item.freelancerId.name}</span>
          </div>
          <p>{item.serviceTitle}</p>
          <div className="star">
            <img src="./img/star.png" alt="" />
            <span>{item.serviceShortTitle}</span>
          </div>
        </div>
        <hr />
        <div className="detail">
          <img src="./img/heart.png" alt="" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>
              $ {item.servicePrice}
              <sup>99</sup>
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
