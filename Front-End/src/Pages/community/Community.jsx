import React from 'react'
import "./Community.scss"
import SideBar from '../../components/sidebar/SideBar'
import Feed from '../../components/feed/Feed'
import RightBar from '../../components/rightbar/RightBar'

const Community = () => {
    return (
        <div className="communityContainer">
            <SideBar />
            <Feed />
            <RightBar />
        </div>
    )
}

export default Community