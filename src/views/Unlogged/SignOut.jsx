import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { Login } from "./Components";

class SignOut extends Component {
  constructor() {
    super();
    this.resize = this.resize.bind(this);
  }

  state = {
    x: document.documentElement.clientWidth,
    y: document.documentElement.clientWidth * (2 / 5)
  };

  resize() {
    this.setState({
      x: document.documentElement.clientWidth,
      y: document.documentElement.clientWidth * (2 / 5)
    });
  }

  render() {
    window.onresize = this.resize;

    return (
      <>
        <Card border="success">
          <Card.Header>
            <h5 className="p-1 mb-2 bg-success text-white font-weight-bold">
              Pomyślnie wylogowano
            </h5>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              <Login buttonName="Zaloguj się ponownie" />
            </Card.Text>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default SignOut;
