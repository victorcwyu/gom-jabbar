import React, { useState, useMemo, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import UserContext from "./context/UserContext";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import "./App.css";

function App() {
  const [userData, setUserData] = useState({
    token: null,
    user: null,
  });
  const value = useMemo(() => ({ userData, setUserData }), [
    userData,
    setUserData,
  ]);

  useEffect(() => {
    const isUserLoggedIn = async () => {
      let token = localStorage.getItem("authentication-token");

      if (!token) {
        return;
      }
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
        token: token,
        user: getCurrentUser.data,
      });
    };
    isUserLoggedIn();
  }, [userData.token]);

  return (
    <Router>
      <UserContext.Provider value={value}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/login" exact component={Login} />
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
