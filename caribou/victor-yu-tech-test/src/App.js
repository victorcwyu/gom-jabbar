import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Signup from "./components/Signup";

function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/signup" exact component={Signup} />
    </Router>
  );
}

export default App;
