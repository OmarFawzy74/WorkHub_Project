import './ClientList.scss';
import React, { useEffect, useState } from 'react'
import { Table } from 'reactstrap';
import { Link, useParams } from 'react-router-dom';
import $ from "jquery";
import axios from 'axios';
import swal from 'sweetalert';
import Alert from 'react-bootstrap/Alert';
import { sidebarStatus } from "../../App";

const ClientList = () => {

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
      <section className={sidebarStatus() ? 'ClientsListPage' : 'ClientsListPage sidebar-close-client'}>
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
                <th colSpan={2} className='action'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {/* {categories.loading == false && categories.err == null && ( */}
                {/* categories.results.map((category => ( */}
                  <tr>
                    <td>
                      <img src='./img/profile.jpg' className="button muted-button gl-profile-btn"/>
                    </td>
                    <td className="desc">
                      {/* {category.categoryDesc} */} mana
                    </td>
                    <td className="desc">
                      {/* {category.categoryDesc} */}mana@gmail.com
                    </td>
                    <td className="desc">
                      {/* {category.categoryDesc} */}Egypt
                    </td>
                    <td className="test" colSpan={2}>
                      <img src='./img/block.png' onClick={deleteCategory} className="button muted-button gl-block-btn"/>
                      <img src='./img/delete.png' onClick={deleteCategory} className="button muted-button gl-delete-btn"/>
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

export default ClientList;