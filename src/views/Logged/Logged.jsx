import React, { Component } from "react";
import { Route, HashRouter, Redirect } from "react-router-dom";
import MenuBar from "./Components/MenuBar";
import Contact from "./Contact";
import "../../App.css";
import Transfers from "./Transfers";
import AccountData from "./AccountData";
import History from "./History";
import YourAccounts from "./YourAccounts";
import Home from "./Home";
import { AccountChooser } from "./Components";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../../index.css";

class Logged extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <HashRouter>
          <MenuBar />
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <Route path="/home" component={Home} />
          <Route path="/your_accounts" component={YourAccounts} />
          <Route exact path="/transfers" component={AccountChooser} />
          <Route exact path="/history" component={AccountChooser} />
          <Route path="/transfers/:number" component={Transfers} />
          <Route path="/history/:number" component={History} />
          <Route path="/contact" component={Contact} />
          <Route path="/account_data" component={AccountData} />
        </HashRouter>
      </div>
    );
  }
}
export default Logged;
