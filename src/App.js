import React from 'react';
import { BrowserRouter as Router, Switch ,Route} from "react-router-dom";
import './App.css';
import Home from "./components/Home";
import Details from "./components/Details";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            exact
            path="/:day"
            component={Details}
          />
          <Route
            path="/"
            component={Home}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
