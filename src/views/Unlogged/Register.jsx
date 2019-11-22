import React, { Component } from "react";
import {
  Form,
  InputGroup,
  Card,
  Jumbotron,
  Button,
  OverlayTrigger,
  Tooltip,
  Nav,
  ButtonToolbar
} from "react-bootstrap";
import MaterialIcon from "material-icons-react";
import ConnectDB from "../../utils/ConnectDB";
import background_img from "../../resources/Birds.jpg";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      login: { email: null, password: null },
      personal: {
        firstName: null,
        lastName: null,
        pesel: null,
        birthDate: null
      },
      contact: {
        phone: null,
        city: null,
        street: null,
        homeNumber: null,
        apartmentNumber: null,
        postCode: null
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resize = this.resize.bind(this);
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

  today() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;
    return today;
  }

  handleSubmit() {
    // console.log(this.state)
    ConnectDB.postAddress(
      this.state.contact.city,
      this.state.contact.street,
      parseInt(this.state.contact.homeNumber),
      parseInt(this.state.contact.apartmentNumber),
      this.state.contact.postCode
    ).then(res => {
      if (res !== false) {
        ConnectDB.register(
          this.state.personal.firstName,
          this.state.personal.lastName,
          this.state.personal.pesel,
          this.state.contact.phone,
          this.state.login.email,
          this.state.personal.birthDate,
          this.state.login.password,
          res
        ).then(res => {
          //    console.log(res)
          if (res !== false) {
            ConnectDB.login(
              this.state.login.email,
              this.state.login.password
            ).then(res => {
              // console.log(res)
              if (res !== "Bad Request") {
                window.location.href = "#home";
                window.location.reload(true);
              }
            });
          }
        });
      } else console.log("Bad address");

      //   ConnectDB.loginUser(this.state.email, this.state.password1)
      //   .then(res => {
      //     this.handleClose();
      //     if(res !== "Bad Request") {
      //       window.location.href = ('#home/about');
      //       window.location.reload(true);
    });
  }

  // paginator(){
  //     return(
  //         <Pagination className='justify-content-center'>
  //                 <Pagination.Item active={this.state.loginData ? true : false} onClick={ ()=>{
  //                     this.setState({loginData: true, personalData: false, contactData: false, })
  //                     }}>
  //                     1
  //                 </Pagination.Item>
  //                 <Pagination.Item active={this.state.personalData ? true : false} onClick={ ()=>{
  //                     this.setState({loginData: false, personalData: true, contactData: false})
  //                     }}>
  //                     2
  //                 </Pagination.Item>
  //                 <Pagination.Item active={this.state.contactData ? true : false} onClick={ ()=>{
  //                     this.setState({loginData: false, personalData: false, contactData: true})
  //                     }}>
  //                     3
  //                 </Pagination.Item>
  //             </Pagination>
  //     )
  // }

  // selectedPage(){

  //     if(this.state.loginData) return (this.loginPage())
  //     if(this.state.personalData) return (this.personalPage())
  //     if(this.state.contactData) return (this.contactPage())
  // }

  loginPage() {
    return (
      <Card className="justify-content-center" border="primary" text="white">
        <Card.Header>
          <h5 className="p-1 mb-2 bg-primary text-white font-weight-bold">
            Dane logowania
          </h5>
        </Card.Header>
        <Card.Body>
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip>
                <strong>Adres email musi zawierać @</strong>
              </Tooltip>
            }
          >
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">
                  <MaterialIcon icon="email" />
                  &nbsp;Email
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="email"
                placeholder="np. janusz@pwr.wroc.pl"
                aria-describedby="inputGroupPrepend"
                required
                defaultValue={this.state.login.email}
                onChange={e => {
                  this.setState({
                    login: {
                      email: e.target.value,
                      password: this.state.login.password
                    }
                  });
                }}
                onKeyPress={e => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    this.handleSubmit();
                  }
                }}
              />
            </InputGroup>
          </OverlayTrigger>
          <br />
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip>
                <strong>
                  Hasło musi zawierać co najmniej 1 małą literę, 1 wielką literę
                  i cyfrę lub znak specialny, oraz musi składać z co najmniej 8
                  znaków
                </strong>
              </Tooltip>
            }
          >
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">
                  <MaterialIcon icon="lock" />
                  &nbsp;Hasło
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="password"
                pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                // (UpperCase, LowerCase, Number/SpecialChar and min 8 Chars)
                placeholder="******"
                aria-describedby="inputGroupPrepend"
                required
                defaultValue={this.state.login.password}
                onChange={e => {
                  this.setState({
                    login: {
                      email: this.state.login.email,
                      password: e.target.value
                    }
                  });
                }}
                onKeyPress={e => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    this.handleSubmit();
                  }
                }}
              />
            </InputGroup>
          </OverlayTrigger>
        </Card.Body>
      </Card>
    );
  }

  personalPage() {
    return (
      <Card className="justify-content-center" border="primary" text="white">
        <Card.Header>
          <h5 className="p-1 mb-2 bg-primary text-white font-weight-bold">
            Dane personalne
          </h5>
        </Card.Header>
        <Card.Body>
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip>
                <strong>Podaj swoje imię</strong>
              </Tooltip>
            }
          >
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">
                  <MaterialIcon icon="face" />
                  &nbsp;Imie
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                placeholder="np. Jan"
                aria-describedby="inputGroupPrepend"
                required
                defaultValue={this.state.personal.firstName}
                onChange={e => {
                  this.setState({
                    personal: {
                      firstName: e.target.value,
                      lastName: this.state.personal.lastName,
                      pesel: this.state.personal.pesel,
                      birthDate: this.state.personal.birthDate
                    }
                  });
                }}
                onKeyPress={e => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    this.handleSubmit();
                  }
                }}
              />
            </InputGroup>
          </OverlayTrigger>
          <br />
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip>
                <strong>Podaj swoje nazwisko</strong>
              </Tooltip>
            }
          >
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">
                  <MaterialIcon icon="face" />
                  &nbsp;Nazwisko
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                placeholder="np. Nowak"
                aria-describedby="inputGroupPrepend"
                required
                defaultValue={this.state.personal.lastName}
                onChange={e => {
                  this.setState({
                    personal: {
                      firstName: this.state.personal.firstName,
                      lastName: e.target.value,
                      pesel: this.state.personal.pesel,
                      birthDate: this.state.personal.birthDate
                    }
                  });
                }}
                onKeyPress={e => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    this.handleSubmit();
                  }
                }}
              />
            </InputGroup>
          </OverlayTrigger>
          <br />
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip>
                <strong>Podaj swój PESEL składający się z 11 cyfr</strong>
              </Tooltip>
            }
          >
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">
                  <MaterialIcon icon="subtitles" />
                  &nbsp;Pesel
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                pattern="[0-9]{11}"
                placeholder="np. 12312312312"
                aria-describedby="inputGroupPrepend"
                required
                defaultValue={this.state.personal.pesel}
                onChange={e => {
                  this.setState({
                    personal: {
                      firstName: this.state.personal.firstName,
                      lastName: this.state.personal.lastName,
                      pesel: e.target.value,
                      birthDate: this.state.personal.birthDate
                    }
                  });
                }}
                onKeyPress={e => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    this.handleSubmit();
                  }
                }}
              />
            </InputGroup>
          </OverlayTrigger>
          <br />
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip>
                <strong>Wybierz swoją datę urodzenia</strong>
              </Tooltip>
            }
          >
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">
                  <MaterialIcon icon="cake" />
                  &nbsp;Data urodzenia
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="date"
                min="1900-01-01"
                max={this.today()}
                aria-describedby="inputGroupPrepend"
                required
                defaultValue={this.state.personal.birthDate}
                onChange={e => {
                  this.setState({
                    personal: {
                      firstName: this.state.personal.firstName,
                      lastName: this.state.personal.lastName,
                      pesel: this.state.personal.pesel,
                      birthDate: e.target.value
                    }
                  });
                }}
                onKeyPress={e => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    this.handleSubmit();
                  }
                }}
              />
            </InputGroup>
          </OverlayTrigger>
        </Card.Body>
      </Card>
    );
  }

  contactPage() {
    return (
      <Card className="justify-content-center" border="primary" text="white">
        <Card.Header>
          <h5 className="p-1 mb-2 bg-primary text-white font-weight-bold">
            Dane kontaktowe
          </h5>
        </Card.Header>
        <Card.Body>
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip>
                <strong>
                  Podaj swój numer telefonu składający się z 9 cyfr (bez numeru
                  kierunkowego)
                </strong>
              </Tooltip>
            }
          >
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">
                  <MaterialIcon icon="phone" />
                  &nbsp;Telefon
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="tel"
                pattern="[0-9]{9}"
                placeholder="np. 123123123"
                aria-describedby="inputGroupPrepend"
                required
                defaultValue={this.state.contact.phone}
                onChange={e => {
                  this.setState({
                    contact: {
                      phone: e.target.value,
                      city: this.state.contact.city,
                      street: this.state.contact.street,
                      homeNumber: this.state.contact.homeNumber,
                      apartmentNumber: this.state.contact.apartmentNumber,
                      postCode: this.state.contact.postCode
                    }
                  });
                }}
                onKeyPress={e => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    this.handleSubmit();
                  }
                }}
              />
            </InputGroup>
          </OverlayTrigger>
          <br />
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip>
                <strong>Podaj miasto zameldowania</strong>
              </Tooltip>
            }
          >
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">
                  <MaterialIcon icon="location_city" />
                  &nbsp;Miasto
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                placeholder="np. Wrocław"
                aria-describedby="inputGroupPrepend"
                required
                defaultValue={this.state.contact.city}
                onChange={e => {
                  this.setState({
                    contact: {
                      phone: this.state.contact.phone,
                      city: e.target.value,
                      street: this.state.contact.street,
                      homeNumber: this.state.contact.homeNumber,
                      apartmentNumber: this.state.contact.apartmentNumber,
                      postCode: this.state.contact.postCode
                    }
                  });
                }}
                onKeyPress={e => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    this.handleSubmit();
                  }
                }}
              />
            </InputGroup>
          </OverlayTrigger>
          <br />
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip>
                <strong>Podaj ulicę miejsca zameldowania</strong>
              </Tooltip>
            }
          >
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">
                  <MaterialIcon icon="where_to_vote" />
                  &nbsp;Ulica
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                placeholder="np. Jana Pawła II"
                aria-describedby="inputGroupPrepend"
                required
                defaultValue={this.state.contact.street}
                onChange={e => {
                  this.setState({
                    contact: {
                      phone: this.state.contact.phone,
                      city: this.state.contact.city,
                      street: e.target.value,
                      homeNumber: this.state.contact.homeNumber,
                      apartmentNumber: this.state.contact.apartmentNumber,
                      postCode: this.state.contact.postCode
                    }
                  });
                }}
                onKeyPress={e => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    this.handleSubmit();
                  }
                }}
              />
            </InputGroup>
          </OverlayTrigger>
          <br />
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip>
                <strong>Podaj numer domu miejsca zameldowania</strong>
              </Tooltip>
            }
          >
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">
                  <MaterialIcon icon="house" />
                  &nbsp;Numer domu
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                placeholder="np. 21"
                aria-describedby="inputGroupPrepend"
                required
                defaultValue={this.state.contact.homeNumber}
                onChange={e => {
                  this.setState({
                    contact: {
                      phone: this.state.contact.phone,
                      city: this.state.contact.city,
                      street: this.state.contact.street,
                      homeNumber: e.target.value,
                      apartmentNumber: this.state.contact.apartmentNumber,
                      postCode: this.state.contact.postCode
                    }
                  });
                }}
                onKeyPress={e => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    this.handleSubmit();
                  }
                }}
              />
            </InputGroup>
          </OverlayTrigger>
          <br />
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip>
                <strong>Podaj numer lokalu miejsca zameldowania</strong>
              </Tooltip>
            }
          >
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">
                  <MaterialIcon icon="apartment" />
                  &nbsp;Numer lokalu
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                placeholder="np. 37"
                aria-describedby="inputGroupPrepend"
                defaultValue={this.state.contact.apartmentNumber}
                onChange={e => {
                  this.setState({
                    contact: {
                      phone: this.state.contact.phone,
                      city: this.state.contact.city,
                      street: this.state.contact.street,
                      homeNumber: this.state.contact.homeNumber,
                      apartmentNumber: e.target.value,
                      postCode: this.state.contact.postCode
                    }
                  });
                }}
                onKeyPress={e => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    this.handleSubmit();
                  }
                }}
              />
            </InputGroup>
          </OverlayTrigger>
          <br />
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip>
                <strong>
                  Podaj kod pocztowy miejsca zameldowania w formacie 2 cyfry,
                  myślnik, 3 cyfry
                </strong>
              </Tooltip>
            }
          >
            <InputGroup id="inputGroupPrepend">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">
                  <MaterialIcon icon="mail" />
                  &nbsp;Kod pocztowy
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                id="inputGroupPrepend"
                type="text"
                pattern="[0-9]{2}-[0-9]{3}"
                placeholder="np. 12-123"
                aria-describedby="inputGroupPrepend"
                required
                defaultValue={this.state.contact.postCode}
                onChange={e => {
                  this.setState({
                    contact: {
                      phone: this.state.contact.phone,
                      city: this.state.contact.city,
                      street: this.state.contact.street,
                      homeNumber: this.state.contact.homeNumber,
                      apartmentNumber: this.state.contact.apartmentNumber,
                      postCode: e.target.value
                    }
                  });
                }}
                onKeyPress={e => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    this.handleSubmit();
                  }
                }}
              />
            </InputGroup>
          </OverlayTrigger>
        </Card.Body>
        <Card.Footer>
          <ButtonToolbar className="justify-content-between">
            <Nav.Link href="#welcome" as={Button}>
              <Form inline>
                <MaterialIcon icon="chevron_left" invert />
                &nbsp;Cofnij
              </Form>
            </Nav.Link>
            <Button variant="primary" type="submit" onClick={this.handleSubmit}>
              <Form inline>
                <MaterialIcon icon="check" invert />
                &nbsp;Zarejestruj
              </Form>
            </Button>
          </ButtonToolbar>
        </Card.Footer>
      </Card>
    );
  }

  render() {
    window.onresize = this.resize;
    var sectionStyle = {
      minHeight: this.state.y,
      backgroundImage: `url(${background_img})`,
      backgroundPosition: "center" /* Center the image */,
      backgroundRepeat: "no-repeat" /* Do not repeat the image */,
      backgroundSize:
        "cover" /* Resize the background image to cover the entire container */
    };
    return (
      <>
        <Jumbotron className="justify-content-center" style={sectionStyle}>
          {this.loginPage()}
          {this.personalPage()}
          {this.contactPage()}
        </Jumbotron>
      </>
    );
  }
}

export default Register;
