import React, { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const signUp = await axios.post(
        "http://localhost:5000/authentication/signup",
        userInfo
      );
      // if sign up is a success, log in the user and navigate to home page
      if (signUp.status === 201) {
        const login = await axios.post(
          "http://localhost:5000/authentication/login",
          {
            username: userInfo.username,
            password: userInfo.password,
          }
        );
        localStorage.setItem(
          "authentication-token",
          login.data.authenticationToken
        );
        const token = localStorage.getItem("authentication-token");
        setUserData({ ...userData, token: token });
        history.push("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h1>Sign Up</h1>
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
          id="email"
          placeholder="email"
          type="text"
          value={userInfo.email}
          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
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
        <input
          id="confirmPassword"
          placeholder="confirm password"
          type="text"
          value={userInfo.confirmPassword}
          onChange={(e) =>
            setUserInfo({ ...userInfo, confirmPassword: e.target.value })
          }
        />
        <button type="submit">Sign up</button>
      </form>
    </>
  );
}
