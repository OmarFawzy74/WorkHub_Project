import React from 'react'
import "../community/Community.scss"
import SideBar from '../../components/sidebar/SideBar'
import Feed from '../../components/feed/Feed'
import RightBar from '../../components/rightbar/RightBar'
import { getAuthUser } from '../../localStorage/storage'

const AdminCommunity = () => {
    const user = getAuthUser();

    return (
        <div className='communityPage'>
            <h1>Community</h1>
            <div className="communityContainer">
                <SideBar />
                <Feed/>
                {/* <RightBar /> */}
            </div>
        </div>
    )
}

export default AdminCommunity