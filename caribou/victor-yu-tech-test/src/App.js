import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import UserContext from "./context/UserContext";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  const [userData, setUserData] = useState({
    token: null,
    user: null,
  });

  return (
    <Router>
      <UserContext.Provider value={{ userData, setUserData }}>
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
