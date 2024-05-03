import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./UserDashboard.scss";
import Button from '@mui/material/Button';
import { getAuthUser, setAuthUser } from "../../localStorage/storage";
import axios from "axios";
import swal from "sweetalert";
import GigCard from '../../components/GigCard/GigCard';
import Alert from '@mui/material/Alert';


const UserDashboard = () => {
    //   const currentUser = {
    //     id: 1,
    //     username: "Anna",
    //     isSeller: false,
    //   };

    let { id } = useParams();

    const { pathname } = useLocation();

    const user = getAuthUser();

    const navigate = useNavigate();


    const [requests, setRequests] = useState({
        loading: false,
        results: null,
        err: null,
        reload: 0,
    });

    const [orders, setOrders] = useState({
        loading: false,
        results: null,
        err: null,
        reload: 0,
    });

    useEffect(() => {
        setRequests({ loading: true });

        axios
            .get("http://localhost:3000/api/requests/getUserRequests/" + user.role + "/" + user._id)
            .then((resp) => {
                console.log(resp);
                console.log(resp.data);
                setRequests({ results: resp.data, loading: false, err: null });
                console.log(requests.results);
                // console.log(resp.data.services);
            })
            .catch((err) => {
                console.log(err);
                // setConversation({ ...conversation, loading: false, err: err.response.data.errors });
            });
    }, [requests.reload]);



    const approve = (e) => {
        // console.log(e);
        // console.log(e.target.value);
        const id = e.target.value;

        axios
            .put("http://localhost:3000/api/requests/updateRequest/" + id, {
                requestStatus: "Approved",
                freelancerId: user._id,
            })
            .then((resp) => {
                swal(
                    resp.data.msg,
                    "",
                    "success"
                );
                setRequests({ reload: requests.reload + 1 });
                setOrders({ reload: orders.reload + 1 })
                console.log(resp);
            })
            .catch((errors) => {
                swal(errors.response.data.msg, "", "error");
                console.log(errors);
                // console.log(errors.response.data.message);
            });
    }

    const decline = (e) => {
        const id = e.target.value;

        axios
            .put("http://localhost:3000/api/requests/updateRequest/" + id, {
                requestStatus: "Declined",
                freelancerId: user._id,
            })
            .then((resp) => {
                swal(
                    resp.data.msg,
                    "",
                    "success"
                );
                setRequests({ reload: requests.reload + 1 });
                console.log(resp);
                // console.log(resp.data.message);
                // console.log(resp.data.userData);
                // setAuthUser(resp.data.userData);
                // navigate("/gigs");
            })
            .catch((errors) => {
                swal(errors.response.data.msg, "", "error");
                console.log(errors);
                // console.log(errors.response.data.message);
            });
    }


    const cancel = (e) => {
        const id = e.target.value;

        axios
            .delete("http://localhost:3000/api/requests/deleteRequest/" + id)
            .then((resp) => {
                swal(
                    resp.data.msg,
                    "",
                    "success"
                );
                setRequests({ reload: requests.reload + 1 });
                console.log(resp);
                // console.log(resp.data.message);
                // console.log(resp.data.userData);
                // setAuthUser(resp.data.userData);
                // navigate("/gigs");
            })
            .catch((errors) => {
                swal(errors.response.data.msg, "", "error");
                console.log(errors);
                // console.log(errors.response.data.message);
            });
    }

    useEffect(() => {
        axios
            .get("http://localhost:3000/api/orders/getUserOrders/" + user.role + "/" + user._id)
            .then((resp) => {
                console.log(resp);
                setOrders({ results: resp.data.ordersData, loading: false, err: null });
                console.log(orders.results);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [orders.reload]);


    const message = (e) => {
        let freelancerId;
        let clientId;

        if (user.role == "client") {
            freelancerId = e.target.value;
            clientId = user._id;
        }

        if (user.role == "freelancer") {
            freelancerId = user._id;
            clientId = e.target.value;
        }


        axios
            .post("http://localhost:3000/api/conversations/addConversation", {
                freelancer: freelancerId,
                client: clientId
            })
            .then((resp) => {
                const conversationId = resp.data.newConversationData[0]._id;
                window.location = "http://localhost:3001/message/" + conversationId
            })
            .catch((errors) => {
                console.log(errors);
                const conversationId = errors.response.data.conversationData._id;
                window.location = "http://localhost:3001/message/" + conversationId
            });
    }

    const [services, setServices] = useState({
        loading: false,
        results: null,
        err: null,
        reload: 0,
    });

    useEffect(() => {
        setServices({ loading: true });

        axios
            .get("http://localhost:3000/api/services/getFreelancerServices/" + user?._id)
            .then((resp) => {
                setServices({ results: resp.data.services, loading: false, err: null });
                console.log(resp.data.services);

                console.log(resp);
            })
            .catch((err) => {
                setServices({ loading: false, err: err.response.data.msg });
                console.log(err);
                // setConversation({ ...conversation, loading: false, err: err.response.data.errors });
            });
    }, [services.reload]);

    const processDate = (messageTime) => {

        const getDate = new Date();

        const currentTime = getDate.getTime();

        const timeDifference = Math.abs(currentTime - messageTime);

        // For example, to get the difference in minutes:
        const differenceInMinutes = timeDifference / (1000 * 60);

        // To get the difference in hours:
        const differenceInHours = timeDifference / (1000 * 60 * 60);

        // To get the difference in days:
        const differenceInDays = timeDifference / (1000 * 60 * 60 * 24);

        const differenceInMonths = timeDifference / (1000 * 60 * 60 * 24 * 30);

        // To get the difference in seconds:
        const differenceInSeconds = timeDifference / 1000;

        if (Math.round(differenceInSeconds) >= 60) {
            if (Math.round(differenceInMinutes) >= 60) {
                if (Math.round(differenceInHours) >= 24) {
                    if (Math.round(differenceInDays) >= 30) {
                        return Math.round(differenceInMonths) + " month";
                    }
                    return Math.round(differenceInDays) + " day";
                }
                return Math.round(differenceInHours) + " hours";
            }
            return Math.round(differenceInMinutes) + " min";
        }
        return Math.round(differenceInSeconds) + " sec";
    }


    const [conversations, setConversations] = useState({
        loading: true,
        results: null,
        err: null,
        status: null,
        id: "",
        reload: 0
    });

    useEffect(() => {
        axios.get("http://localhost:3000/api/conversations/getConversationsByUserId/" + user._id)
            .then(
                resp => {
                    // console.log(resp);
                    console.log(resp.data);
                    console.log(resp.data.result);
                    let data = resp.data.result

                    if (!Array.isArray(data)) {
                        data = [resp.data.result];
                    }

                    setConversations({ results: data, loading: false, err: null });
                }
            ).catch(err => {
                console.log(err);
                // setConversation({ ...conversation, loading: false, err: err.response.data.errors });
            })
    }, [conversations.reload]);

    const openChat = (e) => {
        const conservationId = e.target.id;
        // axios.put("http://localhost:3000/api/messages/updateMessagesStatus/:id/:role" + user._id)
        //     .then(
        //         resp => {


        //             console.log(resp);

        //             // console.log(resp);
        //             // console.log(resp.data);
        //             // console.log(resp.data.result);
        //             // let data = resp.data.result

        //             // if(!Array.isArray(data)) {
        //             //   data = [resp.data.result];
        //             // }

        //             // setConversations({ results: data, loading: false, err: null });
        //         }
        //     ).catch(err => {
        //         console.log(err);
        //         // setConversation({ ...conversation, loading: false, err: err.response.data.errors });
        //     })
        window.location = "http://localhost:3001/message/" + conservationId;

        // navigate("/message/" + conservationId);
    }

    return (
        <div className="freelancerDashboard">
            <div className="freelancerDashboardContainer">
                <h1 className="freelancerDashboardTitle">Dashboard</h1>

                <div className="newRequest">
                    <div className="title">
                        <h1>Requests</h1>
                    </div>
                    <table>
                        <tr>
                            <th>{user.role == "client" ? "Freelancer" : "Client"}</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Price</th>
                            {pathname == "/orders" && <th>Contact</th>}
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        {requests.results && requests.err == null && requests.loading == false &&
                            requests.results.map((request) => (
                                <tr>
                                    <td><Link className="link" reloadDocument to={user?.role == "client" ? "/profile/" + request?.freelancerId._id : "/profile/" + request?.clientId._id}><p>{user.role == "client" ? request?.freelancerId.name : request?.clientId.name}</p></Link></td>
                                    <td>
                                        <Link reloadDocument to={"/gig/" + request?.serviceId._id}>
                                            <img
                                                className="image"
                                                src={request.serviceId.serviceCover_url}
                                                alt=""
                                            />
                                        </Link>
                                    </td>
                                    <td>{request.serviceId.serviceTitle}</td>
                                    <td>{request.serviceId.servicePrice}</td>
                                    {pathname == "/orders" && (
                                        <td>
                                            <img className="message" src="./img/message.png" alt="" />
                                        </td>
                                    )}
                                    <td>{request.requestStatus}</td>
                                    {user.role !== "client" && request.requestStatus == "Pending" && (
                                        <td>
                                            <Button
                                                variant="contained"
                                                className="approveBtn"
                                                value={request._id}
                                                onClick={approve}
                                            >
                                                Approve
                                            </Button>
                                            <Button
                                                variant="contained"
                                                className="delcineBtn"
                                                value={request._id}
                                                onClick={decline}
                                            >
                                                Decline
                                            </Button>
                                        </td>
                                    )}

                                    {user.role == "client" && request.requestStatus == "Pending" && (
                                        <td>
                                            <Button
                                                variant="contained"
                                                className="delcineBtn"
                                                value={request._id}
                                                onClick={cancel}
                                            >
                                                Cancel
                                            </Button>
                                        </td>
                                    )}

                                    {request.requestStatus !== "Pending" && <td>----</td>}
                                </tr>
                            ))}
                    </table>
                </div>

                <div className="newOrders">
                    <div className="title">
                        <h1>Orders</h1>
                    </div>
                    <table>
                        <tr>
                            <th>{user.role == "client" ? "Freelancer" : "Client"}</th>
                            <th>Service Image</th>
                            <th>Service Title</th>
                            <th>Price</th>
                            <th>Contact</th>
                            <th>Order Status</th>
                            {user.role == "client" && <th>Status</th>}
                            <th>Action</th>
                        </tr>

                        {orders.results && orders.err == null && orders.loading == false &&
                            orders.results.map((order) => (
                                <tr>
                                    <td><Link reloadDocument className="link" to={user.role == "client" ? "/profile/" + order?.freelancerId._id : "/profile/" + order?.clientId._id}>{user.role == "client" ? order.freelancerId.name : order.clientId.name}</Link></td>
                                    <td>
                                        <Link reloadDocument to={"/gig/" + order?.serviceId._id}>
                                            <img
                                                className="image"
                                                src={order.serviceId.serviceCover_url}
                                                alt=""
                                            />
                                        </Link>
                                    </td>
                                    <td>{order.serviceId.serviceTitle}</td>
                                    <td>{order.serviceId.servicePrice}</td>
                                    <td>
                                        <button value={user.role == "freelancer" ? order.clientId._id : order.freelancerId._id} onClick={message} className="messageBtn">
                                            <img className="message" src="./img/message.png" alt="" />
                                        </button>
                                    </td>

                                </tr>
                            ))}
                    </table>
                </div>

                <div className="newMessages">
                    <div className="messages">
                        <div className="messagesContainer">
                            <div className="title">
                                <h1>Messages</h1>
                            </div>
                            <table>
                                <tr>
                                    <th className="lastMessage">Image</th>
                                    <th className="userName">{user.role == "freelancer" ? "Client" : "Freelancer"}</th>
                                    <th className="lastMessage">Last Message</th>
                                    <th className="date">Date</th>
                                    <th className="action">Action</th>
                                </tr>
                                {/* <td><{user.role == "client" ? order.freelancerId.name : order.clientId.name}</Link></td> */}

                                {conversations.loading == false &&
                                    conversations.err == null &&
                                    conversations.results &&
                                    conversations.results.length > 0 &&
                                    conversations.results.map((conversation) => (
                                        <>
                                            <tr className={conversation.lastMessage.senderId !== user._id ? "active" : null}>
                                                <td>
                                                    <Link reloadDocument to={user.role == "client" ? "/profile/" + conversation?.freelancer._id : "/profile/" + conversation?.client._id}>
                                                        <img
                                                            className="image"
                                                            src={user.role == "client" ? conversation?.freelancer.image_url : conversation?.client.image_url}
                                                            alt=""
                                                        />
                                                    </Link>
                                                </td>
                                                <td className="userNameData"><Link reloadDocument className="link" to={user.role == "client" ? "/profile/" + conversation?.freelancer._id : "/profile/" + conversation?.client._id}><p>{user.role == "freelancer" ? conversation.client.name : conversation.freelancer.name}</p></Link></td>
                                                <td className="lastMessageData">
                                                    <Link id={conversation._id} onClick={openChat} className="link">
                                                        {conversation.lastMessage.messageContent.substring(0, 100)}...
                                                    </Link>
                                                </td>
                                                <td className="dateData">{processDate(conversation.lastMessage.creationDate)}</td>
                                                <td className="actionBtn">
                                                    {conversation.lastMessage.senderId !== user._id ? <button>Mark as Read</button> : null}
                                                </td>
                                            </tr>
                                        </>
                                    ))}
                            </table>
                        </div>
                    </div>
                </div>

                <div className="freelancerDashboardMyServices">
                    {user?.role == "freelancer" &&
                        <div className="myServiceSection">
                            <div className="myServiceHeader">
                                <h2>My Services</h2>
                                <Link reloadDocument to={"/add"}><button className="addNewServiceBtn">Add New Service</button></Link>
                            </div>
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
                    }

                    {services.err !== null && services.loading == false && services.results == null && user?.role == "freelancer" &&
                        <div>
                            <Alert severity="error">{services.err}</Alert>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
