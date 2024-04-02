import React from "react";
import "./LearnCard.scss";
import { Link } from "react-router-dom";

const LearnCard = ({ item }) => {
  return (
    <Link to="/course/123" className="learnLink">
      <div className="learnCard">
        <img className='learnImg' src={item.img} alt="" />
        <div className="courseInfo">
          <div className="courseName">
          <div class="card-badge">course</div>
            <span>{item.username}</span>
          </div>
          <p>{item.desc}</p>
          <div className="star">
            <img src="./img/star.png" alt="" />
            <span>{item.star}</span>
          </div>
        </div>
        <hr />
        <div className="detail">
          <div className="price">
            <h2>
            <sup>$</sup>{item.price}
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LearnCard;
