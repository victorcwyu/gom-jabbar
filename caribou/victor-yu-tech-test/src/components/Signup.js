import React, { useState, useContext } from "react";
import UserContext from "../context/UserContext";

export default function Signup() {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { userData, setUserData } = useContext(UserContext);

  return (
    <div>
      <form autoComplete="off">
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
      </form>
    </div>
  );
}
