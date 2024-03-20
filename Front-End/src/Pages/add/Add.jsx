import "./Add.scss";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { setAuthUser } from "../../localStorage/storage";


const Add = () => {
  const [service, setService] = useState({
    err: null,
    loading: false,
    name: "",
    image:"",
    desc: "",
    category: "",
    price: "",
    

    
  });

  const navigate = useNavigate();

  const image = useRef(null);

  const addServiceData = async (e) => {
    e.preventDefault();

    setService({ ...service, loading: true, err: null });

    const formData = new FormData();

    formData.append("name", service.name);
    formData.append("email", service.email);
    formData.append("password", service.password);
    formData.append("country", service.country);
    formData.append("image", image.current.files[0]);
    formData.append("phoneNumber", service.phoneNumber);
    formData.append("desc", service.desc);


    axios
    .post("http://localhost:3000/api/auth/signup/" + service.role, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((resp) => {
        // setService({
        //   ...service,
        //   loading: false,
        //   err: null,
        //   name: "",
        //   desc: "",
        //   email: "",
        //   password: "",
        //   country: "",
        //   role: "",
        // });
        // image.current.value = null;
        swal("Congratulations you have Joined WorkHub Successfully", "", "success");
        console.log(resp.data.message);
        console.log(resp.data.serviceData);
        setAuthUser(resp.data.serviceData);
        navigate("/gigs");
      })
      .catch((errors) => {
        swal(errors.response.data.message, "", "error");
        console.log(errors);
        console.log(errors.response.data.message);
      });
  }



  return (
    <div className="add">
      <div className="addContainer">
        <h1>Add New Service</h1>
        <div className="sections">
          <div className="info">
            <label htmlFor="">Title</label>
            <input
              type="text"
              placeholder="e.g. I will do something I'm really good at"
            />
            <label htmlFor="">Category</label>
            <select name="cats" id="cats">
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
            </select>
            <label htmlFor="">Cover Image</label>
            <input type="file" />
            <label htmlFor="">Upload Images</label>
            <input type="file" multiple />
            <label htmlFor="">Description</label>
            <textarea name="" id="" placeholder="Brief descriptions to introduce your service to customers" cols="0" rows="16"></textarea>
            <button>Create</button>
          </div>
          <div className="details">
            <label htmlFor="">Service Title</label>
            <input type="text" placeholder="e.g. One-page web design" />
            <label htmlFor="">Short Description</label>
            <textarea name="" id="" placeholder="Short description of your service" cols="30" rows="10"></textarea>
            <label htmlFor="">Delivery Time (e.g. 3 days)</label>
            <input type="number" />
            <label htmlFor="">Revision Number</label>
            <input type="number" />
            <label htmlFor="">Add Features</label>
            <input type="text" placeholder="e.g. page design" />
            <input type="text" placeholder="e.g. file uploading" />
            <input type="text" placeholder="e.g. setting up a domain" />
            <input type="text" placeholder="e.g. hosting" />
            <label htmlFor="">Price</label>
            <input type="number" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
