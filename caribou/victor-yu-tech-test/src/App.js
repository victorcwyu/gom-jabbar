import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import UserContext from "./context/UserContext";
import Landing from "./components/Landing";
import Signup from "./components/Signup";

function App() {
  const [userData, setUserData] = useState({
    token: null,
    user: null,
  });

  return (
    <Router>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Route path="/" exact component={Landing} />
        <Route path="/signup" exact component={Signup} />
      </UserContext.Provider>
    </Router>
  );
}

export default App;
