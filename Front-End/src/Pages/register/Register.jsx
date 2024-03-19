import React, { useRef, useState } from "react";
import upload from "../../utils/upload";
import "./Register.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

function Register() {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    err: null,
    loading: false,
    name: "",
    email: "",
    password: "",
    image:"",
    country: "",
    role: "client",
    desc: "",
    phoneNumber:"",
  });



  const image = useRef(null);

  const addUserData = async (e) => {
    e.preventDefault();

    setUser({ ...user, loading: true, err: null });
    const url = await upload(file);

    // console.log(getAuthUser().id);

    const formData = new FormData();

    // formData.append("name", user.name);
    // formData.append("desc", user.desc);
    formData.append("image", image.current.files[0]);
    // formData.append("email", user.email);
    // formData.append("password", user.password);
    // formData.append("country", user.country);

    // // console.log("a7a");


    axios
      .post("http://localhost:3000/api/auth/signup/" + user.role, {
        name: user.name,
        email: user.email,
        password: user.password,
        country: user.country,
        desc: user.desc,
        phoneNumber: user.phoneNumber,
        ...formData,
      })
      .then((resp) => {
        // setUser({
        //   ...user,
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
        // swal(resp.data.msg, "", "success");
        console.log(resp);
      })
      .catch((errors) => {
        // setUser({
        //   ...user,
        //   loading: false,
        //   err: errors,
        //   name: "",
        //   desc: "",
        //   email: "",
        //   password: "",
        //   country: "",
        //   role: "",
        // });
        // image.current.value = null;
        // swal(user.err.msg, "", "error");
        console.log(errors);
      });
  }







  const navigate = useNavigate();

  // const handleChange = (e) => {
  //   console.log(e.target.value);
  //   setUser((prev) => {
  //     return { ...prev, [e.target.name]: e.target.value };
  //   });
  // };
  // console.log(user);

  const handleSeller = (e) => {
    console.log(e.target.checked);
    if (e.target.checked == true) {
      setUser((prev) => {
        return { ...prev, role: "freelancer" };
      });
    }
    else {
      setUser((prev) => {
        return { ...prev, role: "client" };
      });
    }
  };






  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const url = await upload(file);
  //   try {
  //     await newRequest.post("/auth/register", {
  //       ...user,
  //       image: url,
  //     });
  //     navigate("/")
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };



  return (
    <div className="registerContainer">
      <div className="register">
        <form onSubmit={addUserData}>
          <div className="left">
            <h1>Create a new account</h1>
            <label htmlFor="">Name</label>
            <input
              name="name"
              type="text"
              placeholder="Fawzy"
              onChange={(e) =>
                setUser({ ...user, name: e.target.value })
              }
            />
            <label htmlFor="">Email</label>
            <input
              name="email"
              type="email"
              placeholder="email"
              onChange={(e) =>
                setUser({ ...user, email: e.target.value })
              } />
            <label htmlFor="">Password</label>
            <input
              name="password"
              type="password"
              onChange={(e) =>
                setUser({ ...user, password: e.target.value })
              } />

            <label htmlFor="">Profile Picture</label>
            <input type="file" ref={image}/>
            <label htmlFor="">Country</label>

            <select
              name="country"
              type="text"
              required
              value={user.country}
              onChange={(e) =>
                setUser({ ...user, country: e.target.value })
              }          >
              <option value="Egypt">Egypt</option>
              <option value="United States">United States</option>
              <option value="England">England</option>
              <option value="France">France</option>
            </select>

            <button type="submit">Register</button>
          </div>
          <div className="right">
            <h1>I want to become a seller</h1>
            <div className="toggle">
              <label htmlFor="">Activate the seller account</label>
              <label className="switch">
                <input type="checkbox" onChange={handleSeller} />
                <span className="slider round"></span>
              </label>
            </div>

            {user?.role=="freelancer" && (
              <>
                <label className="phoneNo" htmlFor="">Phone Number</label>
                <input className="phoneNoInput"
                  name="phoneNumber"
                  type="text"
                  placeholder="+20 1090559824"
                  onChange={(e) =>
                    setUser({ ...user, phoneNumber: e.target.value })
                  }
                />
                <label className="singupDesc" htmlFor="">Description</label>
                <textarea
                  placeholder="A short desc of yourself"
                  name="desc"
                  id=""
                  cols="30"
                  rows="10"
                  onChange={(e) =>
                    setUser({ ...user, desc: e.target.value })
                  }
                ></textarea>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
