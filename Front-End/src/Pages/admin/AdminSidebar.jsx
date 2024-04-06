import React from 'react'
import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill}
 from 'react-icons/bs'
 import './AdminSidebar.scss'

const AdminSidebar = ({openSidebarToggle, OpenSidebar}) => {
    return (
      <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : "sidebar-closed"}>
          <div className='sidebar-title'>
              <div className='sidebar-brand'>
                 <img src="/img/Logo.png" className='icon_header'/>
                 <h1 className='adminLogoName'>WorkHub</h1>
              </div>
              <img src="/img/close.png" className='icon close_icon' onClick={OpenSidebar}/>
              {/* <h2 className='icon close_icon' onClick={OpenSidebar}>X</h2> */}
          </div>
  
          <ul className='sidebar-list'>
              <li className='sidebar-list-item'>
                  <a href="/adminDashboard">
                      <BsGrid1X2Fill className='icon'/> Dashboard
                  </a>
              </li>
              <li className='sidebar-list-item'>
                  <a href="/adminGigs">
                      <BsFillArchiveFill className='icon'/> Services
                  </a>
              </li>
              <li className='sidebar-list-item'>
                  <a href="/category">
                      <BsFillGrid3X3GapFill className='icon'/> Categories
                  </a>
              </li>
              <li className='sidebar-list-item'>
                  <a href="">
                      <BsPeopleFill className='icon'/> Clients
                  </a>
              </li>
              <li className='sidebar-list-item'>
                  <a href="">
                      <BsPeopleFill className='icon'/> Freelancers
                  </a>
              </li>
              {/* <li className='sidebar-list-item'>
                  <a href="">
                      <BsListCheck className='icon'/> Inventory
                  </a>
              </li> */}
              <li className='sidebar-list-item'>
                  <a href="">
                      <BsMenuButtonWideFill className='icon'/> Community
                  </a>
              </li>
              <li className='sidebar-list-item'>
                  <a href="">
                      <BsFillGearFill className='icon'/> Courses
                  </a>
              </li>
          </ul>
      </aside>
    )
  }
  

export default AdminSidebar