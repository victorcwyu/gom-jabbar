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
      <div className="navBar">
        {userData.token && (
          <Link className="nav-item" to="/">
            Home
          </Link>
        )}
        {userData.token && (
          <button className="navButton" onClick={handleLogOut}>
            Log Out
          </button>
        )}
        {!userData.token && (
          <Link className="nav-item" to="/login">
            <p>Login</p>
          </Link>
        )}
        {!userData.token && (
          <Link className="nav-item" to="/signup">
            <p>Sign Up</p>
          </Link>
        )}
      </div>
    </nav>
  );
}
