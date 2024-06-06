import React, { useEffect, useState } from 'react';
import "./Home.scss";
import Featured from '../../components/featured/Featured';
import TrustedBy from "../../components/trustedBy/TrustedBy";
// import { cards1, cards2, projects1, projects2 } from "../../data";
import {Data} from "../../data";
import CatCard from '../../components/catCard/CatCard';
import ProjectCard from '../../components/projectCard/ProjectCard';
import axios from 'axios';

const Home = () => {

  console.log(getCardsData());


  return (
    <div className='home'>
      <Featured />
      <TrustedBy />
      <div className="homeCards">
        <div className="homeCardsHeader">
          <h1>Popular services</h1>
        </div>
        <div className="card1">
                {Data().map((card) => (
                  <CatCard key={card.id} card={card}/>
                ))}
        </div>       
        {/* <div className="card2">
          {cards2.map((card) => (
            <CatCard key={card.id} card={card} />
          ))}
        </div> */}
      </div>
      <div className="features">
        <div className="featuresContainer">
          <div className="left">
            <h1>The best part? Everything.</h1>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Stick to your budget
            </div>
            <p>Find the right service for every price point. No hourly rates, just project-based pricing.</p>

            <div className="title">
              <img src="./img/check.png" alt="" />
              Get quality work done quickly
            </div>
            <p>Hand your project over to a talented freelancer in minutes, get long-lasting results.</p>

            <div className="title">
              <img src="./img/check.png" alt="" />
              Pay when you're happy
            </div>
            <p>Upfront quotes mean no surprises. Payments only get released when you approve.</p>

            <div className="title">
              <img src="./img/check.png" alt="" />
              Count on 24/7 support
            </div>
            <p>Our round-the-clock support team is available to help anytime, anywhere.</p>
          </div>
          <div className="right">
            <video src="./img/video.mp4" controls></video>
          </div>
        </div>
      </div>
      <div className='proCardHeader'><h2>Inspiring work made on WorkHub</h2></div>
      {/* <div className="project1">
        {projects1.map((card) => (
          <ProjectCard key={card.id} card={card} />
        ))}
      </div>
      <div className="project2">
        {projects2.map((card) => (
          <ProjectCard key={card.id} card={card} />
        ))}
      </div> */}
    </div>
  )
}

export default Home