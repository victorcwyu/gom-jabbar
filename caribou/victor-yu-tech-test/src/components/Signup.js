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
      // check if username is at least 3 characters
      if (userInfo.username.length < 3) {
        alert("Username must be at least 3 characters!");
      }
      // check if password is at least 3 characters
      if (userInfo.password.length < 3) {
        alert("Password must be at least 3 characters!");
      }
      // check if password matches confirmed password
      if (userInfo.password !== userInfo.confirmPassword) {
        alert("Password and Confirmed Password do not match!");
      }
      // check if email is "cariboued"
      const email = userInfo.email;
      const atSign = email.lastIndexOf("@");
      const isCariboued = email.substring(atSign - 5, atSign);
      if (isCariboued !== "carib") {
        alert("Based on your email address, you are ineligible to sign up!");
      } else {
        // attempt signup
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
        }
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
          placeholder="username (min. 3 characters)"
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
          placeholder="password (min. 3 characters)"
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
