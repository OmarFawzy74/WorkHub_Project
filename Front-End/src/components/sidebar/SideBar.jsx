import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "./SideBar.scss"
import { getAuthUser } from '../../localStorage/storage'
import axios from 'axios'
import Button from '@mui/material/Button';

const SideBar = () => {
  const user = getAuthUser()
  const [communityListOpen, setCommunityListOpen] = useState(false);

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
    <div className='sidebar'>
      <div className="sidebarContainer">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            {user &&
              <Link reloadDocument className='sidebarLink' to={"/communityProfile/" + user?._id} >
                <img className='sidebarProfileImg' src={user?.image_url} />
                <span className='sidebarListItemText'>{user?.name}</span>
              </Link>
            }
          </li>

          <li className="sidebarListItem">
            <Link reloadDocument className='sidebarLink' to="/community">
              <img className='sidebarIcon' src="/img/feed.png" />
              <span className='sidebarListItemText'>Feeds</span>
            </Link>
          </li>

          <li className="sidebarListItem">
            <Link reloadDocument className='sidebarLink' to="/">
              <img className='sidebarIcon' src="/img/chat.png" />
              <span className='sidebarListItemText'>Chats</span>
            </Link>
          </li>

          <li className="sidebarListItem">
            <div onClick={() => setCommunityListOpen(!communityListOpen)} className='sidebarLink'>
              <img className='sidebarIcon' src="/img/groups.png" />
              <span className='sidebarListItemText'>Communities</span>
            </div>

            {communityListOpen &&
              <>

                <ul className='communityList'>
                  {communities.loading == false &&
                    communities.err == null &&
                    communities.results &&
                    communities.results.length > 0 &&
                    communities.results.map((community) => (
                      <>
                        <li className='communityListContent'>
                          <Link className='sidebarLink' reloadDocument to={"/community/" + community?._id}>
                            {community?.communityName}
                          </Link>

                          <Button
                            variant="contained"
                            className="approveBtn"
                          // value={request._id}
                          >
                            Join
                          </Button>

                        </li>
                      </>
                    ))}
                </ul>
              </>
            }
          </li>

          <li className="sidebarListItem">
            <Link reloadDocument className='sidebarLink' to="/gigs">
              <img className='sidebarIcon' src="/img/marketplace.png" />
              <span className='sidebarListItemText'>Marketplace</span>
            </Link>
          </li>

          <li className="sidebarListItem">
            <Link reloadDocument className='sidebarLink' to="/learn">
              <img className='sidebarIcon' src="/img/course.png" />
              <span className='sidebarListItemText'>Courses</span>
            </Link>
          </li>
        </ul>
        <hr className='sidebarHr-1' />
        <span className='sidebaMenuText'>Joined Communities</span>
        <hr className='sidebarHr-2' />
        <ul className="sidebarCommunityList">
          {communities.loading == false &&
            communities.err == null &&
            communities.results &&
            communities.results.length > 0 &&
            communities.results.map((community) => (
              <>
                <li className="sidebarCommunity">
                  <span className='sidebarCommunityName'>{community?.communityName}</span>
                  {/* <button className='sidebarJoinButton'>Join</button> */}
                  <Button
                    variant="contained"
                    className="sidebarJoinButton"
                  // value={request._id}
                  >
                    Unjoin
                  </Button>
                </li>
              </>
            ))}
        </ul>
      </div>
      <span></span>
    </div>
  )
}

export default SideBar