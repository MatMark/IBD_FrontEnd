import React, { Component } from "react";
import wop from "../resources/WOP.jpg";

class WOP extends Component {
  constructor() {
    super();
    this.resize = this.resize.bind(this);
  }

  state = {
    x: document.documentElement.clientWidth,
    y: document.documentElement.clientHeight
  };

  resize() {
    this.setState({
      x: document.documentElement.clientWidth,
      y: document.documentElement.clientHeight
    });
  }

  render() {
    window.onresize = this.resize;

    return (
      <>
        <img
              width={this.state.x}
              height={this.state.y}
              src={wop}
              alt="work_in_progress"
            />
      </>
    );
  }
}

export default WOP;
