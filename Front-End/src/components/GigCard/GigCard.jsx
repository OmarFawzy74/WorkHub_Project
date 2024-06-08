import React, { useEffect, useState } from "react";
import "./GigCard.scss";
import { Link, useLocation } from "react-router-dom";
import { getAuthUser } from "../../localStorage/storage";
import axios from "axios";
import swal from 'sweetalert'

const GigCard = ({ item }) => {

  const [openOption, setOpenOption] = useState(false)

  const { pathname } = useLocation();

  const user = getAuthUser();


  const [service, setService] = useState({
    loading: true,
    results: null,
    err: null,
    reload: 0,
  });

  const processData = (data) => {
    console.log(data);
    const processedData = data[0].split(",");
    console.log(processedData);
    return processedData;
  }

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/services/getServiceById/" + item._id)
      .then((resp) => {
        resp.data.freelancerId.skills = processData(resp.data.freelancerId.skills);
        resp.data.freelancerId.languages = processData(resp.data.freelancerId.languages);
        setService({ results: resp.data, loading: false, err: null });
        // console.log(resp);
        console.log(resp.data);
      })
      .catch((err) => {
        console.log(err);
        // setConversation({ ...conversation, loading: false, err: err.response.data.errors });
      });
  }, [service.reload]);


  // const [services, setServices] = useState({
  //   loading: false,
  //   results: null,
  //   err: null,
  //   reload: 0,
  // });

  const deleteService = (e) => {
    e.preventDefault();
    const service_id = e.target.attributes.value.nodeValue;
    console.log(service_id);
    axios.delete("http://localhost:3000/api/services/deleteService/" + service_id)
      .then(
        resp => {
          console.log(resp);
          swal(resp.data.message, "", "success");
          setService({ reload: service.reload + 1 });
          // if (pathname == "/userDashboard") {
          //   window.location = "http://localhost:3001/userDashboard"
          // }
        }
      ).catch(error => {
        console.log(error);
      })
  }

  return (
    <div className="gigCardContainer">
      {service.results !== null &&
        <>
          {pathname !== "/gigs" &&
            <div className="gigCardOptions" onClick={() => setOpenOption(!openOption)}>
              <img src="/img/more.png" />
              {openOption && <div className="exploreOptions">
                <>
                  <div onClick={deleteService} value={service.results._id} className='link' to="/gigs">Delete Service</div>
                  <div className='link'><Link className="updateServiceLink" reloadDocument to={"/updateService/" + service.results._id}>Update Service</Link></div>
                </>
              </div>}
            </div>}
          <div className="gigCard">
            <Link reloadDocument to={"/gig/" + service.results._id} className="gigLink">
              <img className="gigImg" src={service.results.serviceCover_url} />
            </Link>
            <div className="gigInfo">
              <div className="user">
                <div class={pathname !== "/gigs" ? "card-badge" : "card-badge-2nd"}>WorkHub service</div>
                <Link reloadDocument to={"/profile/" + service.results?.freelancerId._id} className="freelancerLink">
                  <img src={service.results.freelancerId.image_url} />
                  <span className="freelancerName">{service.results.freelancerId.name}</span>
                </Link>
              </div>
              <p>{service.results.serviceTitle}</p>
              <div className="star">
                <img src="../img/star.png" alt="" />
                <span>{service.results.totalRating}</span>
              </div>
            </div>
            <hr />
            <div className="detail">
              <div className="price">
                <h2>
                  ${service.results.servicePrice}
                </h2>
              </div>
            </div>
          </div>
        </>
      }
    </div>
  );
};

export default GigCard;
