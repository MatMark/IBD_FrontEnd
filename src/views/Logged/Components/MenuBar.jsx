import React, { Component } from 'react';
import { Navbar, Nav, Image, Form, Button } from 'react-bootstrap';
import MaterialIcon from 'material-icons-react';
import logo from '../../../resources/Logo_tlo.png';


class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
        collapse: false,
    };
    this.onClick = this.onClick.bind(this);
    this.signOut = this.signOut.bind(this);
}

onClick() {
  this.setState({
      collapse: !this.state.collapse,
    });
}

signOut() {
  localStorage.removeItem('token');
  localStorage.removeItem('userID');
  window.location.href = ('#/sign_out');
  window.location.reload(true);
}

  state = { theme: null }
  render() {
    return (
        <>
            <Navbar bg="dark" variant="dark" sticky="top" expand="lg" className="justify-content-between">
                <Navbar.Brand href="#home">
                  <Form inline>
                    <Image src={logo} width="64" height="64" alt="logo"/>
                  </Form>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav.Link href="#account_balance">
                      <Button>
                        <Form inline>
                          <MaterialIcon icon="account_balance_wallet" invert/>
                          &nbsp;Stan konta
                        </Form>
                      </Button>
                    </Nav.Link>  

                    <Nav.Link href="#transfers">
                      <Button>
                        <Form inline>
                          <MaterialIcon icon="swap_horizontal_circle" invert/>
                          &nbsp;Przelewy
                        </Form>
                      </Button>
                    </Nav.Link>

                    <Nav.Link href="#history">
                      <Button>
                        <Form inline>
                          <MaterialIcon icon="history" invert/>
                          &nbsp;Historia
                        </Form>
                      </Button>
                    </Nav.Link>

                    <Nav.Link href="#contact">
                      <Button>
                        <Form inline>
                          <MaterialIcon icon="mail" invert/>
                          &nbsp;Kontakt
                        </Form>
                      </Button>
                    </Nav.Link>

                    <Nav.Link href="#account_data">
                      <Button>
                        <Form inline>
                          <MaterialIcon icon="account_circle" invert/>
                          &nbsp;Dane konta
                        </Form>
                      </Button>
                    </Nav.Link>
                      <Button onClick={this.signOut}>
                        <Form inline>
                          <MaterialIcon icon="forward" invert/>
                          &nbsp;Wyloguj
                        </Form>
                      </Button>
                  </Navbar.Collapse>
            </Navbar>
        </>
    );
  }
}

export default MenuBar;