import React from "react";
import { Route, HashRouter, Switch } from "react-router-dom";
import "../../App.css";
import SignOut from "./SignOut";
import Welcome from "./Welcome";
import Register from "./Register";

function Unlogged() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route path="/sign_out" component={SignOut} />
          <Route path="/register" component={Register} />
          <Route component={Welcome} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default Unlogged;
