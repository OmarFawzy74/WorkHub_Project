import React from "react";
import { Link } from "react-router-dom";
import "./MyCourses.scss";

function MyCourses() {

  return (
    <div className="myCourses">
      <div className="title">
          <h1>Enrolled Courses</h1>
      </div>
      <div className="myCoursesContainer">
        <Link to="/course/123" className="myCoursesLink">
          <div className="learnCard">
            <img className='learnImg' src="/img/image_1.jpg"/>
            <div className="courseInfo">
              <div className="card-badge">course</div>
              <p>My Course</p>
              <div className="star">
                <img src="./img/star.png" alt="" />
                <span className="reviewNo">69</span>
                <div className="courseDuration">
                  <img
                    className="hourIconOut"
                    src="/img/hour.png"
                  />
                  <span className="courseDurationNo">90 Minutes</span>
                </div>
              </div>
              <div className="professorName">
                <span>Mana</span>
              </div>
              <div className="professorDesc">
                <span>World's top marketer by Forbes, Entrepreneur and Inc Magazines; Writer for Time Magazine with best-selling e-courses.</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default MyCourses;