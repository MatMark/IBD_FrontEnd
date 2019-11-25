import React, { Component } from "react";
import { Spinner, ListGroup } from "react-bootstrap";
import ConnectDB from "../../utils/ConnectDB";

class AccountData extends Component {
  constructor(props) {
    super(props);
    this.resize = this.resize.bind(this);
    this.state = { AccountData: null, AddressData: null, loading: true };
    ConnectDB.getClientData(localStorage.getItem("userID")).then(resp => {
      if (resp !== "Bad Request") {
        ConnectDB.getAddress(resp.addressId).then(response => {
          this.setState({
            AccountData: resp,
            AddressData: response,
            loading: false
          });
          // console.log(this.state);
        });
      }
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

  loadData = () => {
    return (
      <>
        <Spinner animation="grow" variant="dark" />
        <Spinner animation="grow" variant="dark" />
        <Spinner animation="grow" variant="dark" />
      </>
    );
  };

  showData = () => {
    return (
      <>
        <ListGroup>
          <ListGroup.Item>
            Imie: {this.state.AccountData.firstName}
          </ListGroup.Item>
          <ListGroup.Item>
            Nazwisko: {this.state.AccountData.lastName}
          </ListGroup.Item>
          <ListGroup.Item>PESEL: {this.state.AccountData.pesel}</ListGroup.Item>
          <ListGroup.Item>
            Telefon: {this.state.AccountData.phone}
          </ListGroup.Item>
          <ListGroup.Item>Email: {this.state.AccountData.email}</ListGroup.Item>
          <ListGroup.Item>
            Data urodzenia: {this.state.AccountData.birthDate.substring(0, 10)}
          </ListGroup.Item>
        </ListGroup>
        <ListGroup>
          <ListGroup.Item>Miasto: {this.state.AddressData.city}</ListGroup.Item>
          <ListGroup.Item>
            Ulica: {this.state.AddressData.street}
          </ListGroup.Item>
          <ListGroup.Item>
            Numer domu: {this.state.AddressData.homeNumber}
          </ListGroup.Item>
          <ListGroup.Item>
            Numer lokalu: {this.state.AddressData.apartmentNumber}
          </ListGroup.Item>
          <ListGroup.Item>
            Kod pocztowy: {this.state.AddressData.postCode}
          </ListGroup.Item>
        </ListGroup>
      </>
    );
  };

  render() {
    window.onresize = this.resize;

    let contents = this.state.loading ? this.loadData() : this.showData();

    return <>{contents}</>;
  }
}

export default AccountData;
