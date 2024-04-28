import React from 'react'
import "./Feed.scss"
import Share from '../share/Share'
import Post from '../post/Post'
import { Link } from 'react-router-dom'
import { getAuthUser } from '../../localStorage/storage'

const Feed = (data) => {
  const user = getAuthUser()

  console.log(data);

  return (
    <div className='feed'>
      <div className="feedContainer">
        {/* <Share items={item} /> */}

        <div className='share'>
          <div className="shareContainer">
            <div className="shareTop">
              <Link reloadDocument to={"/communityProfile/" + data?.data._id} >
                <img className='shareProfileImg' src={data?.data.image_url}/>
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



        <Post />
        <Post />
        <Post />
      </div>
    </div>
  )
}

export default Feed