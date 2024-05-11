import React, { useEffect, useRef, useState } from 'react'
import "../../components/feed/Feed.scss"
import { Link, useParams } from 'react-router-dom'
import { getAuthUser } from '../../localStorage/storage'
import axios from 'axios'
import { processDate } from '../../Pages/messages/Messages'
import SideBar from '../../components/sidebar/SideBar'
import RightBar from '../../components/rightbar/RightBar'
import swal from 'sweetalert'
import Alert from '@mui/material/Alert';

const CommunityFilter = (data) => {
    const user = getAuthUser()

    let { id } = useParams();

    const [like, setLike] = useState(0)
    const [isLiked, setIsLiked] = useState(false)
    const [commentOpen, setCommentOpen] = useState(false);

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
                communityId: id,
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
                    console.log(resp.data.allCommunities);
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
        axios.get("http://localhost:3000/api/posts/getCommunityPosts/" + id)
            .then(
                resp => {
                    console.log(resp.data.posts);
                    setPosts({ results: resp.data.posts.reverse(), loading: false, err: null });
                    // console.log(resp);
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
                    console.log(resp);
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
            <>
                {user && user._id == data.posterId._id &&
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
                }
            </>
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
                        setPosts({ reload: posts.reload + 1 });
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
                        setPosts({ reload: posts.reload + 1 });
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

        const [comment, setComment] = useState({
            loading: true,
            err: null,
            commentDesc: "",
            reload: 0,
            results: ""
        });

        const addCommentData = async (e) => {
            e.preventDefault();
            const postId = e.target.attributes.value.nodeValue;
            console.log(postId);
            setComment({ ...comment, loading: true, err: null });
            axios
                .put("http://localhost:3000/api/posts/addComment/" + postId + "/" + user._id + "/" + user.role, {
                    comment: comment.commentDesc,
                })
                .then((resp) => {
                    setComment({ results: resp.data, reload: posts.reload + 1 });
                    console.log(resp);
                })
                .catch((errors) => {
                    console.log(errors);
                });
        };

        return (
            <div className="postBottom">
                <div className={isActive ? "activePostBottomLeft" : "postBottomLeft"}>
                    <div>
                        <LikeHandler data={data}></LikeHandler>
                    </div>
                    <div className={isActive ? "activeItem" : "item"} onClick={() => setIsActive(!isActive)}>
                        <img className="commentsImg" src="/img/comment.png" alt="" />
                        <span>{data.comments.length} Comments</span>
                    </div>
                </div>
                <div className='postBottomRight'>
                    {isActive ? (
                        <>
                            {data.comments &&
                                <ul className="commentList">
                                    {data.comments.map((user) => (
                                        <li>
                                            <div className='userInfoCommentList'>
                                                <Link className='userInfoCommentListLink' reloadDocument to={"/communityProfile/" + user?._id}>
                                                    <img
                                                        className="profileImgCommentList"
                                                        src={user?.image_url}
                                                    />
                                                </Link>
                                            </div>
                                            <div className='nameCommentContainer'>
                                                <Link className='userInfoCommentListLink' reloadDocument to={"/communityProfile/" + user?._id}>
                                                    <span className='commentListUsername'>{user?.name}</span>
                                                </Link>
                                                <span>{user.comment}</span>
                                            </div>
                                            <span className='commentListDate'>50 m</span>
                                            <button className='deleteCommentBtn'><img className='deleteCommentImg' src="/img/delete.png"/></button> 
                                        </li>
                                    ))}
                                </ul>
                            }
                            <div className={isActive ? "activeWrite" : "write"}>
                                <form value={data._id} onSubmit={addCommentData} className='commentListForm'>
                                    <Link reloadDocument to={"/communityProfile/" + data?.posterId._id}>
                                        <img
                                            className="profileImgComment"
                                            src={data?.posterId.image_url}
                                            alt=""
                                        />
                                    </Link>
                                    <input
                                        type="text"
                                        placeholder="Write a comment"
                                        required
                                        onChange={(e) =>
                                            setComment({ ...comment, commentDesc: e.target.value })
                                        }
                                    />
                                    <button type='submit' className='sendCommentButton'><img className="sendCommentImg" src="/img/sendComment.png" alt="" /></button>

                                </form>
                            </div>
                        </>
                    ) : null}
                </div>
            </div>
        );
    }

    const checkMedia = (data) => {
        const processedData = data.split(".");
        console.log(processedData);
        if (processedData[1] == "mp4") {
            return "video"
        }
        else {
            return "image"
        }
    }

    return (
        <div className='communityPage'>
            {posts.results[0] &&
                <h1>{posts?.results[0].communityId.communityName} Community</h1>
            }
            <div className="communityContainer">
                <SideBar />
                <div className='feed'>
                    <div className="feedContainer">
                        {user ?
                            <form className='postFormContainer' onSubmit={addPostData} >
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
                                                <div className="communityfilterShareOptionImg">
                                                    <img className='shareIcon' src="/img/photo.png" alt="" />
                                                    <div className="fileInputContainer">
                                                        <input className='addPostImg' required type="file" accept="video/,image/" ref={media} />
                                                        <span className="communityfilterFileInputLabel">Upload Media</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <button type='submit' className='communityfilterShareButton'>Post</button>
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
                                                </div>
                                                <span className="postDate">{processDate(post?.creationDate)} ago</span>
                                                <div className="postTopRight">
                                                    <Panel data={post} title={index}></Panel>
                                                </div>
                                            </div>
                                            <div className="postCenter">
                                                <span className="postText">{post?.caption}</span>
                                                {checkMedia(post?.media_url) == "image" ?
                                                    <img className='postImg' src={post?.media_url} />
                                                    :
                                                    <video className='postImg' src={post.media_url} controls></video>
                                                }                                            </div>
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
                <RightBar />
            </div>
        </div>




    )
}

export default CommunityFilter