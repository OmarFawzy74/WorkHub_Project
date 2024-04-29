import React, { useEffect, useRef, useState } from 'react'
import "./Feed.scss"
import Share from '../share/Share'
import Post from '../post/Post'
import { Link, useParams } from 'react-router-dom'
import { getAuthUser } from '../../localStorage/storage'
import axios from 'axios'

const Feed = (data) => {
  const user = getAuthUser()

  let { id } = useParams();

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

    // var clientId;
    // var freelancerId;

    // if(user.role == "freelancer") {
    //   freelancerId = user._id;
    //   clientId = user._id;
    // }

    // if(user.role == "client") {
    //   freelancerId = user._id;
    //   clientId = user._id;
    // }

    axios
      .post("http://localhost:3000/api/posts/addPost", {
        caption: post.caption,
        posterType: user.role,
        posterId: user._id,
        communityId: post.communityId,
      })
      .then((resp) => {
        // setPost({ reload: reviews.reload + 1 });
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

  return (
    <div className='feed'>
      <div className="feedContainer">
        <form className='postFormContainer' onSubmit={addPostData} >
          <div className='share'>
            <div className="shareContainer">
              <div className="shareTop">
                {data.data  &&
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
                  <div className="shareOption">
                    <img className='shareIcon' src="/img/photo.png" alt="" />
                    <input className='addPostImg' required type="file" ref={media} />
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
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  )
}

export default Feed