import React, { Component } from 'react';
import { Navbar, Nav, Image, Form, Button } from 'react-bootstrap';
import MaterialIcon from 'material-icons-react';
import logo from './resources/eka.png';


class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
        collapse: false,
    };
    this.onClick = this.onClick.bind(this);
}

onClick() {
  this.setState({
      collapse: !this.state.collapse,
    });
}

  state = { theme: null }
  render() {
    return (
        <>
            <Navbar bg="primary" variant="dark" fixed="top" sticky="top" expand="lg" className="justify-content-between">
                <Navbar.Brand href="#home">
                  <Form inline>
                    <Image src={logo} roundedCircle width="50" height="50" alt="logo"/>
                    <h3>&nbsp;W4rta</h3>
                  </Form>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  {/* <ButtonGroup size="sm" className="mt-3"> */}
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

                  {/* </ButtonGroup> */}
                    <Nav.Link href="#sign_out">
                      <Button>
                        <Form inline>
                          <MaterialIcon icon="forward" invert/>
                          &nbsp;Wyloguj
                        </Form>
                      </Button>
                    </Nav.Link>
                  </Navbar.Collapse>
            </Navbar>
        </>
    );
  }
}

export default MenuBar;