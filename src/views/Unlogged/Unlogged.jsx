import React, { Component } from "react";
import { Route, HashRouter, Switch } from "react-router-dom";
import { Navbar, Button, Nav } from "react-bootstrap";
import SignOut from "./SignOut";
import Welcome from "./Welcome";
import Register from "./Register";
import WOP from "../WOP";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../../index.css";

class Unlogged extends Component {
  constructor(props) {
    super(props);
    this.state = { cookies: true };
  }

  cookieBar = () => {
    return (
      <Navbar
        bg="dark"
        variant="dark"
        fixed="bottom"
        expand="lg"
        className="justify-content-between"
      >
        <Nav>
          <p className="p-1 mb-2 text-white">
            Korzystając z naszego serwisu akceptujesz
            <a className="p-1 mb-2 text-warning" href="#cookies">politykę cookies </a>
          </p>
        </Nav>
        <br/>
        <Nav>
          <Button
            variant="danger"
            onClick={() => {
              this.setState({ cookies: false });
            }}
          >
            X
          </Button>
        </Nav>
      </Navbar>
    );
  };

  render() {
    let content = this.state.cookies ? this.cookieBar() : null;

    return (
      <div className="App">
        <HashRouter>
          <Switch>
            <Route path="/sign_out" component={SignOut} />
            <Route path="/register" component={Register} />
            <Route path="/cookies" component={WOP} />
            <Route component={Welcome} />
          </Switch>
        </HashRouter>
        {content}
      </div>
    );
  }
}
export default Unlogged;
