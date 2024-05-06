import React, { useEffect, useRef, useState } from 'react'
import "./Feed.scss"
import Share from '../share/Share'
import Post from '../post/Post'
import { Link, useParams } from 'react-router-dom'
import { getAuthUser } from '../../localStorage/storage'
import axios from 'axios'
import { processDate } from '../../Pages/messages/Messages'
import swal from 'sweetalert'
import Button from '@mui/material/Button';

const Feed = (data) => {
  const user = getAuthUser()

  let { id } = useParams();

  const [like, setLike] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [commentOpen, setCommentOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

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

  const [post, setPost] = useState({
    loading: true,
    err: null,
    caption: "",
    posterType: "",
    posterId: "",
    communityId: "",
    reload: 0
  });

  const media = useRef(null);

  const uploadMedia = (id) => {

    const formData = new FormData();
    formData.append("media", media.current.files[0]);

    // for (let i = 0; i < coverImage.current.files.length; i++) {
    //   formData.append("images", coverImage.current.files[i]);
    // }

    axios
      .put("http://localhost:3000/api/posts/uploadPostMedia/" + id, formData)
      .then((resp) => {
        // image.current.value = null;
        // swal(resp.data.message, "", "success");
        console.log(resp);
      })
      .catch((errors) => {
        // swal(errors.response.data.message, "", "error");
        console.log(errors);
        // console.log(errors.response.data.message);
      });
  }

  const addPostData = async (e) => {
    e.preventDefault();

    setPost({ ...post, loading: true, err: null });
    axios
      .post("http://localhost:3000/api/posts/addPost", {
        caption: post.caption,
        posterType: user.role,
        posterId: user._id,
        communityId: post.communityId,
      })
      .then((resp) => {
        setPosts({ reload: posts.reload + 1 });
        const postId = resp.data.savePost._id
        uploadMedia(postId);
        console.log(resp);
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  const [communities, setCommunities] = useState({
    loading: true,
    results: [],
    err: null,
    communityName: "",
    communityDesc: "",
    reload: 0
  });

  useEffect(() => {
    setCommunities({ ...communities, loading: true })
    axios.get("http://localhost:3000/api/communities/getAllCommunities")
      .then(
        resp => {
          // console.log(resp.data.allCommunities);
          setCommunities({ results: resp.data.allCommunities, loading: false, err: null });
          // console.log(resp);
        }
      ).catch(err => {
        setCommunities({ ...communities, loading: false, err: err.response.data.msg });
        console.log(err);
      })
  }, [communities.reload]);

  useEffect(() => {
    setPosts({ ...posts, loading: true })
    axios.get("http://localhost:3000/api/posts/getAllPosts")
      .then(
        resp => {
          console.log(resp.data.posts);
          setPosts({ results: resp.data.posts.reverse(), loading: false, err: null });
          // console.log(resp);
        }
      ).catch(err => {
        setPosts({ ...posts, loading: false, err: err.response.data.msg });
        console.log(err);
      })
  }, [posts.reload]);

  const deletePost = (e) => {
    e.preventDefault();
    const post_id = e.target.attributes.value.nodeValue;
    console.log(post_id);
    console.log(e);
    axios.delete("http://localhost:3000/api/posts/deletePost/" + post_id)
        .then(
            resp => {
                console.log(resp);
                swal(resp.data.msg, "", "success");
                setPosts({ ...posts, reload: posts.reload + 1 });
            }
        ).catch(error => {
            console.log(error);
        })
  }

  let clickedIndex;
  const handleOptionsMenu = (e) => {
    console.log(e);
    console.log(e.target.attributes.value.nodeValue);
    // clickedValue = e.target.attributes.value.nodeValue;
    setDeleteOpen(!deleteOpen);
    clickedIndex = e.target.attributes.value.nodeValue;
  }


  function Panel({ title, children }) {
    const [isActive, setIsActive] = useState(false);
    return (
      <section className="panel">
        <h3>{title}</h3>
        {isActive ? (
          <p>{children}</p>
        ) : (
          <button onClick={() => setIsActive(true)}>
            Show
          </button>
        )}
      </section>
    );
  }

  

  return (
    <div className='feed'>
      <div className="feedContainer">
        <form className='postFormContainer' onSubmit={addPostData} >
          <div className='share'>
            <div className="shareContainer">
              <div className="shareTop">
                {data.data &&
                  <Link reloadDocument to={"/communityProfile/" + data?.data._id} >
                    <img className='shareProfileImg' src={data?.data.image_url} />
                  </Link>
                }
                <input
                  placeholder="What's on your mind?"
                  className='shareInput'
                  required
                  onChange={(e) =>
                    setPost({ ...post, caption: e.target.value })
                  }
                />
              </div>
              <hr className='shareHr' />
              <div className="shareBottom">
                <div className="shareOptions">
                  <div className="shareOptionImg">
                    <img className='shareIcon' src="/img/photo.png" alt="" />
                    {/* <input id="fileInput" className='addPostImg' required type="file" ref={media} /> */}
                    <div className="fileInputContainer">
                      <input className='addPostImg' required type="file" ref={media} />
                      <span className="fileInputLabel">Upload Image</span>
                    </div>
                  </div>
                  <div className="shareOption">
                    <img className='shareIcon' src="/img/groups.png" />

                    <select
                      name="serviceCategoryId"
                      required
                      onChange={(e) =>
                        setPost({ ...post, communityId: e.target.value })
                      }
                      id="selectCategory"
                    >
                      <option value={""} disabled selected>
                        Select Community
                      </option>
                      {communities.loading == false &&
                        communities.err == null &&
                        communities.results &&
                        communities.results.length > 0 &&
                        communities.results.map((community) => (
                          <>
                            <option value={community._id}>
                              {community.communityName}
                            </option>
                          </>
                        ))}
                    </select>
                  </div>
                </div>
                <button type='submit' className='shareButton'>Post</button>
              </div>
            </div>
          </div>
        </form>

        {posts.loading == false &&
          posts.results.map((post, index) => ( 
            <>
              <div key={index} className='post'>
                <div className="postContainer">
                  <div className="postTop">
                    <div className="postTopLeft">
                     <Link reloadDocument to={"/communityProfile/" + post?.posterId._id}><img className='postProfileImg' src={post?.posterId.image_url} /></Link>
                     <Link className='link' reloadDocument to={"/communityProfile/" + post?.posterId._id}><span className="postUsername">{post?.posterId.name}</span></Link>
                      <span className="postDate">{processDate(post?.creationDate)} ago</span>
                    </div>
                    <div className="postTopRight">
                      <img
                          value={index} 
                          className="postTopRightImg"
                          src="/img/option.png"
                          onClick={handleOptionsMenu}
                      />
                      {deleteOpen && index == clickedIndex &&
                          <ul className="deletePostContainer">
                              <li
                                variant="contained"
                                className="sidebarDeleteList"
                                value={post._id} 
                                onClick={deletePost}     
                              >
                                Delete Post
                              </li>
                          </ul>
                      }
                  </div>
                  </div>
                  <div className="postCenter">
                    <span className="postText">{post?.caption}</span>
                    <img className='postImg' src={post?.media_url} alt="" />
                  </div>
                  <div className="postBottom">
                    <div className="postBottomLeft">
                      <img className='likeIcon' src="/img/likeReaction.png" onClick={likeHandler} />
                      <span className="postLikeCounter">{like} people like it</span>
                    </div>
                    <div className="postBottomRight">
                      <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
                        {/* <TextsmsOutlinedIcon /> */}
                        <Link><img className='commentsImg' src="/img/comment.png" alt="" /></Link>
                        <span>Comments</span>
                      </div>
                    </div>
                  </div>
                  {commentOpen &&
                    <div className="write">
                      <Link reloadDocument to={"/communityProfile/" + post?.posterId._id}><img className='profileImgComment' src={post?.posterId.image_url} alt="" /></Link>
                      <input
                        type="text"
                        placeholder="Write a comment"
                      // value={desc}
                      // onChange={(e) => setDesc(e.target.value)}
                      />
                      <img className='sendCommentImg' src="/img/sendComment.png" alt="" />
                      {/* <button onClick={handleClick}>Send</button> */}
                    </div>
                  }

                </div>
              </div>
            </>
          ))}
      </div>
    </div>
  )
}

export default Feed