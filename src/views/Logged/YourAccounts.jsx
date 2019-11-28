import React, { Component } from "react";
import {
  Spinner,
  Table,
  Button,
  Container,
  Row,
  Col,
  Nav
} from "react-bootstrap";
import ConnectDB from "../../utils/ConnectDB";
import MaterialIcon from "material-icons-react";

class YourAccounts extends Component {
  constructor(props) {
    super(props);
    this.resize = this.resize.bind(this);
    this.state = { AccountsList: [], loading: true };
    ConnectDB.getClientAccounts(localStorage.getItem("userID")).then(resp => {
      // console.log(resp);
      this.setState({ AccountsList: resp, loading: false });
    });
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

  addAccount = () => {
    ConnectDB.postAccount(localStorage.getItem("userID")).then(resp => {
      // console.log(resp);
      window.location.reload(true);
    });
  };

  loadAccounts = () => {
    return (
      <>
        <Spinner animation="grow" variant="dark" />
        <Spinner animation="grow" variant="dark" />
        <Spinner animation="grow" variant="dark" />
      </>
    );
  };

  showAccounts = () => {
    return (
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Numer konta</th>
            <th>Saldo</th>
          </tr>
        </thead>
        <tbody>
          {this.state.AccountsList &&
            this.state.AccountsList.map(account => (
              <tr key={account.id}>
                <td>
                  <Container>
                    <Row>
                      <Col sm={8}>{account.number}</Col>
                      <Col>
                        <Button href={"#transfers/" + account.number} size="sm">
                          <MaterialIcon icon="swap_horizontal_circle" invert />
                        </Button>
                        &nbsp;
                        <Button href={"#history/" + account.number} size="sm">
                          <MaterialIcon icon="history" invert />
                        </Button>
                      </Col>
                    </Row>
                  </Container>
                </td>
                <td>{account.balance} PLN</td>
              </tr>
            ))}
          <tr>
            <td colSpan="2">
              <Nav.Link onClick={this.addAccount}>
                <MaterialIcon icon="add_circle" color="#0069d9"></MaterialIcon>
              </Nav.Link>
            </td>
          </tr>
        </tbody>
      </Table>
    );
  };

  render = () => {
    let contents = this.state.loading
      ? this.loadAccounts()
      : this.showAccounts();

    return <>{contents}</>;
  };
}

export default YourAccounts;
