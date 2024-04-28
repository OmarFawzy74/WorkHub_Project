import React, { useEffect, useState } from 'react'
import "./CommunityProfile.scss";
import SideBar from '../../components/sidebar/SideBar';
import Feed from '../../components/feed/Feed';
import RightBar from '../../components/rightbar/RightBar';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CommunityProfile = () => {

    let { id } = useParams();

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

    return (
        <div className='communityProfile'>
            <SideBar />
            <div className="communityProfileRight">
                {freelancer?.loading == false &&
                    <>
                        <div className="communityProfileRightTop">
                            <div className="profileCover">
                                <img className='profileCoverImg' src="/img/image_2.jpg" alt="" />
                                <img className='profileUserImg' src={freelancer?.results.image_url} alt="" />
                            </div>
                            <div className="profileInfo">
                                <h4 className='profileInfoName'>{freelancer?.results.name}</h4>
                                <span className='profileInfoDesc'>{freelancer?.results.desc}</span>
                            </div>
                        </div>
                        <div className="communityProfileRightBottom">
                            <Feed data={freelancer.results} />
                            <RightBar profile item={freelancer.results} />
                        </div>
                    </>
                }
                {client?.loading == false &&
                    <>
                        <div className="communityProfileRightTop">
                            <div className="profileCover">
                                <img className='profileCoverImg' src="/img/image_2.jpg" alt="" />
                                <img className='profileUserImg' src={client?.results.image_url} alt="" />
                            </div>
                            <div className="profileInfo">
                                <h4 className='profileInfoName'>{client?.results.name}</h4>
                            </div>
                        </div>
                        <div className="communityProfileRightBottom">
                            <Feed data={client.results} />
                            <RightBar profile item={client.results} />
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default CommunityProfile