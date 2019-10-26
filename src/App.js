import React from 'react';
import { Route, HashRouter, Redirect } from "react-router-dom";
import MenuBar from './MenuBar';
import Contact from './views/Contact';
import './App.css';
import Transfers from './views/Transfers';
import AccountData from './views/AccountData';
import History from './views/History';
import AccountBalance from './views/AccountBalance';
import SignOut from './views/SignOut';
import Home from './views/Home';

function App() {
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

export default App;