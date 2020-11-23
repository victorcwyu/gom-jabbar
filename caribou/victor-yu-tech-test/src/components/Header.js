import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import "../styles/Header.scss";

export default function Header() {
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  const handleLogOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    setUserData({ ...userData, token: null });
    history.push("/");
  };

  return (
    <nav>
      <div className="nav-bar">
        <Link className="nav-home" to="/">
          <h2>Inter-Human-Caribou Harmony (IHCH) Application</h2>
        </Link>
        <div className="nav-links">
          {userData.token && userData.user.username && (
            <button className="nav-button" onClick={handleLogOut}>
              Logout {userData.user.username}
            </button>
          )}
          {!userData.token && (
            <Link className="nav-item" to="/login">
              Login
            </Link>
          )}
          {!userData.token && (
            <Link className="nav-item" to="/signup">
              Sign Up
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
