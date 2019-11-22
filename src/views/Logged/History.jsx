import React, { Component } from "react";
import { Table, Spinner } from "react-bootstrap";
import ConnectDB from "../../utils/ConnectDB";

class History extends Component {
  constructor(props) {
    super(props);
    this.resize = this.resize.bind(this);
    this.state = { AddressesList: [], loading: true };
    ConnectDB.getAddresses().then(resp => {
      // console.log(resp);
      this.setState({ AddressesList: resp, loading: false });
    });
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

  loadHistory = () => {
    return <Spinner animation="grow" variant="dark" />;
  };

  showHistory = () => {
    return (
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Ulica</th>
            <th>Numer budynku</th>
            <th>Numer lokalu</th>
            <th>Miasto</th>
            <th>Kod pocztowy</th>
          </tr>
        </thead>
        <tbody>
          {this.state.AddressesList &&
            this.state.AddressesList.map(address => (
              <tr key={address.id}>
                <td>{address.id}</td>
                <td>{address.street}</td>
                <td>{address.homeNumber}</td>
                <td>{address.apartmentNumber}</td>
                <td>{address.city}</td>
                <td>{address.postCode}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    );
  };

  render = () => {
    let contents = this.state.loading ? this.loadHistory() : this.showHistory();

    return <>{contents}</>;
  };
}

export default History;
