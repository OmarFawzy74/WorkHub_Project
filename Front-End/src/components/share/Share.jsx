import React from 'react'
import { Link } from 'react-router-dom'
import "./Share.scss"

const Share = () => {

    return (
        <div className='share'>
            <div className="shareContainer">
                <div className="shareTop">
                    <Link reloadDocument to="/communityProfile">
                        <img className='shareProfileImg' src="/img/profile.jpg" alt="" />
                    </Link>
                    <input
                        placeholder="What's on your mind, Mana?"
                        className='shareInput'

                    />
                </div>
                <hr className='shareHr' />
                <div className="shareBottom">
                    <div className="shareOptions">
                        <div className="shareOption">
                            <img className='shareIcon' src="/img/photo.png" alt="" />
                            <span className='shareOptionText'>Photo/video</span>
                        </div>
                        <div className="shareOption">
                            <img className='shareIcon' src="/img/groups.png" />
                            <span className='shareOptionText'>Communities</span>
                        </div>
                    </div>
                    <button className='shareButton'>Post</button>
                </div>
            </div>
        </div>
    )
}

export default Share