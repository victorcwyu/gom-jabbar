import React, { useState, useMemo, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import UserContext from "./context/UserContext";
import Landing from "./components/Landing";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import Messages from "./components/Messages";
import "./App.scss";
import NewReportMap from "./components/NewReportMap";
import NewReport from "./components/NewReport";
import ReportsMap from "./components/ReportsMap";
import Header from "./components/Header";
import Footer from "./components/Footer";

const GOOGLE_MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

function App() {
  const [userData, setUserData] = useState({
    token: null,
    user: null,
    googleMapsLoaded: false,
  });
  const value = useMemo(() => ({ userData, setUserData }), [
    userData,
    setUserData,
  ]);

  useEffect(() => {
    // this function loads the google maps JavaScript API and adds it to the state and the global window object
    const onScriptload = () => {
      const googleMapScript = document.createElement("script");
      googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`;
      window.document.body.appendChild(googleMapScript);
      googleMapScript.addEventListener("load", function () {
        setUserData((userData) => ({
          ...userData,
          googleMapsLoaded: !userData.googleMapsLoaded,
        }));
      });
      localStorage.setItem("googleMaps", "true");
    };
    onScriptload();
  }, []);

  useEffect(() => {
    const isUserLoggedIn = async () => {
      let token = localStorage.getItem("authentication-token");
      let googleMaps = JSON.parse(localStorage.getItem("googleMaps"));

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
        googleMapsLoaded: googleMaps,
      });
    };
    isUserLoggedIn();
  }, [userData.token]);

  return (
    <Router>
      <UserContext.Provider value={value}>
        <div id="main-container">
          <Header />
          <Switch>
            {userData.token === null && (
              <Route path="/" exact component={Landing} />
            )}
            {userData.token !== null && (
              <Route path="/" exact component={Home} />
            )}
            <Route path="/signup" exact component={Signup} />
            <Route path="/login" exact component={Login} />
            <Route path="/messages" exact component={Messages} />
            {userData.googleMapsLoaded === true && (
              <Route path="/newreportmap" exact component={NewReportMap} />
            )}
            <Route path="/newreport" exact component={NewReport} />
            {userData.googleMapsLoaded === true && (
              <Route path="/reportsmap" exact component={ReportsMap} />
            )}
          </Switch>
          <Footer />
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
