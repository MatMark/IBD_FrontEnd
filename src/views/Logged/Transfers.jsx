import React, { Component } from "react";
import { Form, Button, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import ConnectDB from "../../utils/ConnectDB";

class Transfers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: null,
      destination: null,
      title: null,
      addressId: null,
      accountId: null,
      currency: "PLN"
    };
    this.newTransfer = this.newTransfer.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    ConnectDB.getAccountByNumber(this.props.match.params.number).then(resp => {
      this.setState({ accountId: resp.id });
    });
  }

  newTransfer() {
    let time = new Date()
    time.setHours(time.getHours() + 1)
    ConnectDB.makeTransfer(
      time,
      this.state.amount,
      this.state.destination,
      this.state.title,
      this.state.addressId,
      this.state.accountId,
      this.state.currency
    ).then(resp => {
      console.log(resp);
    });
  }

  handleSubmit() {
    this.newTransfer();
  }

  render() {
    return (
      <Card border="primary">
        <Card.Header>
          <h5 className="p-1 mb-2 bg-primary text-white font-weight-bold">
            Dane przelewu
          </h5>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Row className="justify-content-center">
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip>
                    <strong>
                      Numer konta w formacie 2 wielkie litery 26 cyfr
                    </strong>
                  </Tooltip>
                }
              >
                <Form.Group>
                  <Form.Label >Konto docelowe</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="np. PL12345678901234567890123456"
                    required
                    pattern="[A-Z]{2}[0-9]{26}"
                    onChange={e => {
                      this.setState({
                        destination: e.target.value
                      });
                    }}
                  />
                </Form.Group>
              </OverlayTrigger>
              &nbsp; &nbsp; &nbsp;
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip>
                    <strong>
                      Dowolny tytuł przelewu
                    </strong>
                  </Tooltip>
                }
              >
                <Form.Group>
                  <Form.Label>Tytuł przelewu</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="np. Opłata za kurs poprawkowy"
                    required
                    onChange={e => {
                      this.setState({
                        title: e.target.value
                      });
                    }}
                  />
                </Form.Group>
              </OverlayTrigger>
            </Form.Row>

            <Form.Row className="justify-content-center">
            <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip>
                    <strong>
                      Kwota przelewu
                    </strong>
                  </Tooltip>
                }
              >
              <Form.Group>
                <Form.Label>Kwota</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="np. 350.50"
                  pattern="[0-9]+(\.[0-9][0-9]?)?"
                  required
                  onChange={e => {
                    this.setState({
                      amount: e.target.value
                    });
                  }}
                />
              </Form.Group>
              </OverlayTrigger>
              &nbsp; &nbsp; &nbsp;
              <Form.Group>
                <Form.Label>Waluta</Form.Label>
                <Form.Control
                  as="select"
                  onChange={e => {
                    this.setState({
                      currency: e.target.value
                    });
                  }}
                >
                  <option>PLN</option>
                  <option>EUR</option>
                  <option>USD</option>
                  <option>GBP</option>
                  <option>CHF</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <Button
              variant="primary"
              type="submit"
            >
              Zatwierdź
            </Button>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default Transfers;
