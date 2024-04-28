import React, { useState } from 'react';
import './AddCommunity.scss';
import { Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import {sidebarStatus} from "../../App";

const AddCommunity = () => {

    const[community, setCommunity] = useState({
        communityName: "",
        communityDesc: "",
        loading: false,
        err: null
      });
    
      const addCommunity = (e) => {
        e.preventDefault();
        setCommunity({...community, loading: true, err: null});
        axios.post("http://localhost:3000/api/categories/addCategory", {
            communityName: community.communityName,
            communityDesc: community.communityDesc
        })
        .then((resp) => {
            setCommunity({...community, loading: false, err: null});
            swal(resp.data.msg,"","success");
            document.querySelector("#addCategoryForm").reset();
            // document.getElementById("categoryName").value = "";
            // document.getElementById("categoryDesc").value = "";
            console.log(resp);
        })
        .catch((errors) => {
            console.log(errors);
            swal(errors.response.data,"","error");
            setCommunity({...community, loading: false, err: errors.response.data.errors});
        })
      }
  return (
    <div className={sidebarStatus() ? 'addCommunityContainer' : 'addCommunityContainer sidebar-close-addCommunity'}>
            <section className='AddCategoryPage'>
                <div>
                    <h1>Add Community</h1>
                </div>
            </section>
            <section className='AddCommunity'>
                <form id='addCategoryForm' onSubmit={addCommunity}>
                    <div className='form-control'>
                        <h2>Name</h2>
                        <input
                        id='categoryName'
                        required
                        placeholder='Enter Name'
                        value={community.communityName}
                        onChange={(e) => setCategory({...community, communityName: e.target.value})}
                        />
                    </div>
                    <div className='form-control'>
                        <h2>Description</h2>
                        <input
                        id='categoryDesc'
                        required
                        placeholder='Enter Description'
                        value={community.communityDesc}
                        onChange={(e) => setCategory({...community, communityDesc: e.target.value})}
                        />
                    </div>
                    <div className='btn-container'>
                        <button type="submit" className='add-button'>Add</button>

                        <Link reloadDocument to={"/communityList"}>
                            <button className='cancel-button'>Cancel</button>
                        </Link>
                    </div>
                </form>
            </section>
        </div>
  )
}

export default AddCommunity
