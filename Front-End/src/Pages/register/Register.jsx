import React, { useRef, useState } from "react";
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { setAuthUser } from "../../localStorage/storage";
import Skills from "../../components/skills/Skills";
import Languages from "../../components/languages/Languages";

function Register() {
  const [user, setUser] = useState({
    err: null,
    loading: false,
    name: "",
    email: "",
    password: "",
    image: "",
    country: "",
    role: "client",
    desc: "",
    phoneNumber: "",
  });

  const navigate = useNavigate();

  const image = useRef(null);

  const addUserData = async (e) => {
    e.preventDefault();

    setUser({ ...user, loading: true, err: null });
    // const url = await upload(file);

    // console.log(getAuthUser().id);

    const formData = new FormData();

    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("country", user.country);
    formData.append("image", image.current.files[0]);
    formData.append("phoneNumber", user.phoneNumber);
    formData.append("desc", user.desc);


    axios
      .post("http://localhost:3000/api/auth/signup/" + user.role, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        swal("Congratulations you have Joined WorkHub Successfully", "", "success");
        console.log(resp.data.message);
        console.log(resp.data.userData);
        setAuthUser(resp.data.userData);
        navigate("/gigs");
      })
      .catch((errors) => {
        swal(errors.response.data.message, "", "error");
        console.log(errors);
        console.log(errors.response.data.message);
      });
  }









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
            <h1 className="createAccount">Create a new account</h1>
            <label className="singupDesc" htmlFor="">Name</label>
            <input
              name="name"
              type="text"
              placeholder="Fawzy"
              required
              onChange={(e) =>
                setUser({ ...user, name: e.target.value })
              }
            />
            <label className="singupDesc" htmlFor="">Email</label>
            <input
              name="email"
              type="email"
              placeholder="email"
              required
              onChange={(e) =>
                setUser({ ...user, email: e.target.value })
              } />
            <label className="singupDesc" htmlFor="">Password</label>
            <input
              name="password"
              type="password"
              required
              onChange={(e) =>
                setUser({ ...user, password: e.target.value })
              } />

            <label className="singupDesc" htmlFor="">Profile Picture</label>
            <input type="file" ref={image} />
            <label className="singupDesc" htmlFor="">Country</label>
            <select
              name="country"
              type="text"
              required
              onChange={(e) =>
                setUser({ ...user, country: e.target.value })
              }>
              <option value={""} disabled selected>
                Select Country
              </option>
              <option value="Egypt">Egypt</option>
              <option value="United States">United States</option>
              <option value="England">England</option>
              <option value="France">France</option>
            </select>

            <button className="registerButton" type="submit">Register</button>
          </div>
          <div className="right">
            <h1 className="becomeSeller">I want to become a seller</h1>
            <div className="toggle">
              <label htmlFor="">Activate the seller account</label>
              <label className="switch">
                <input type="checkbox" onChange={handleSeller} />
                <span className="slider round"></span>
              </label>
            </div>

            {user?.role == "freelancer" && (
              <>
                <label className="phoneNo" htmlFor="">Phone Number</label>
                <input className="phoneNoInput"
                  name="phoneNumber"
                  type="text"
                  placeholder="+20 1090559824"
                  required
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
                  required
                  onChange={(e) =>
                    setUser({ ...user, desc: e.target.value })
                  }
                ></textarea>
                <label className="singupDesc" htmlFor="">Skills</label>
                <Skills />
                <label className="singupDesc" htmlFor="">Languages</label>
                <Languages />
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
