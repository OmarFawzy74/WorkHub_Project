import React from 'react'
import "./RightBar.scss"

const RightBar = () => {
  return (
    <div className='rightbar'>
      <div className="rightbarContainer">
        <div className="imgContainer_1">
          <img className='firstImg' src="/img/image_1.jpg" />
          <span className="imgText_1">Freelance services at your fingertips!</span>
        </div>
        <div className="imgContainer_2">
          <img className='secondImg' src="/img/image_2.jpg" />
          <span className="imgText_2">Find talent <br />your way</span>
        </div>
      </div>
    </div>
  )
}

export default RightBar