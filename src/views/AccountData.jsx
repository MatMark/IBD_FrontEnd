import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import bird from '../resources/giphy3.gif';

class AccountData extends Component {
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
                <Image src={bird} alt="bird"/>
            </>
        );
        
      }

} 

export default AccountData;