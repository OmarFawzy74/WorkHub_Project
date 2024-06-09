import './ClientList.scss';
import React, { useEffect, useState } from 'react'
import { Table } from 'reactstrap';
import { Link, useParams } from 'react-router-dom';
import $ from "jquery";
import axios from 'axios';
import swal from 'sweetalert';
import Alert from 'react-bootstrap/Alert';
import { sidebarStatus } from "../../App";
import Button from "@mui/material/Button";


const ClientList = () => {

  const [clients, setClients] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0
  });

  const [blockedClients, setBlockedClients] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0
  });

  useEffect(() => {
    setClients({ ...clients, loading: true });
    axios.get("http://localhost:3000/api/clients/getBlockedAndFreeClients")
      .then(resp => {
        console.log(resp.data);
        
        // Set the blocked clients
        setBlockedClients({ results: resp.data.blockedClients, loading: false, err: null });
        
        // Get the data for all clients and blocked clients
        const clientsData = resp.data.allClients;
        const blockedClientsData = resp.data.blockedClients;
  
        // Filter out the blocked clients from the list of all clients
        const newClientsData = clientsData.filter(client => 
          !blockedClientsData.some(blockedClient => client._id.valueOf() === blockedClient._id.valueOf())
        );
  
        // Set the clients state with the filtered data
        setClients({ results: newClientsData, loading: false, err: null });
        console.log(resp);
      })
      .catch(err => {
        setClients({ ...clients, loading: false, err: err.response.data.msg });
        console.log(err);
      });
  }, [clients.reload]);

  const blockUser = (e) => {
    const userId = e.target.attributes.value.nodeValue;
    console.log(userId);

    axios
    .post(
      "http://localhost:3000/api/blockedUsers/blockUser/" + userId
    )
    .then((resp) => {
      console.log(resp);
      setClients({ reload: clients.reload + 1 });
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
      <section className={sidebarStatus() ? 'ClientsListPageActive' : 'ClientsListPage sidebar-close-client'}>
        <div>
          <h1>Clients List</h1>
        </div>
        <div className='contain-table'>
          {/* {categories.loading == false && categories.err == null && ( */}
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
              {clients.loading == false && clients.err == null && (
                clients.results.map((client => (
                  <tr>
                    <td>
                      <Link reloadDocument className='clientsProfilePage' to={"/usersProfile/" + client._id}>
                          <img src={client.image_url} className="button muted-button gl-profile-btn" />
                      </Link>
                    </td>
                    <td className="desc">
                      {client.name}
                    </td>
                    <td className="desc">
                      {client.email}
                    </td>
                    <td className="desc">
                      {client.country}
                    </td>
                    <td className="test">
                      {/* <img src='./img/block.png' className="button muted-button gl-block-btn" /> */}
                      <Button value={client._id} onClick={blockUser} variant="contained" className="blockBtn">
                          Block
                        </Button>
                    </td>
                  </tr>
                )))
              )
              }

            {blockedClients.loading == false && blockedClients.err == null && (
                blockedClients.results.map((client => (
                  <tr>
                    <td>
                      <Link reloadDocument className='clientsProfilePage' to={"/usersProfile/" + client._id}>
                          <img src={client.image_url} className="button muted-button gl-profile-btn" />
                      </Link>
                    </td>
                    <td className="desc">
                      {client.name}
                    </td>
                    <td className="desc">
                      {client.email}
                    </td>
                    <td className="desc">
                      {client.country}
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
          {/* ) */}
          {/* } */}
          {/* {
            categories.loading == false && categories.err !== null && (
              <Alert variant={'danger'} className='err-msg-custom'>
                {categories.err}
              </Alert>
            )
          } */}
        </div>
      </section>
    </>
  )
}


export default ClientList;