import React, { useEffect, useState } from 'react'
import "./Post.scss"
import axios from 'axios'

const Post = () => {
  const [like, setLike] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1)
    setIsLiked(!isLiked)
  }

  const [posts, setPosts] = useState({
    loading: true,
    results: [],
    err: null,
    caption: "",
    reload: 0
  });

  useEffect(() => {
    setPosts({ ...posts, loading: true })
    axios.get("http://localhost:3000/api/posts/getAllPosts")
      .then(
        resp => {
          console.log(resp.data.posts);
          setPosts({ results: resp.data.posts, loading: false, err: null });
          // console.log(resp);
        }
      ).catch(err => {
        setPosts({ ...posts, loading: false, err: err.response.data.msg });
        console.log(err);
      })
  }, [posts.reload]);

  return (
    <div className='post'>
      <div className="postContainer">
        {posts.loading == false &&
          posts.results.map((post) => (
            <>
              <div className="postTop">
                <div className="postTopLeft">
                  <img className='postProfileImg' src="/img/profile.jpg" />
                  <span className="postUsername"></span>
                  <span className="postDate">5 mins ago</span>
                </div>
                <div className="postTopRight">
                  <img className='postTopRightImg' src="/img/option.png" />
                </div>
              </div>
              <div className="postCenter">
                <span className="postText">عايز يظهر فى فيديو ١٠ لاعبين خذلتهم كأس العاصمة الإدارية </span>
                <img className='postImg' src="/img/af4a.jpg" alt="" />
              </div>
              <div className="postBottom">
                <div className="postBottomLeft">
                  <img className='likeIcon' src="/img/likeReaction.png" onClick={likeHandler} />
                  <span className="postLikeCounter">{like} people like it</span>
                </div>
                <div className="postBottomRight">
                  <span className="postCommentText">9 comments</span>
                </div>
              </div>
            </>
          ))}
      </div>
    </div>
  )
}

export default Post