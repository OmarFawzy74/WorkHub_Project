import React from "react";
import "./LearnCard.scss";
import { Link } from "react-router-dom";

const LearnCard = ({ item }) => {
  return (
    <Link to="/course/123" className="learnLink">
      <div className="learnCard">
        <img className='learnImg' src={item.img} alt="" />
        <div className="courseInfo">
          <div className="card-badge">course</div>
          <p>{item.desc}</p>
          <div className="star">
            <img src="./img/star.png" alt="" />
            <span className="reviewNo">{item.star}</span>
            <div className="courseDuration">
              <img
                className="hourIconOut"
                src="/img/hour.png"
              />
              <span className="courseDurationNo">1.5 Hours</span>
            </div>
          </div>
          <div className="professorName">
            <span>{item.username}</span>
          </div>
          <div className="professorDesc">
            <span>World's top marketer by Forbes, Entrepreneur and Inc Magazines; Writer for Time Magazine with best-selling e-courses.</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LearnCard;
