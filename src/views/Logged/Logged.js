import React from "react";
import { Route, HashRouter, Redirect } from "react-router-dom";
import MenuBar from "./Components/MenuBar";
import Contact from "./Contact";
import "../../App.css";
import Transfers from "./Transfers";
import AccountData from "./AccountData";
import History from "./History";
import YourAccounts from "./YourAccounts";
import Home from "./Home";

function Logged() {
  return (
    <div className="App">
      <HashRouter>
        <MenuBar />
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route path="/home" component={Home} />
        <Route path="/your_accounts" component={YourAccounts} />
        <Route path="/transfers" component={Transfers} />
        <Route path="/history" component={History} />
        <Route path="/contact" component={Contact} />
        <Route path="/account_data" component={AccountData} />
      </HashRouter>
    </div>
  );
}

export default Logged;
