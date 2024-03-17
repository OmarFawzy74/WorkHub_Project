import React, { useEffect, useState } from 'react'
import "./Navbar.scss"
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {

  const [active, setActive] = useState(false)
  const [activeMenu, setActiveMenu] = useState(false)
  const [learnMenu, setLearnMenu] = useState(false)


  const [open, setOpen] = useState(false)

  const [openExplore, setOpenExplore] = useState(false)


  const { pathname } = useLocation()

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  const isActiveMenu = () => {
    window.scrollY > 200 ? setActiveMenu(true) : setActiveMenu(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);

    return () => {
      window.removeEventListener("scroll", isActive);
    };

  }, []);

  useEffect(() => {
    window.addEventListener("scroll", isActiveMenu);

    return () => {
      window.removeEventListener("scroll", isActiveMenu);
    };

  }, []);


  const currentUser = {
    id: 1,
    username: "Mana",
    isSeller: true
  }

  return (
    <div className={active || pathname !== "/" ? "navbar active activeMenu" : "navbar"} >
      <div className='navbarContainer'>
        <Link to="/" className='link'>
          <div className="logo">
            <img className='WH' src="/img/Logo.png" />
            <span className='text'>WorkHub</span>
            <span className='dot'>.</span>
          </div>
        </Link>
        <div className="links">

          <div className="user" onClick={() => setOpenExplore(!openExplore)}>
            <span>Explore</span>
            {openExplore && <div className="exploreOptions">
                <>
                  <Link className='link' to="/gigs"><span>Marketplace</span></Link>
                  <Link className='link' to="/">Community</Link>
                  <Link className='link' to="/learn">Learn</Link>
                </>
            </div>}
          </div>

          <span><img className="languageIcon" src= {!active && pathname == "/" ? "/img/newLanguage.png" : "/img/language.png"}/> English</span>
          {!currentUser?.isSeller && <Link className='link' to="/login">Sign in</Link>}
          {!currentUser?.isSeller && <Link className='link' to="/register"><button className='joinButton'>Join</button></Link>}
          {currentUser?.isSeller && (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src="/img/profile.jpg" />
              <span>{currentUser?.username}</span>
              {open && <div className="options">
                {currentUser?.isSeller && (
                  <>
                    <Link className='link' to="/mygigs">My Services</Link>
                    <Link className='link' to="/add">Add New Service</Link>
                  </>
                )}
                <Link className='link' to="/orders">Orders</Link>
                <Link className='link' to="/messages">Messages</Link>
                <Link className='link'>Logout</Link>
              </div>}
            </div>
          )}
        </div>
      </div>
      {(activeMenu && pathname !== "/learn" && pathname == "/" || pathname == "/gigs" ) && (
        <>
          <div className="search">
            <div className="searchInput">
              <img src="./img/search.png" alt="" />
              <input type="text" placeholder='What service are you looking  for today?' />
            </div>
            <button>Search</button>
          </div>
          <div className='menu'>
            <Link className='menuLink' to="/">
              Graphics & Design
            </Link>
            <Link className='menuLink' to="/">
              Video & Animation
            </Link>
            <Link className='menuLink' to="/">
              Writing & Translation
            </Link>
            <Link className='menuLink' to="/">
              AI Services
            </Link>
            <Link className='menuLink' to="/">
              Digital Marketing
            </Link>
            <Link className='menuLink' to="/">
              Music & Audio
            </Link>
            <Link className='menuLink' to="/">
              Programming & Tech
            </Link>
            <Link className='menuLink' to="/">
              Business
            </Link>
            <Link className='menuLink' to="/">
              Lifestyle
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar