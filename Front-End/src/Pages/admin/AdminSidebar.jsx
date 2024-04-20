import React from 'react'
import {
BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill,
BsListCheck, BsMenuButtonWideFill, BsFillGearFill
}
    from 'react-icons/bs'
import './AdminSidebar.scss'
import { Link, useNavigate } from 'react-router-dom'
import { getAuthUser, removeAuthUser } from '../../localStorage/storage';
import axios from 'axios';

const AdminSidebar = ({ openSidebarToggle, OpenSidebar }) => {
    const user = getAuthUser()
    const navigate = useNavigate();

    const userLogout = (e) => {
        e.preventDefault();
        const userId = user._id;
        console.log(userId);
        axios.put("http://localhost:3000/api/auth/logout/" + userId)
        .then((resp) => {
          console.log(resp);
          removeAuthUser();
          navigate("/");
        }).catch((errors) => {
          console.log(errors);
        })
      }

    return (
        <aside id="sidebar" className={openSidebarToggle ? "admin-sidebar-responsive" : "sidebar-closed"}>
            <div className='sidebar-title'>
                <div className='sidebar-brand'>
                    <img src="/img/Logo.png" className='icon_header'/>
                    <h1 className='adminLogoName'>WorkHub</h1>
                </div>
                <img src="/img/close.png" className='icon close_icon' onClick={OpenSidebar} />
                {/* <h2 className='icon close_icon' onClick={OpenSidebar}>X</h2> */}
            </div>
            <div className='sidebarProfileImg'>
                <Link to={"/adminProfile"}>
                    <img src="/img/profile.jpg" className='iconSidebarProfile'/>
                </Link>    
                    <img src="/img/notifications.png" className='iconSidebarNotifications'/>
                    <img src="/img/logout.png" onClick={userLogout} className='iconSidebarLogout'/>
                </div>
            <ul className='sidebar-list'>
                <Link className='sidebarLinks' to="/adminDashboard">
                    <li className='sidebar-list-item'>
                        <BsGrid1X2Fill className='icon' /> Dashboard
                    </li>
                </Link>

                <Link className='sidebarLinks' to="/adminGigs">
                    <li className='sidebar-list-item'>
                        <BsFillArchiveFill className='icon' /> Services
                    </li>
                </Link>

                <Link className='sidebarLinks' to="/category">
                    <li className='sidebar-list-item'>
                        <BsFillGrid3X3GapFill className='icon' /> Categories
                    </li>
                </Link>

                <Link className='sidebarLinks' to="/clientList">
                    <li className='sidebar-list-item'>
                        <BsPeopleFill className='icon' /> Clients
                    </li>
                </Link>

                <Link className='sidebarLinks' to="/">
                    <li className='sidebar-list-item'>
                        <BsPeopleFill className='icon' /> Freelancers
                    </li>
                </Link>

                <Link className='sidebarLinks' to="/">
                    <li className='sidebar-list-item'>
                        <BsMenuButtonWideFill className='icon' /> Community
                    </li>
                </Link>

                <Link className='sidebarLinks' to="/manageLearn">
                    <li className='sidebar-list-item'>
                        <BsFillGearFill className='icon' /> Courses
                    </li>
                </Link>
            </ul>
        </aside>
    )
}
export default AdminSidebar