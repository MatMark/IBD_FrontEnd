import React, { Component } from "react";
import { Spinner } from "react-bootstrap";

class AccountData extends Component {
  constructor() {
    super();
    this.resize = this.resize.bind(this);
  }

  state = {
    x: document.documentElement.clientWidth,
    y: document.documentElement.clientWidth * (2 / 3)
  };

  resize() {
    this.setState({
      x: document.documentElement.clientWidth,
      y: document.documentElement.clientWidth * (2 / 3)
    });
  }

  render() {
    window.onresize = this.resize;

    return (
      <>
        <Spinner animation="grow" variant="dark" />
        <Spinner animation="grow" variant="dark" />
        <Spinner animation="grow" variant="dark" />
      </>
    );
  }
}

export default AccountData;
