import React from 'react'
import "./SideBar.scss"

const SideBar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebarWrapper">
          <ul className="sidebarList">
            <li className="sidebarListItem">
            <img className='sidebarIcon' src="/img/feed.png"/> 
            <span className='sidebarListItemText'>Feeds</span>
            </li>

            <li className="sidebarListItem">
            <img className='sidebarIcon' src="/img/chat.png"/> 
            <span className='sidebarListItemText'>Chats</span>
            </li>

            <li className="sidebarListItem">
            <img className='sidebarIcon' src="/img/groups.png"/> 
            <span className='sidebarListItemText'>Communities</span>
            </li>

            <li className="sidebarListItem">
            <img className='sidebarIcon' src="/img/marketplace.png"/> 
            <span className='sidebarListItemText'>Marketplace</span>
            </li>

            <li className="sidebarListItem">
            <img className='sidebarIcon' src="/img/course.png"/> 
            <span className='sidebarListItemText'>Courses</span>
            </li>
          </ul>
        </div>
    </div>
  )
}

export default SideBar