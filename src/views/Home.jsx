import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';



class Home extends Component {
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
        window.onresize = this.resize;
    
        return (
            <>
                <Jumbotron fluid>
                    <h1>W4rta Systems</h1>
                    <p>
                    Twoje pieniądze są warte naszej uwagi ;)
                    </p>
                </Jumbotron>
            </>
        );
        
      }

} 

export default Home;