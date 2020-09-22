import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Users from "./components/Users";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={"/"} render={props => <Home {...props} />} />
        <Route exact path={"/users"} render={props => <Users {...props} />} />
        <Route exact path={"/login"} render={props => <Login {...props} />} />
        <Route exact path={"*"} component={Home} />
      </Switch>
    </Router>
  );
};

export default Routes;
