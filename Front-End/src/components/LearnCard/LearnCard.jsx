import React from "react";
import "./LearnCard.scss";
import { Link } from "react-router-dom";

const LearnCard = ({ item }) => {
  return (
    <Link to={"/course/" + item._id} className="learnLink">
      <div className="learnCard">
        <img className='learnImg' src={item.courseCoverImage_url} alt="" />
        <div className="courseInfo">
          <div className="card-badge">course</div>
          <p>{item.courseTitle}</p>
          <div className="star">
            <img src="./img/star.png" alt="" />
            <span className="reviewNo">{item.star}</span>
            <div className="courseDuration">
              <img
                className="hourIconOut"
                src="/img/hour.png"
              />
              <span className="courseDurationNo">{item.courseDuration} Minutes</span>
            </div>
          </div>
          <div className="professorName">
            <span>{item.proffName}</span>
          </div>
          <div className="professorDesc">
            <span>{item.ProffDesc}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LearnCard;
