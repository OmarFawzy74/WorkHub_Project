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
import Alert from '@mui/material/Alert';

const Feed = (data) => {
  const user = getAuthUser();

  let { id } = useParams();

  const [like, setLike] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [commentOpen, setCommentOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);



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

  const [joinedCommunities, setjoinedCommunities] = useState({
    loading: true,
    results: [],
    err: null,
    caption: "",
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
        // console.log(resp);
        document.querySelector("#addPostForm").reset();
        document.getElementById("selectCategory").value = "";

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
        const postId = resp.data.savePost._id;
        uploadMedia(postId);
        // console.log(resp);
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
          setCommunities({ results: resp.data.allCommunities, loading: false, err: null });
        }
      ).catch(err => {
        setCommunities({ ...communities, loading: false, err: err.response.data.msg });
        console.log(err);
      })
  }, [communities.reload]);

  useEffect(() => {
    setjoinedCommunities({ ...joinedCommunities, loading: true })
    if (user) {
      axios.get("http://localhost:3000/api/communities/getJoinedCommunities/" + user?._id + "/" + user?.role)
        .then(
          resp => {
            setjoinedCommunities({ results: resp.data.communitiesData, loading: false, err: null });
          }
        ).catch(err => {
          setjoinedCommunities({ ...joinedCommunities, loading: false, err: err.response.data.msg });
          console.log(err);
        })
    }
  }, [joinedCommunities.reload]);


  useEffect(() => {
    setPosts({ ...posts, loading: true })
    axios.get("http://localhost:3000/api/posts/getAllPosts")
      .then(
        resp => {
          setPosts({ results: resp.data.posts.reverse(), loading: false, err: null });
        }
      ).catch(err => {
        setPosts({ ...posts, loading: false, err: err.response.data.message });
        console.log(err);
      })
  }, [posts.reload]);


  const deletePost = (e) => {
    e.preventDefault();
    const post_id = e.target.attributes.value.nodeValue;
    axios.delete("http://localhost:3000/api/posts/deletePost/" + post_id)
      .then(
        resp => {
          swal(resp.data.msg, "", "success");
          setPosts({ reload: posts.reload + 1 });
        }
      ).catch(error => {
        console.log(error);
      })
  }

  function Panel({ data }) {
    const [isActive, setIsActive] = useState(false);
    return (
      <section className="panel">
        <img
          onClick={() => setIsActive(!isActive)}
          className="postTopRightImg"
          src="/img/option.png"
        />

        {isActive ? (
          <ul className="deletePostContainer">
            <li
              variant="contained"
              className="sidebarDeleteList"
              value={data._id}
              onClick={deletePost}
            >
              Delete Post
            </li>
          </ul>
        ) : null}
      </section>
    );
  }


  function LikeHandler({ data }) {
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
      const checkIfLiked = data.likes.some(id => id === user._id);
      setIsLiked(checkIfLiked);
    }, [data.likes, user._id]);

    const likeHandling = (e) => {
      const postId = e.target.attributes.value.nodeValue;
      if (isLiked == false) {
        axios
          .put("http://localhost:3000/api/posts/addLike/" + postId + "/" + user._id + "/" + user.role)
          .then((resp) => {
            // console.log(resp);
            setIsLiked(!isLiked);
            setPosts({reload: posts.reload + 1});
          })
          .catch((errors) => {
            console.log(errors);
          });
      } else {
        axios
          .put("http://localhost:3000/api/posts/removeLike/" + postId + "/" + user._id + "/" + user.role)
          .then((resp) => {
            // console.log(resp);
            setIsLiked(!isLiked);
            setPosts({reload: posts.reload + 1});
          })
          .catch((errors) => {
            console.log(errors);
          });
      }
    };

    return (
      <>
        <img
          value={data._id}
          className={isLiked ? "redHeartIcon" : "heartIcon"}
          src={isLiked ? "/img/redHeart.png" : "/img/heart.png"}
          onClick={likeHandling}
        />

        <span className="postLikeCounter">{data.likes.length} Likes</span>
      </>
    );
  }

  function CommentsPanel({ data }) {
    const [isActive, setIsActive] = useState(false);
    return (
      <div className="postBottom">
        <div className={isActive ? "activePostBottomLeft" : "postBottomLeft"}>
          <LikeHandler data={data}></LikeHandler>
        </div>
        <div className='postBottomRight'>

          <div className={isActive ? "activeItem" : "item"} onClick={() => setIsActive(!isActive)}>
            <img className="commentsImg" src="/img/comment.png" alt="" />
            <span>Comments</span>
          </div>

          {isActive ? (
            <div className={isActive ? "activeWrite" : "write"}>
              <Link reloadDocument to={"/communityProfile/" + post?.posterId._id}>
                <img
                  className="profileImgComment"
                  src={data?.posterId.image_url}
                  alt=""
                />
              </Link>
              <input
                type="text"
                placeholder="Write a comment"
              />
              <img className="sendCommentImg" src="/img/sendComment.png" alt="" />
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className='feed'>
      <div className="feedContainer">
        {user ?
            <form id='addPostForm' className='postFormContainer' onSubmit={addPostData} >
              <div className='share'>
                <div className="shareContainer">
                  <div className="shareTop">
                    {user &&
                      <Link reloadDocument to={"/communityProfile/" + user?._id} >
                        <img className='shareProfileImg' src={user?.image_url} />
                      </Link>
                    }
                    <input
                      placeholder={"What's on your mind " + user?.name + " ?"}
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
                          {joinedCommunities.loading == false &&
                            joinedCommunities.err == null &&
                            joinedCommunities.results &&
                            joinedCommunities.results.length > 0 &&
                            joinedCommunities.results.map((community) => (
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
        : null
        }

        {posts.loading == false &&
          posts.results &&
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
                      <Panel data={post} title={index}></Panel>
                    </div>
                  </div>
                  <div className="postCenter">
                    <span className="postText">{post?.caption}</span>
                    <img className='postImg' src={post?.media_url} alt="" />
                  </div>
                  <CommentsPanel data={post} title={index}></CommentsPanel>
                </div>
              </div>
            </>
          ))}
      </div>
      {posts.err !== null &&
        <div className='communityFilterAlert'>
          <Alert severity="info">{posts.err}</Alert>
        </div>
      }
    </div>
  )
}

export default Feed