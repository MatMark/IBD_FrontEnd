import React, { Component } from "react";
import {
  Form,
  InputGroup,
  Button,
  Modal,
  Spinner,
  Alert
} from "react-bootstrap";
import MaterialIcon from "material-icons-react";
import ConnectDB from "../../../utils/ConnectDB";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: false,
      show: false,
      error: false
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClose() {
    this.setState({
      show: false
    });
  }

  handleShow() {
    this.setState({
      show: true
    });
  }

  handleSubmit() {
    // console.log(this.state)
    this.setState({ loading: true, error: false });
    ConnectDB.login(this.state.email, this.state.password).then(res => {
      // console.log(res)
      if (res !== "Bad Request") {
        window.location.href = "#home";
        window.location.reload(true);
      } else {
        // console.log(this.state)
        // this.handleClose();
        this.setState({ loading: false, error: true });
        // console.log(this.state)
      }
    });
  }

  load = () => {
    return <Spinner animation="border" variant="light" size="sm" />;
  };

  error = () => {
    return (
      <Alert variant="danger">
        Niepoprawne dane logowania, nie masz konta
        <Alert.Link href="#register"> załóż je</Alert.Link>
      </Alert>
    );
  };

  show = () => {
    let contents = this.state.loading ? this.load() : "Zaloguj";
    let errors = this.state.error ? this.error() : null;

    return (
      <Modal show={this.state.show}>
        <Form onSubmit={this.handleSubmit}>
          <Modal.Header>
            <Modal.Title>Logowanie</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">
                  <MaterialIcon icon="email" />
                  &nbsp;Email
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="email"
                placeholder="Adres email"
                aria-describedby="inputGroupPrepend"
                required
                onChange={e => {
                  this.setState({ email: e.target.value });
                }}
                onKeyPress={e => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    this.handleSubmit();
                  }
                }}
              />
            </InputGroup>
            <br />
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">
                  <MaterialIcon icon="lock" />
                  &nbsp;Hasło
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="password"
                placeholder="******"
                aria-describedby="inputGroupPrepend"
                required
                onChange={e => {
                  this.setState({ password: e.target.value });
                }}
                onKeyPress={e => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    this.handleSubmit();
                  }
                }}
              />
            </InputGroup>
            <br />
            {errors}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Anuluj
            </Button>
            <Button
              variant="primary"
              type="submit"
              // onClick={this.handleSubmit}
            >
              {contents}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  };

  render() {
    return (
      <>
        <Button variant="outline-danger" onClick={this.handleShow} aria-label="LogIn">
          <Form inline>
            <MaterialIcon icon="person" color="#dc3545"/>
            &nbsp;{this.props.buttonName}
          </Form>
        </Button>
        {this.show()}
      </>
    );
  }
}
export default Login;
