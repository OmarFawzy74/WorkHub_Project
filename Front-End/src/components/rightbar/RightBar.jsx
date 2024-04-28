import React from 'react'
import "./RightBar.scss"

const RightBar = ({ profile, item }) => {

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
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Email:</span>
            <span className="rightbarInfoValue">{item.email}</span>
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