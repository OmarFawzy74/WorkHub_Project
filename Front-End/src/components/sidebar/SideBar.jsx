import React from 'react'
import { Link } from 'react-router-dom'
import "./SideBar.scss"
import { getAuthUser } from '../../localStorage/storage'

const SideBar = () => {
  const user = getAuthUser()

  return (
    <div className='sidebar'>
      <div className="sidebarContainer">
        <ul className="sidebarList">
          <li className="sidebarListItem">
          {user &&
            <Link reloadDocument className='sidebarLink' to={"/communityProfile/" + user?._id} >
              <img className='sidebarProfileImg' src={user?.image_url} />
              <span className='sidebarListItemText'>{user?.name}</span>
            </Link>
          }
          </li>

          <li className="sidebarListItem">
            <Link reloadDocument className='sidebarLink' to="/community">
              <img className='sidebarIcon' src="/img/feed.png" />
              <span className='sidebarListItemText'>Feeds</span>
            </Link>
          </li>

          <li className="sidebarListItem">
            <Link reloadDocument className='sidebarLink' to="/">
              <img className='sidebarIcon' src="/img/chat.png" />
              <span className='sidebarListItemText'>Chats</span>
            </Link>
          </li>

          <li className="sidebarListItem">
            <Link reloadDocument className='sidebarLink' to="/">
              <img className='sidebarIcon' src="/img/groups.png" />
              <span className='sidebarListItemText'>Communities</span>
            </Link>
          </li>

          <li className="sidebarListItem">
            <Link reloadDocument className='sidebarLink' to="/gigs">
              <img className='sidebarIcon' src="/img/marketplace.png" />
              <span className='sidebarListItemText'>Marketplace</span>
            </Link>
          </li>

          <li className="sidebarListItem">
            <Link reloadDocument className='sidebarLink' to="/learn">
              <img className='sidebarIcon' src="/img/course.png" />
              <span className='sidebarListItemText'>Courses</span>
            </Link>
          </li>
        </ul>
        <hr className='sidebarHr-1' />
        <span className='sidebaMenuText'>Joined Communities</span>
        <hr className='sidebarHr-2' />
        <ul className="sidebarCommunityList">
          <li className="sidebarCommunity">
            <span className='sidebarCommunityName'>Graphics & Design</span>
            <button className='sidebarJoinButton'>Unjoin</button>
          </li>
          <li className="sidebarCommunity">
            <span className='sidebarCommunityName'>Video & Animation</span>
            <button className='sidebarJoinButton'>Unjoin</button>
          </li>
          <li className="sidebarCommunity">
            <span className='sidebarCommunityName'>Artificial Intelligence</span>
            <button className='sidebarJoinButton'>Unjoin</button>
          </li>
        </ul>
      </div>
      <span></span>
    </div>
  )
}

export default SideBar