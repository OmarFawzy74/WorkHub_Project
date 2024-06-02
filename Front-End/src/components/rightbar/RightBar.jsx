import React from 'react'
import "./RightBar.scss"
import { getAuthUser } from '../../localStorage/storage';
import { Link, useParams } from 'react-router-dom';

const RightBar = ({ profile, item }) => {
  const user = getAuthUser();

  let { id } = useParams();

  const HomeRightbar = () => {
    return (
      <>
        <div className="imagesContainer">
          <div className="imgContainer_1">
            <img className='firstImg' src="/img/image_1.jpg" />
            <span className="imgText_1">Freelance services at your fingertips!</span>
          </div>
          <div className="imgContainer_2">
            <img className='secondImg' src="/img/image_2.jpg" />
            <span className="imgText_2">Find talent <br />your way</span>
          </div>
        </div>
      </>
    )
  }

  const ProfileRightbar = () => {
    return (
      <>
        <div className="rightbarInfo">
          <h4 className='rightbarTitle'>User information</h4>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Country:</span>
            <span className="rightbarInfoValue">{item.country}</span>
          </div>
         {user && item.role == "freelancer" && 
            <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">Specialization:</span>
                <span className="rightbarInfoValue">{item.specialization}</span>
              </div>
          }
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Email:</span>
            <span className="rightbarInfoValue">{item.email}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Go to WorkHub Profile:</span>
            <span className="rightbarInfoValue"><Link className='goToProfileLink' reloadDocument to={"/profile/" + id}>{item.name}'s Profile</Link></span>
          </div>
        </div>
      </>
    )
  }
  return (
    <div className='rightbar'>
      <div className="rightbarContainer">
      {profile ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  )
}

export default RightBar