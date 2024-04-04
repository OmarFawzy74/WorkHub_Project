import "./Profile.scss";
import React, { useEffect, useRef, useState } from "react";
import GigCard from '../../components/GigCard/GigCard';
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { getAuthUser } from '../../localStorage/storage';


const Profile = () => {

    const user = getAuthUser();

    let { category } = useParams();

    const [services, setServices] = useState({
        loading: false,
        results: null,
        err: null,
        reload: 0,
    });


    useEffect(() => {
        axios
            .get("http://localhost:3000/api/services/getAllServices")
            .then((resp) => {
                setServices({ results: resp.data.services, loading: false, err: null });
                console.log(resp.data.services);
            })
            .catch((err) => {
                console.log(err);
                // setConversation({ ...conversation, loading: false, err: err.response.data.errors });
            });
    }, [services.reload]);

    const [showMore, setShowMore] = useState(false);


    const [sort, setSort] = useState("sales");
    const [open, setOpen] = useState(false);
    const minRef = useRef();
    const maxRef = useRef();

    const reSort = (type) => {
        setSort(type);
        setOpen(false);
    };

    const apply = () => {
        console.log(minRef.current.value)
        console.log(maxRef.current.value)
    }


    return (
        <div className='profile'>
            <div className="profileContainer">
                <div className="myServiceHeader"><h1>My Profile</h1></div>
                <div className="left">
                    <div className="profileUser">
                        <img
                            src="https://images.pexels.com/photos/720327/pexels-photo-720327.jpeg?auto=compress&cs=tinysrgb&w=1600"
                            alt=""
                        />
                        <div className="info">
                            <span className='myName'>By Jon Youshaei</span>
                            <div className="userInfo">
                                <img
                                    className="locationIcon"
                                    src="/img/location.png"
                                />
                                <span>Egypt</span>
                                <img
                                    className="languageIcon"
                                    src="/img/profileLanguage.png"
                                />
                                <span>English, French, Spanish</span>
                            </div>
                        </div>
                        <div className="rightContainer">
                            {/* <div className="option">
                            <Link to={"/updateProfile"}><button><img src="/img/profileOption.png" />Edit Profile</button></Link>
                        </div> */}
                            <div className="right">
                                <div className="rightFeatures">
                                    <div className="rightProfileUser">
                                        <img
                                            src="https://images.pexels.com/photos/720327/pexels-photo-720327.jpeg?auto=compress&cs=tinysrgb&w=1600"
                                            alt=""
                                        />
                                        <div className="rightInfo">
                                            <span className='rightMyName'>By Jon Youshaei</span>
                                        </div>
                                    </div>
                                </div>
                                <button><img src="/img/send.png" />Contact Me</button>
                            </div>
                        </div>

                    </div>
                    <div className='aboutUser'>
                        <h2 className='aboutUserHeader'>About me</h2>
                        <div className='aboutUserDesc'>
                            <p>
                                Hi there, I'm a Proficient Full Stack Web Developer, Certified WordPress e-commerce website with over 5 years of experience delivering perfection and quality. Having successfully completed more than 400 websites I've specialized in building cutting-edge, unique, attractive websites for a variety of businesses, including e-commerce stores or WooCommerce with IDX MLS integration, Amazone promotion, Affiliate, Medical, Real Estate, Portfolio, Cleaning, Law Firm, and Petcare websites. Consequently, if you want to provide your company a stunning web presence, Let's connect and make it happen!
                            </p>
                        </div>
                    </div>

                    <div className='skills'>
                        <h2 className='skillsHeader'>Skills</h2>
                        <ul className='skillsDesc'>
                           <li>React</li>
                           <li>Node</li>
                           <li>WordPress</li>
                           <li>Python</li>
                           <li>Python</li>
                           <li>Python</li>
                           <li>Python</li>
                           <li>Python</li>
                           <li>Python</li>
                           <li>Python</li>
                           <li>Python</li>
                           <li>Python</li>
                           <li>Python</li>
                           <li>Python</li>
                           <li>Python</li>
                           <li>Python</li>
                           <li>Python</li>
                           <li>Python</li>
                           <li>Python</li>
                           <li>Python</li>
                           <li>Python</li>
                        </ul>
                        <a href="" className="showMore">+10</a>
                    </div>
                </div>

                <div className="myServiceSection">
                    <div className="myServiceHeader"><h2>My Services</h2></div>
                    <div className="myServiceGigsCards">
                        {services.loading == false &&
                            services.err == null &&
                            services.results &&
                            services.results.length > 0 &&
                            services.results.map((service) => (
                                <GigCard key={service._id} item={service} />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile