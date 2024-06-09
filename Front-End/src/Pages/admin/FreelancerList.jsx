import './FreelancerList.scss';
import React, { useEffect, useState } from 'react'
import { Table } from 'reactstrap';
import { Link, useParams } from 'react-router-dom';
import $ from "jquery";
import axios from 'axios';
import swal from 'sweetalert';
import Alert from 'react-bootstrap/Alert';
import { sidebarStatus } from "../../App";
import Button from "@mui/material/Button";

const FreelancerList = () => {

  const [freelancers, setfreelancers] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0
  });

  const [blockedFreelancers, setBlockedFreelancers] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0
  });



  useEffect(() => {
    setfreelancers({ ...freelancers, loading: true })
    axios.get("http://localhost:3000/api/freelancers/getBlockedAndFreeFreelancers")
      .then(resp => {
        console.log(resp.data);
        
        // Set the blocked clients
        setBlockedFreelancers({ results: resp.data.blockedFreelancers, loading: false, err: null });
        
        // Get the data for all clients and blocked clients
        const freelancersData = resp.data.freelancers;
        const blockedFreelancersData = resp.data.blockedFreelancers;
  
        // Filter out the blocked clients from the list of all clients
        const newFreelancersData = freelancersData.filter(client => 
          !blockedFreelancersData.some(blockedFreelancer => client._id.valueOf() === blockedFreelancer._id.valueOf())
        );
  
        // Set the clients state with the filtered data
        setfreelancers({ results: newFreelancersData, loading: false, err: null });
        console.log(resp);
      })
      .catch(err => {
        setfreelancers({ ...freelancers, loading: false, err: err.response.data.msg });
        console.log(err);
      });
  }, [freelancers.reload]);


  const blockUser = (e) => {
    const userId = e.target.attributes.value.nodeValue;
    console.log(userId);

    axios
    .post(
      "http://localhost:3000/api/blockedUsers/blockUser/" + userId
    )
    .then((resp) => {
      console.log(resp);
      setfreelancers({ reload: freelancers.reload + 1 });
      // console.log(resp.data);
      // setRequests({ results: resp.data, loading: false, err: null });
      // console.log(requests.results);
      // console.log(resp.data.services);
    })
    .catch((err) => {
      console.log(err);
      // setRequests({ ...requests, loading: false, err: err.response.data.msg });
    });
  }




  return (
    <>
      <section className={sidebarStatus() ? 'FreelancerListPageActive' : 'FreelancerListPage sidebar-close-freelancer'}>
        <div>
          <h1>Freelancers List</h1>
        </div>
        <div className='freelancerContain-table'>
          {freelancers.loading == false && freelancers.err == null && (
            <Table striped>
              <thead>
                <tr>
                  <th>
                    Image_url
                  </th>
                  <th>
                    Name
                  </th>
                  <th>
                    Email
                  </th>
                  <th>
                    Country
                  </th>
                  <th className='action'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {freelancers.loading == false && freelancers.err == null && (
                  freelancers.results.map((freelancer => (
                    <tr>
                      <td>
                        <Link className='freelancerProfilePage' to={"/usersProfile/" + freelancer._id}>
                          <img src={freelancer.image_url} className="button muted-button gl-profile-btn" />
                        </Link>
                      </td>
                      <td className="desc">
                        {freelancer.name}
                      </td>
                      <td className="desc">
                        {freelancer.email}
                      </td>
                      <td className="desc">
                        {freelancer.country}
                      </td>
                      <td className="test">
                        {/* <img src='./img/block.png' className="button muted-button gl-block-btn" /> */}
                        <Button value={freelancer._id} onClick={blockUser} variant="contained" className="blockBtn">
                          Block
                        </Button>
                      </td>
                    </tr>
                  )))
                )
                }


              {blockedFreelancers.loading == false && blockedFreelancers.err == null && (
                blockedFreelancers.results.map((freelancer => (
                  <tr>
                    <td>
                      <Link reloadDocument className='clientsProfilePage' to={"/usersProfile/" + freelancer._id}>
                          <img src={freelancer.image_url} className="button muted-button gl-profile-btn" />
                      </Link>
                    </td>
                    <td className="desc">
                      {freelancer.name}
                    </td>
                    <td className="desc">
                      {freelancer.email}
                    </td>
                    <td className="desc">
                      {freelancer.country}
                    </td>
                    <td className="test">
                      {/* <img src='./img/block.png' className="button muted-button gl-block-btn" /> */}
                      Blocked
                    </td>
                  </tr>
                )))
              )
              }
              </tbody>
            </Table>
          )
          }
          {
            freelancers.loading == false && freelancers.err !== null && (
              <Alert variant={'danger'} className='err-msg-custom'>
                {freelancers.err}
              </Alert>
            )
          }
        </div>
      </section>
    </>
  )
}


export default FreelancerList;