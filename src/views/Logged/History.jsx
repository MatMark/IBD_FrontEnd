import React, { Component } from "react";
import { Table, Spinner } from "react-bootstrap";
import ConnectDB from "../../utils/ConnectDB";

class History extends Component {
  constructor(props) {
    super(props);
    this.resize = this.resize.bind(this);
    this.state = {
      inTransferList: [],
      outTransferList: [],
      account: null,
      loading: true
    };
    ConnectDB.getAccountByNumber(this.props.match.params.number).then(resp => {
      this.setState({ account: resp });
      ConnectDB.getTransfersByAccountId(resp.id).then(response => {
        this.setState({ inTransferList: response });
        ConnectDB.getTransfersByDestination(
          this.props.match.params.number
        ).then(res => {
          this.setState({ outTransferList: res, loading: false });
          console.log(this.state);
        });
      });
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

  loadHistory = () => {
    return <Spinner animation="grow" variant="dark" />;
  };

  showHistory = () => {
    return (
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th><h5>Czas przelewu</h5></th>
            <th><h5>Odbiorca/Nadawca</h5></th>
            <th><h5>Tytuł</h5></th>
            <th><h5>Kwota</h5></th>
          </tr>
        </thead>
        <tbody>
          {this.state.inTransferList &&
            this.state.inTransferList.map(transfer => (
              <tr key={transfer.id}>
                <td>
                  <strong>
                    {transfer.time.substring(0, 10)}{" "}
                    {transfer.time.substring(11, 16)}
                  </strong>
                </td>
                <td>
                  <strong>{transfer.destination}</strong> (wychodzący)
                </td>
                <td>
                  <strong>{transfer.title}</strong>
                </td>
                <td>
                  <strong>
                    {transfer.amount} {transfer.currency}
                  </strong>
                </td>
              </tr>
            ))}
          {this.state.outTransferList &&
            this.state.outTransferList.map(transfer => (
              <tr key={transfer.id}>
                <td>
                  <strong>
                    {transfer.time.substring(0, 10)}{" "}
                    {transfer.time.substring(11, 16)}
                  </strong>
                </td>
                <td>
                  <strong>{transfer.destination}</strong> (przychodzący)
                </td>
                <td>
                  <strong>{transfer.title}</strong>
                </td>
                <td>
                  <strong>
                    {transfer.amount} {transfer.currency}
                  </strong>
                </td>
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
