import React, { useState } from "react";
import "./Login.scss";
import newRequest from "../../utils/newRequest.js";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post("/auth/login", { username, password });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/")
    } catch (err) {
      setError(err.response.data);
    }
  };
  
  return (
    <div className="loginContainer">
      <div className="loginLeft">
        <div className="imgDesc">
          <h1>Success starts here</h1>
          <p><img className="loginCheck" src="/img/loginCheck.png"/>Over 600 categories</p>
          <p><img className="loginCheck" src="/img/loginCheck.png"/>Pay per project, not per hour</p>
          <p><img className="loginCheck" src="/img/loginCheck.png"/>Access to talent and businesses across the globe</p>
        </div>
        <img className="loginPic" src="/img/loginPic.png" />
      </div>
      <div className="loginRight">
        <div className="login">
          <form onSubmit={handleSubmit}>
            <h1>Sign in to your account</h1>
            <label className="emailLabel" htmlFor="">Email or Username</label>
            <input
              name="username"
              type="text"
              placeholder="Enter your Email"
              onChange={(e) => setUsername(e.target.value)}
            />

            <label className="passLabel" htmlFor="">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
            {error && error}
          </form>
        </div>
        <div className="desc">
          <span>By joining, you agree to the WorkHub Terms of Service and to occasionally receive emails from us. Please read our Privacy Policy to learn how we use your personal data.</span>
        </div>
      </div>
    </div>
  );
}

export default Login;