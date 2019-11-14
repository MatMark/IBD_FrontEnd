import React from 'react';
import { Route, HashRouter, Switch } from "react-router-dom";
import '../../App.css';
import SignOut from './SignOut';
import Welcome from './Welcome';

function Unlogged() {
  return (
    <div className="App"> 
      <HashRouter>
        <Switch>
          {/* <Route exact path="/" render={() => (<Redirect to="/welcome"/>)}/> */}
          {/* <Route path="/welcome" component={Welcome}/> */}
          <Route path="/sign_out" component={SignOut}/>
          {/* <Redirect from="/*" to="/welcome" /> */}
          <Route component={Welcome}/>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default Unlogged;