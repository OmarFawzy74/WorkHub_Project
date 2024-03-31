import React from 'react'
import "./CommunityProfile.scss";
import SideBar from '../../components/sidebar/SideBar';
import Feed from '../../components/feed/Feed';
import RightBar from '../../components/rightbar/RightBar';

const CommunityProfile = () => {
    return (
        <div className='communityProfile'>
            <SideBar />
            <div className="communityProfileRight">
                <div className="communityProfileRightTop">
                    <div className="profileCover">
                        <img className='profileCoverImg' src="/img/image_2.jpg" alt="" />
                        <img className='profileUserImg' src="/img/profile.jpg" alt="" />
                    </div>
                    <div className="profileInfo">
                        <h4 className='profileInfoName'>Mana</h4>
                        <span className='profileInfoDesc'>I am software engineer</span>
                    </div>
                </div>
                <div className="communityProfileRightBottom">
                    <Feed />
                    <RightBar profile/>
                </div>
            </div>
        </div>
    )
}

export default CommunityProfile