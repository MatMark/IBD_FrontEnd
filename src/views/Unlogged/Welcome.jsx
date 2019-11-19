import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import { Login } from './Components';

class Welcome extends Component {
    constructor(){
        super();
        this.resize = this.resize.bind(this);
    };

    state = { 
        x: document.documentElement.clientWidth,
        y: document.documentElement.clientWidth*(2/3)
    }

    resize()
    {
        this.setState({
            x: document.documentElement.clientWidth,
            y: document.documentElement.clientWidth*(2/3)})
    }

    render() {
        
        return (
            <>
                <Jumbotron>
                    <Login buttonName="Zaloguj się"/>
                </Jumbotron>
            </>
        );
        
      }

} 

export default Welcome;