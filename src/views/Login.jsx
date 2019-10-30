import React, { Component } from 'react';
import { Jumbotron, Form, InputGroup, Button, Modal } from 'react-bootstrap';
import MaterialIcon from 'material-icons-react';

class Login extends Component {
    constructor(){
        super();
        // this.show = false;
        // this.validated = false;
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    };

    state = { 
        show: false,
        validated: false
    }

    handleClose(){
        this.setState({
            show: false
        })}

    handleShow(){
        this.setState({
            show: true
        })}

    handleSubmit(){
        console.log("Logowanko")
    }

    render() {
        return (
            <>
                <Jumbotron>
                    <Button variant="primary" onClick={this.handleShow}>
                        Zaloguj się
                    </Button>
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Form onSubmit={this.handleSubmit}> 
                            <Modal.Header closeButton>
                                <Modal.Title>Logowanie</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroupPrepend">
                                        <MaterialIcon icon="email"/>
                                        &nbsp;Email
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control 
                                    type="email" 
                                    placeholder="Adres email"
                                    aria-describedby="inputGroupPrepend"
                                    required
                                    onKeyPress={(e) => {if (e.key === 'Enter') {e.preventDefault(); this.handleSubmit();}}}
                                    />
                                    {/* <Form.Control.Feedback type="invalid">Podaj prawidłowy adres email</Form.Control.Feedback> */}
                                </InputGroup>
                                <br />
                                <InputGroup>
                                    <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroupPrepend">
                                        <MaterialIcon icon="lock"/>
                                        &nbsp;Hasło
                                    </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control 
                                    type="password" 
                                    placeholder="******"
                                    aria-describedby="inputGroupPrepend"
                                    required
                                    onKeyPress={(e) => {if (e.key === 'Enter') {e.preventDefault(); this.handleSubmit();}}}
                                    />
                                    {/* <Form.Control.Feedback type="invalid">Podaj prawidłowe hasło</Form.Control.Feedback> */}
                                </InputGroup>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.handleClose}>
                                    Anuluj
                                </Button>
                                <Button variant="primary" type="submit">
                                    Zaloguj
                                </Button>
                            </Modal.Footer>
                        </Form>
                    </Modal>
                </Jumbotron>
            </>
        );
        
      }

} 

export default Login;