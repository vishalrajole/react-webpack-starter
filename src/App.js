import React, { Component } from "react";
import Loadable from "react-loadable";
import Loading from "./components/Loading";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import Home from "./components/Home";
// import About from "./components/About";
// import Contact from "./components/Contact";
const Home = Loadable({
  loader: () => import("./components/Home"),
  loading: Loading,
});
const About = Loadable({
  loader: () => import("./components/About"),
  loading: Loading,
});
const Contact = Loadable({
  loader: () => import("./components/Contact"),
  loading: Loading,
});
require("./index.css");
require("./dummy.scss");

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
