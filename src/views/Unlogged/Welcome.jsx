import React, { Component } from "react";
import {
  Jumbotron,
  Button,
  Nav,
  Form,
  Card,
  ButtonToolbar,
  Image
} from "react-bootstrap";
import { Login } from "./Components";
import MaterialIcon from "material-icons-react";
import background_img from "../../resources/Birds.jpg";
import logo from "../../resources/Logo_tlo.png";

class Welcome extends Component {
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
    var sectionStyle = {
      minHeight: this.state.y,
      backgroundImage: `url(${background_img})`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover"
    };

    return (
      <Jumbotron style={sectionStyle}>
        <Card border="primary" style={{ maxWidth: "20rem" }}>
          <Card.Header>
            <h1 className="p-1 mb-2 text-primary font-weight-bold">
              <strong>Bankowość internetowa</strong>
            </h1>
          </Card.Header>
          <Card.Body>
            <Card.Title>
              <Image src={logo} width="128" height="128" alt="logo" />
            </Card.Title>
            <Card.Text>
              <ButtonToolbar className="justify-content-between">
                <Login buttonName="Zaloguj się" />
                <Nav.Link href="#register" as={Button}>
                  <Form inline>
                    <MaterialIcon icon="person_add" invert />
                    &nbsp;Zarejestruj
                  </Form>
                </Nav.Link>
              </ButtonToolbar>
            </Card.Text>
          </Card.Body>
        </Card>
      </Jumbotron>
    );
  }
}

export default Welcome;
