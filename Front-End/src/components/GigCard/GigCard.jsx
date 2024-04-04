import React, { useState } from "react";
import "./GigCard.scss";
import { Link } from "react-router-dom";

const GigCard = ({ item }) => {

  const [openOption, setOpenOption] = useState(false)

  return (
    <div className="gigCardContainer">
        <div className="gigCardOptions" onClick={() => setOpenOption(!openOption)}>
          <img src="/img/more.png" />
          {openOption && <div className="exploreOptions">
            <>
              <div className='link' to="/gigs">Delete Service</div>
              <div className='link' to="/community">Update Service</div>
            </>
          </div>}
        </div>
        <Link to={"/gig/" + item._id} className="gigLink">
          <div className="gigCard">
            <img className="gigImg" src={item.serviceCover_url} />
            <div className="gigInfo">
              <div className="user">
                <div class="card-badge">WorkHub service</div>
                <img src={item.freelancerId.image_url} />
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
              <div className="price">
                <h2>
                  ${item.servicePrice}
                </h2>
              </div>
            </div>
          </div>
        </Link>
      </div>
  );
};

export default GigCard;
