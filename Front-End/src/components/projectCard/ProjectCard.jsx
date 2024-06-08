import React from "react";
import "./ProjectCard.scss";
import { Link } from "react-router-dom";

function ProjectCard({ card }) {
  return (
    <Link className="projectCard" reloadDocument to= {"/gig/" + card.id}>
      <img src={card.img} alt="" />
      <div className="info">
        <img src={card.pp} alt="" />
        <div className="texts">
          <h2>{card.cat}</h2>
          <span>{card.username}</span>
        </div>
      </div>
    </Link>
  );
}

export default ProjectCard;

