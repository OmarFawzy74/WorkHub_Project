import './OrdersList.scss';
import React, { useEffect, useState } from 'react'
import { Table } from 'reactstrap';
import { Link, useParams } from 'react-router-dom';
import $ from "jquery";
import axios from 'axios';
import swal from 'sweetalert';
import Alert from 'react-bootstrap/Alert';
import { sidebarStatus } from "../../App";

const OrdersList = () => {

    const [categories, setCategories] = useState({
        loading: true,
        results: [],
        err: null,
        reload: 0
    });

    useEffect(() => {
        setCategories({ ...categories, loading: true })
        axios.get("http://localhost:3000/api/clients/getAllClients")
            .then(
                resp => {
                    console.log(resp.data);
                    setCategories({ results: resp.data, loading: false, err: null });
                    console.log(resp);
                }
            ).catch(err => {
                setCategories({ ...categories, loading: false, err: err.response.data.msg });
                console.log(err);
            })
    }, [categories.reload]);

    const deleteCategory = (e) => {
        e.preventDefault();
        const category_id = e.target.value;
        axios.delete("http://localhost:3000/api/categories/deleteCategory/:id", {
            params: {
                id: category_id,
            }
        })
            .then(
                resp => {
                    swal(resp.data.msg, "", "success");
                    setCategories({ ...categories, reload: categories.reload + 1 });
                }
            ).catch(error => {
                console.log(error);
            })
    }
    return (
        <>
            <section className={sidebarStatus() ? 'OrdersListPage' : 'OrdersListPage sidebar-close-orders'}>
                <div>
                    <h1>Orders List</h1>
                </div>
                <div className='contain-table'>
                    {/* {categories.loading == false && categories.err == null && ( */}
                    <Table striped>
                        <thead>
                            <tr>
                                <th>
                                    Client Name
                                </th>
                                <th>
                                    Freelancer Name
                                </th>
                                <th>
                                    Service Title
                                </th>
                                <th>
                                    Pricing
                                </th>
                                <th>
                                    Order Request Status
                                </th>
                                <th>
                                    Delivery Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {categories.loading == false && categories.err == null && ( */}
                            {/* categories.results.map((category => ( */}
                            <tr>
                                <td>
                                    {/* {category.categoryDesc} */} Client
                                </td>
                                <td className="desc">
                                    {/* {category.categoryDesc} */} Freelancer
                                </td>
                                <td className="desc">
                                    {/* {category.categoryDesc} */}Website
                                </td>
                                <td className="desc">
                                    {/* {category.categoryDesc} */}100$
                                </td>
                                <td className="test">
                                    Accepted
                                </td>
                                <td className="test">
                                    Pending
                                </td>
                            </tr>
                            {/* ))) */}
                            {/* )
              } */}
                        </tbody>
                    </Table>
                    {/* ) */}
                    {/* } */}
                    {
                        categories.loading == false && categories.err !== null && (
                            <Alert variant={'danger'} className='err-msg-custom'>
                                {categories.err}
                            </Alert>
                        )
                    }
                </div>
            </section>
        </>
    )
}


const clicked = () => {
    $(".addCategoryButton").addClass("clicked");

    setTimeout(() => {
        $(".addCategoryButton").removeClass("clicked");
    }, 0.05);
}

export default OrdersList;