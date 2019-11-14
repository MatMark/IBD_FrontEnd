import React from 'react';
import { Route, HashRouter, Redirect } from "react-router-dom";
import MenuBar from './Components/MenuBar';
import Contact from './Contact';
import '../../App.css';
import Transfers from './Transfers';
import AccountData from './AccountData';
import History from './History';
import AccountBalance from './AccountBalance';
import SignOut from '../Unlogged/SignOut';
import Home from './Home';

function Logged() {
  return (
    <div className="App"> 
      <HashRouter>
        <MenuBar/>
          <Route exact path="/" render={() => (<Redirect to="/home"/>)}/>
          <Route path="/home" component={Home}/>
          <Route path="/account_balance" component={AccountBalance}/>
          <Route path="/transfers" component={Transfers}/>
          <Route path="/history" component={History}/> 
          <Route path="/contact" component={Contact}/>
          <Route path="/account_data" component={AccountData}/>
          <Route path="/sign_out" component={SignOut}/>
        </HashRouter>
    </div>
  );
}

export default Logged;