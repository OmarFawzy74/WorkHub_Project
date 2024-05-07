import React, { useEffect, useRef, useState } from 'react'
import "./CommunityProfile.scss";
import "../community/Community.scss";
import SideBar from '../../components/sidebar/SideBar';
import Feed from '../../components/feed/Feed';
import RightBar from '../../components/rightbar/RightBar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getAuthUser } from '../../localStorage/storage';
import { processDate } from '../messages/Messages';
import swal from 'sweetalert';
import Alert from '@mui/material/Alert';

const CommunityProfile = (data) => {

    const user = getAuthUser()

    let { id } = useParams();

    const [commentOpen, setCommentOpen] = useState(false);

    const [like, setLike] = useState(0)

    const [isLiked, setIsLiked] = useState(false)

    const likeHandler = () => {
        setLike(isLiked ? like - 1 : like + 1)
        setIsLiked(!isLiked)
    }

    const [freelancer, setFreelancer] = useState({
        loading: true,
        results: null,
        err: null,
        reload: 0,
    });

    useEffect(() => {
        axios
            .get("http://localhost:3000/api/freelancers/getFreelancerById/" + id)
            .then((resp) => {
                setFreelancer({ results: resp.data.freelancer, loading: false, err: null });
                console.log(resp);
                console.log(resp.data.freelancer);
            })
            .catch((err) => {
                console.log(err);
                // setConversation({ ...conversation, loading: false, err: err.response.data.errors });
            });
    }, [freelancer.reload]);

    const [client, setClient] = useState({
        loading: true,
        results: null,
        err: null,
        reload: 0,
    });

    useEffect(() => {
        axios
            .get("http://localhost:3000/api/clients/getClientById/" + id)
            .then((resp) => {
                setClient({ results: resp.data.client, loading: false, err: null });
                console.log(resp);
                console.log(resp.data.client);
            })
            .catch((err) => {
                console.log(err);
                // setConversation({ ...conversation, loading: false, err: err.response.data.errors });
            });
    }, [client.reload]);

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

    const [posts, setPosts] = useState({
        loading: true,
        results: [],
        err: null,
        caption: "",
        reload: 0
    });

    useEffect(() => {
        setPosts({ ...posts, loading: true })
        axios.get("http://localhost:3000/api/posts/getUserPosts/" + id)
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

    function CommentsPanel({ data }) {
        const [isActive, setIsActive] = useState(false);
        console.log(data);
        return (
            // <section className="panel">
            <div className="postBottom">
                <div className={isActive ? "activePostBottomLeft" : "postBottomLeft"}>
                    <img className={like > 0 ? 'redHeartIcon' : 'heartIcon'} src={like > 0 ? "/img/redHeart.png" : "/img/heart.png"} onClick={likeHandler} />
                    <span className="postLikeCounter">{like} Likes</span>
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
                            // value={desc}
                            // onChange={(e) => setDesc(e.target.value)}
                            />
                            <img className="sendCommentImg" src="/img/sendComment.png" alt="" />
                            {/* <button onClick={handleClick}>Send</button> */}
                        </div>
                    ) : null}
                </div>
            </div>
            // </section>
        );
    }

    return (
        <div className="communityContainer">
            <div className="communityProfile">
                <SideBar />
                <div className="communityProfileRight">
                    {freelancer?.loading == false && (
                        <>
                            <div className="communityProfileRightTop">
                                <div className="profileCover">
                                    <img
                                        className="profileCoverImg"
                                        src="/img/image_2.jpg"
                                        alt=""
                                    />
                                    <img
                                        className="profileUserImg"
                                        src={freelancer?.results.image_url}
                                        alt=""
                                    />
                                </div>
                                <div className="profileInfo">
                                    <h4 className="profileInfoName">{freelancer?.results.name}</h4>
                                </div>
                            </div>
                            <div className="communityProfileRightBottom">


                                <div className="feed">
                                    <div className="feedContainer">
                                        {user ?
                                            <form
                                                className="postFormContainer"
                                                onSubmit={addPostData}
                                            >
                                                <div className="share">
                                                    <div className="shareContainer">
                                                        <div className="shareTop">
                                                            {freelancer.results && (
                                                                <Link
                                                                    reloadDocument
                                                                    to={"/communityProfile/" + freelancer?.results._id}
                                                                >
                                                                    <img
                                                                        className="shareProfileImg"
                                                                        src={freelancer?.results.image_url}
                                                                    />
                                                                </Link>
                                                            )}
                                                            <input
                                                                placeholder={"What's on your mind " + user?.name + " ?"}
                                                                className="shareInput"
                                                                required
                                                                onChange={(e) =>
                                                                    setPost({ ...post, caption: e.target.value })
                                                                }
                                                            />
                                                        </div>
                                                        <hr className="shareHr" />
                                                        <div className="shareBottom">
                                                            <div className="shareOptions">
                                                                <div className="shareOptionImg">
                                                                    <img
                                                                        className="shareIcon"
                                                                        src="/img/photo.png"
                                                                        alt=""
                                                                    />
                                                                    {/* <input id="fileInput" className='addPostImg' required type="file" ref={media} /> */}
                                                                    <div className="fileInputContainer">
                                                                        <input
                                                                            className="addPostImg"
                                                                            required
                                                                            type="file"
                                                                            ref={media}
                                                                        />
                                                                        <span className="fileInputLabel">
                                                                            Upload Image
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className="shareOption">
                                                                    <img
                                                                        className="shareIcon"
                                                                        src="/img/groups.png"
                                                                        onClick={() =>
                                                                            setCommentOpen(!commentOpen)
                                                                        }
                                                                    />

                                                                    <select
                                                                        name="serviceCategoryId"
                                                                        required
                                                                        onChange={(e) =>
                                                                            setPost({
                                                                                ...post,
                                                                                communityId: e.target.value,
                                                                            })
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
                                                            <button type="submit" className="shareButton">
                                                                Post
                                                            </button>
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
                                        <div className='communityProfileAlert'>
                                            <Alert severity="info">{posts.err}</Alert>
                                        </div>
                                    }
                                </div>

                                <RightBar profile item={freelancer.results} />
                            </div>
                        </>
                    )}

                    {client?.loading == false && (
                        <>
                            <div className="communityProfileRightTop">
                                <div className="profileCover">
                                    <img
                                        className="profileCoverImg"
                                        src="/img/image_2.jpg"
                                        alt=""
                                    />
                                    <img
                                        className="profileUserImg"
                                        src={client?.results.image_url}
                                        alt=""
                                    />
                                </div>
                                <div className="profileInfo">
                                    <h4 className="profileInfoName">{client?.results.name}</h4>
                                </div>
                            </div>
                            <div className="communityProfileRightBottom">


                                <div className="feed">
                                    <div className="feedContainer">
                                        {user ?
                                            <form
                                                className="postFormContainer"
                                                onSubmit={addPostData}
                                            >
                                                <div className="share">
                                                    <div className="shareContainer">
                                                        <div className="shareTop">
                                                            {client.results && (
                                                                <Link
                                                                    reloadDocument
                                                                    to={"/communityProfile/" + client?.results._id}
                                                                >
                                                                    <img
                                                                        className="shareProfileImg"
                                                                        src={client?.results.image_url}
                                                                    />
                                                                </Link>
                                                            )}
                                                            <input
                                                                placeholder="What's on your mind?"
                                                                className="shareInput"
                                                                required
                                                                onChange={(e) =>
                                                                    setPost({ ...post, caption: e.target.value })
                                                                }
                                                            />
                                                        </div>
                                                        <hr className="shareHr" />
                                                        <div className="shareBottom">
                                                            <div className="shareOptions">
                                                                <div className="shareOptionImg">
                                                                    <img
                                                                        className="shareIcon"
                                                                        src="/img/photo.png"
                                                                        alt=""
                                                                    />
                                                                    {/* <input id="fileInput" className='addPostImg' required type="file" ref={media} /> */}
                                                                    <div className="fileInputContainer">
                                                                        <input
                                                                            className="addPostImg"
                                                                            required
                                                                            type="file"
                                                                            ref={media}
                                                                        />
                                                                        <span className="fileInputLabel">
                                                                            Upload Image
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className="shareOption">
                                                                    <img
                                                                        className="shareIcon"
                                                                        src="/img/groups.png"
                                                                    />

                                                                    <select
                                                                        name="serviceCategoryId"
                                                                        required
                                                                        onChange={(e) =>
                                                                            setPost({
                                                                                ...post,
                                                                                communityId: e.target.value,
                                                                            })
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
                                                            <button type="submit" className="shareButton">
                                                                Post
                                                            </button>
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
                                        <div className='communityProfileAlert'>
                                            <Alert severity="info">{posts.err}</Alert>
                                        </div>
                                    }
                                </div>

                                <RightBar profile item={client.results} />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CommunityProfile