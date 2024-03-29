import React from 'react'
import "./Post.scss"

const Post = () => {
  return (
    <div className='post'>
      <div className="postContainer">
        <div className="postTop">
          <div className="postTopLeft">
          <img className='postProfileImg' src="/img/profile.jpg"/>
          <span className="postUsername">Abdelrahman Muhammed</span>
          <span className="postDate">5 mins ago</span>
          </div>
          <div className="postTopRight">
            <img className='postTopRightImg' src="/img/option.png"/>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">عايز يظهر فى فيديو ١٠ لاعبين خذلتهم كأس العاصمة الإدارية </span>
          <img className='postImg' src="/img/af4a.jpg" alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className='likeIcon' src="/img/likeReaction.png"/>
            <span className="postLikeCounter">100 people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">9 comments</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post