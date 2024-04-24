import React, { useEffect, useState } from 'react'
import "./Gig.scss"
import Slider from '../../Pages/gig/Slider';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import swal from "sweetalert";
import { getAuthUser } from "../../localStorage/storage";

// export let data;

function Gig () {
  const user = getAuthUser();

  const [service, setService] = useState({
    loading: true,
    results: null,
    err: null,
    reload: 0,
  });

  let { id } = useParams();


  useEffect(() => {
    axios
      .get("http://localhost:3000/api/services/getServiceById/" + id)
      .then((resp) => {

        setService({ results: resp.data, loading: false, err: null });
        // console.log(resp);
        console.log(resp.data);
      })
      .catch((err) => {
        console.log(err);
        // setConversation({ ...conversation, loading: false, err: err.response.data.errors });
      });
  }, [service.reload]);



  // const [freelancer, setFreelancer] = useState({
  //   err: null,
  //   loading: false,
  //   id: "65fa0541cb3af93721ac2647"
  // });

  // const [conversation, setConversation] = useState({
  //   err: null,
  //   loading: false,
  //   id: "123456"
  // });

  const navigate = useNavigate();

  const message = (e) => {
    // console.log(e.target.value);
    const freelancerId = e.target.value;

    axios
      .post("http://localhost:3000/api/conversations/addConversation", {
        freelancer: freelancerId,
        client: user._id
      })
      .then((resp) => {
        const conversationId = resp.data.newConversationData[0]._id;
        // console.log(resp.data.newConversationData[0]._id);
        navigate("/message/" + conversationId);
      })
      .catch((errors) => {
        console.log(errors);
        navigate("/messages");
      });
  }

  const requestOrder = (e) => {
    const freelancerId = e.target.value;

    axios
      .post("http://localhost:3000/api/requests/addRequest", {
        clientId: user._id,
        serviceId: id,
        freelancerId: freelancerId
      })
      .then((resp) => {
        console.log(resp);
        swal(
          resp.data.msg,
          "",
          "success"
        );
      })
      .catch((errors) => {
        console.log(errors);
        swal(errors.response.data.msg, "", "error");
      });
  }

  const [reviews, setReviews] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0
  });

  useEffect(() => {
    setReviews({ ...reviews, loading: true })
    axios.get("http://localhost:3000/api/reviews/getAllReviews")
      .then(
        resp => {
          console.log(resp.data);
          setReviews({ results: resp.data.reviews, loading: false, err: null });
          console.log(resp);
        }
      ).catch(err => {
        setReviews({ ...reviews, loading: false, err: err.response.data.msg });
        console.log(err);
      })
  }, [reviews.reload]);

  return (
    <div className="gig">
      <div className="gigContainer">
        {service.loading == false &&
          <>
            <div className="left">
              <span className="breadcrumbs"><Link reloadDocument className='marketplaceLinkGig' to={"/gigs"}>Marketplace</Link> {'>'} <span className='categoryNameSpan'>{service.results.serviceCategoryId.categoryName}</span> </span>
              <h1>{service.results.serviceTitle}</h1>
              <div className="user">
                <Link reloadDocument className='freelancerTitleLink' to={"/profile/" + service?.results.freelancerId._id}>
                  <img
                    className="pp"
                    src={service.results.freelancerId.image_url}
                    alt=""
                  />
                  <span className='freelancerTitleGig'>{service.results.freelancerId.name}</span>
                </Link>
                <div className="stars">
                  <img src="/img/star.png" alt="" />
                  <img src="/img/star.png" alt="" />
                  <img src="/img/star.png" alt="" />
                  <img src="/img/star.png" alt="" />
                  <img src="/img/star.png" alt="" />
                  <span>5</span>
                </div>
              </div>
              <Slider images={service.results.serviceImages_url} />
              <h2>About This Service</h2>
              <p>
                {service.results.serviceDesc}
              </p>
              <div className="seller">
                <h2>About The Seller</h2>
                <div className="user">
                <Link reloadDocument className='freelancerTitleLink' to={"/profile/" + service?.results.freelancerId._id}>
                  <img
                    src={service.results.freelancerId.image_url}
                    alt=""
                  />
                </Link>
                  <div className="info">
                <Link reloadDocument className='freelancerTitleLink' to={"/profile/" + service?.results.freelancerId._id}>
                    <span>{service.results.freelancerId.name}</span>
                </Link>
                    <div className="stars">
                      <img src="/img/star.png" alt="" />
                      <img src="/img/star.png" alt="" />
                      <img src="/img/star.png" alt="" />
                      <img src="/img/star.png" alt="" />
                      <img src="/img/star.png" alt="" />
                      <span>5</span>
                    </div>
                    {user?.role == "client" && (<button value={service.results.freelancerId._id} onClick={message}>Contact Me</button>)}
                  </div>
                </div>
                <div className="box">
                  <div className="items">
                    <div className="item">
                      <span className="title">From</span>
                      <span className="desc">{service.results.freelancerId.country}</span>
                    </div>
                    <div className="item">
                      <span className="title">Member since</span>
                      <span className="desc">Mar 2024</span>
                    </div>
                    <div className="item">
                      <span className="title">Avg. response time</span>
                      <span className="desc">4 hours</span>
                    </div>
                    <div className="item">
                      <span className="title">Last delivery</span>
                      <span className="desc">1 day</span>
                    </div>
                    <div className="item">
                      <span className="title">Languages</span>
                      <span className="desc">English</span>
                    </div>
                  </div>
                  <hr />
                  <p>
                    {service.results.freelancerId.desc}
                  </p>
                </div>
              </div>
              <div className="reviews">
                <h2>Reviews</h2>
                <div className="item">
                  <div className="user">
                  <Link reloadDocument className='freelancerTitleLink' to={"/profile/" + service?.results.freelancerId._id}>
                    <img
                      className="pp"
                      src="https://images.pexels.com/photos/839586/pexels-photo-839586.jpeg?auto=compress&cs=tinysrgb&w=1600"
                      alt=""
                    />
                  </Link>
                    <div className="info">
                    <Link reloadDocument className='freelancerTitleLink' to={"/profile/" + service?.results.freelancerId._id}><span>Garner David</span></Link>
                      <div className="country">
                        <span>United States</span>
                      </div>
                    </div>
                  </div>
                  <div className="stars">
                    <img src="/img/star.png" alt="" />
                    <img src="/img/star.png" alt="" />
                    <img src="/img/star.png" alt="" />
                    <img src="/img/star.png" alt="" />
                    <img src="/img/star.png" alt="" />
                    <span>5</span>
                  </div>
                  <p>
                    I just want to say that art_with_ai was the first, and after
                    this, the only artist Ill be using on Fiverr. Communication was
                    amazing, each and every day he sent me images that I was free to
                    request changes to. They listened, understood, and delivered
                    above and beyond my expectations. I absolutely recommend this
                    gig, and know already that Ill be using it again very very soon
                  </p>
                </div>
                <hr />
              </div>
            </div>
            <div className="right">
              <div className="price">
                <h3>{service.results.serviceShortTitle}</h3>
                <h2>$ {service.results.servicePrice}</h2>
              </div>
              <p>
                {service.results.serviceShortDesc}
              </p>
              <div className="details">
                <div className="item">
                  <img src="/img/clock.png" alt="" />
                  <span>{service.results.deliveryTime} Days Delivery</span>
                </div>
                <div className="item">
                  <img src="/img/recycle.png" alt="" />
                  <span>{service.results.revisionNumber} Revisions</span>
                </div>
              </div>
              <div className="features">
                {service.results.features.map((feature) => (
                  <div className="item">
                    <img src="/img/greencheck.png" alt="" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              {user && user.role !== "freelancer" && <button value={service.results.freelancerId._id} onClick={requestOrder}>Request Order</button>}
              {user && service.results.freelancerId._id == user._id && <button onClick={requestOrder}>Update</button>}
            </div>
          </>
        }
      </div>
    </div>
  );
}

export default Gig;
