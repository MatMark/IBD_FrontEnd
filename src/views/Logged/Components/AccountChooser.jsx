import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import ConnectDB from "../../../utils/ConnectDB";

class AccountChooser extends Component {
  constructor(props) {
    super(props);
    this.state = { AccountsList: [], loading: true };
    ConnectDB.getClientAccounts(localStorage.getItem("userID")).then(resp => {
      // console.log(resp);
      this.setState({ AccountsList: resp, loading: false });
    });
  }

  render() {
    let actLocation = window.location.href;

    return (
      <>
        <br />
        <Dropdown>
          <Dropdown.Toggle variant="primary">Wybierz konto</Dropdown.Toggle>

          <Dropdown.Menu>
            {this.state.AccountsList &&
              this.state.AccountsList.map(account => (
                <Dropdown.Item
                  key={account.id}
                  href={actLocation + "/" + account.number}
                >
                  {account.number} <strong>{account.balance} PLN</strong>
                </Dropdown.Item>
              ))}
          </Dropdown.Menu>
        </Dropdown>
      </>
    );
  }
}
export default AccountChooser;
