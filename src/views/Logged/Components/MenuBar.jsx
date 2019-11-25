import React, { Component } from "react";
import { Navbar, Nav, Image, Form, Button, Spinner } from "react-bootstrap";
import MaterialIcon from "material-icons-react";
import logo from "../../../resources/Logo_tlo.png";
import ConnectDB from "../../../utils/ConnectDB";

class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      account: null,
      loadingAccount: true
    };
    this.onClick = this.onClick.bind(this);
    this.signOut = this.signOut.bind(this);
    ConnectDB.getClientData(localStorage.getItem("userID")).then(resp => {
      if (resp !== "Bad Request") {
        this.setState({ account: resp, loadingAccount: false });
      }
    });
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse
    });
  }

  signOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    window.location.href = "#/sign_out";
    window.location.reload(true);
  }

  load = () => {
    return <Spinner animation="border" variant="light" size="sm" />;
  };

  show = () => {
    return (
      <Nav.Link href="#account_data">
        {this.state.account.firstName} {this.state.account.lastName}
      </Nav.Link>
    )
  };

  state = { theme: null };
  render() {
    let acc = this.state.loadingAccount ? this.load() : this.show();

    return (
      <>
        <Navbar
          collapseOnSelect
          bg="dark"
          variant="dark"
          sticky="top"
          expand="lg"
          // className="justify-content-between"
        >
          <Navbar.Brand href="#home">
            <Form inline>
              <Image src={logo} width="64" height="64" alt="logo" />
            </Form>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-between"
          >
            <Nav>
              <Button href="#your_accounts">
                <Form inline className="justify-content-center">
                  <MaterialIcon icon="account_balance_wallet" invert />
                  &nbsp;Twoje konta
                </Form>
              </Button>
              <Button href="#transfers">
                <Form inline className="justify-content-center">
                  <MaterialIcon icon="swap_horizontal_circle" invert />
                  &nbsp;Przelewy
                </Form>
              </Button>
              <Button href="#history">
                <Form inline className="justify-content-center">
                  <MaterialIcon icon="history" invert />
                  &nbsp;Historia
                </Form>
              </Button>
              <Button href="#contact">
                <Form inline className="justify-content-center">
                  <MaterialIcon icon="mail" invert />
                  &nbsp;Kontakt
                </Form>
              </Button>
              <Button href="#account_data">
                <Form inline className="justify-content-center">
                  <MaterialIcon icon="account_circle" invert />
                  &nbsp;Dane konta
                </Form>
              </Button>
            </Nav>
            <br />
            <Nav>
              {acc}
              <Button onClick={this.signOut}>
                <Form inline className="justify-content-center">
                  <MaterialIcon icon="forward" invert />
                  &nbsp;Wyloguj
                </Form>
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}

export default MenuBar;
