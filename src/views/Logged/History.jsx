import React, { Component } from "react";
import { Table, Spinner } from "react-bootstrap";
import ConnectDB from "../../utils/ConnectDB";

class History extends Component {
  constructor(props) {
    super(props);
    this.resize = this.resize.bind(this);
    this.state = {
      transferList: [],
      account: null,
      loading: true
    };
    ConnectDB.getAccountByNumber(this.props.match.params.number).then(resp => {
      this.setState({ account: resp });
      ConnectDB.getTransfersByAccountId(resp.id).then(response => {
        ConnectDB.getTransfersByDestination(
          this.props.match.params.number
        ).then(res => {
          this.setState({
            transferList: res.concat(response).sort(this.compare),
            loading: false
          });
          // console.log(this.state);
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

  checkSource = transfer => {
    if (transfer.destination === this.props.match.params.number)
      return "(przychodzący)";
    else return "(wychodzący)";
  };

  compare(a, b) {
    const atime = new Date(a.time);
    const btime = new Date(b.time);
    let comparison = 0;
    if (atime < btime) {
      comparison = 1;
    } else if (atime > btime) {
      comparison = -1;
    }
    return comparison;
  }

  showHistory = () => {
    return (
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>
              <h5>Czas przelewu</h5>
            </th>
            <th>
              <h5>Odbiorca/Nadawca</h5>
            </th>
            <th>
              <h5>Tytuł</h5>
            </th>
            <th>
              <h5>Kwota</h5>
            </th>
          </tr>
        </thead>
        <tbody>
          {this.state.transferList &&
            this.state.transferList.map(transfer => (
              <tr key={transfer.id}>
                <td>
                  <strong>
                    {transfer.time.substring(0, 10)}{" "}
                    {transfer.time.substring(11, 16)}
                  </strong>
                </td>
                <td>
                  <strong>{transfer.destination}</strong>{" "}
                  {this.checkSource(transfer)}
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
