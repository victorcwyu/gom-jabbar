import React, { useContext } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import UserContext from "../context/UserContext";
import "../styles/Header.scss";

export default function Header() {
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();

  const handleLogOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    setUserData({ ...userData, token: null });
    history.push("/");
  };

  return (
    <nav>
      <div className="nav-bar">
        <h2>Inter-Human-Caribou Harmony (IHCH) Application</h2>
        <div className="nav-links">
          {userData.token &&
            userData.user.username &&
            location.pathname !== "/" && (
              <Link className="nav-item" to="/">
                Home
              </Link>
            )}
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
