import React, { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../styles/Login.scss";
import Footer from "./Footer";
import Header from "./Header";

export default function Login() {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const login = await axios.post(
        "http://localhost:5000/authentication/login",
        userInfo
      );
      localStorage.setItem(
        "authentication-token",
        login.data.authenticationToken
      );
      const token = localStorage.getItem("authentication-token");
      const getCurrentUser = await axios.post(
        "http://localhost:5000/getCurrentUser",
        null,
        {
          headers: {
            "Authentication-Token": token,
          },
        }
      );
      setUserData({
        ...userData,
        token: token,
        user: getCurrentUser.data,
      });
      history.push("/");
    } catch (error) {
      const errorMessage = error.response.data.message;
      alert(errorMessage);
    }
  };

  return (
    <>
      <Header />
      <div className="loginWrapper">
        <h1>Login</h1>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <input
            id="username"
            placeholder="username"
            type="text"
            value={userInfo.username}
            onChange={(e) =>
              setUserInfo({ ...userInfo, username: e.target.value })
            }
          />
          <input
            id="password"
            placeholder="password"
            type="text"
            value={userInfo.password}
            onChange={(e) =>
              setUserInfo({ ...userInfo, password: e.target.value })
            }
          />
          <button type="submit">Login</button>
        </form>
      </div>
      <Footer />
    </>
  );
}
