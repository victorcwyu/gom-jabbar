import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/signup" exact component={Signup} />
    </Router>
  );
}

export default App;
