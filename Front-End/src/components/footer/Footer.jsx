import React from "react";
import "./Footer.scss";
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className="footer">
      <div className="footerContainer">
        <div className="top">
          <div className="item">
            <h2>Categories</h2>
            <span>Graphics & Design</span>
            <span>Digital Marketing</span>
            <span>Writing & Translation</span>
            <span>Video & Animation</span>
            <span>Music & Audio</span>
            <span>Programming & Tech</span>
            <span>Data</span>
            <span>Business</span>
            <span>Lifestyle</span>
            <span>Photography</span>
            <span>Sitemap</span>
          </div>
          <div className="item">
            <h2>About</h2>
            <span>Press & News</span>
            <span>Partnerships</span>
            <Link className= 'link' to="/privacyPolicy"><span>Privacy Policy</span></Link>
            <span>Terms of Service</span>
            <span>Intellectual Property Claims</span>
            <span>Investor Relations</span>
            <Link className= 'link' to="/contactUs"><span>Contact Us</span></Link>
          </div>
          <div className="item">
            <h2>Support</h2>
            <span>Help & Support</span>
            <span>Trust & Safety</span>
            <span>Selling on WorkHub</span>
            <span>Buying on WorkHub</span>
          </div>
          <div className="item">
            <h2>Community</h2>
            <span>Customer Success Stories</span>
            <Link className= 'link' to="/community"><span>Community hub</span></Link>
            <span>Forum</span>
            <span>Events</span>
            <span>Blog</span>
            <span>Influencers</span>
            <span>Affiliates</span>
            <span>Podcast</span>
            <span>Invite a Friend</span>
            <span>Become a Seller</span>
            <span>Community Standards</span>
          </div>
          <div className="item">
            <h2>More From WorkHub</h2>
            <span>WorkHub Guides</span>
            <Link className= 'link' to="/learn"><span>Learn</span></Link>
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <h2>WorkHub</h2>
            <span>© WorkHub International Ltd. 2024</span>
          </div>
          <div className="right">
            <div className="social">
              <img src="/img/tiktok.png" alt="" /> 
              <img src="/img/instagram.png" alt="" />
              <img src="/img/linkedin.png" alt="" />
              <img src="/img/facebook.png" alt="" />
              <img src="/img/pinterest.png" alt="" />
              <img src="/img/twitter.png" alt="" />
            </div>
            <div className="link">
              <img src="/img/language.png" alt="" />
              <span>English</span>
            </div>
            <div className="link">
              <img src="/img/coin.png" alt="" />
              <span>USD</span>
            </div>
            <img src="/img/accessibility.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
