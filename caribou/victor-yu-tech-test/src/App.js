import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import UserContext from "./context/UserContext";
import Home from "./components/Home";
import Signup from "./components/Signup";

function App() {
  return (
    <Router>
      <UserContext.Provider>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
      </UserContext.Provider>
    </Router>
  );
}

export default App;
