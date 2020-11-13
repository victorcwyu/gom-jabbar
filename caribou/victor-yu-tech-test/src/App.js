import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import UserContext from "./context/UserContext";
import Landing from "./components/Landing";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  const [userData, setUserData] = useState({
    token: null,
    user: null,
  });

  console.log(userData);

  return (
    <Router>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Route path="/" exact component={Landing} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/login" exact component={Login} />
      </UserContext.Provider>
    </Router>
  );
}

export default App;
