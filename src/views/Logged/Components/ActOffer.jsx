import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import currency from '../../../resources/currency.jpg';
import investment from '../../../resources/investment.jpg';
import mortgage from '../../../resources/mortgage.jpg';



class ActOffer extends Component {
    constructor(){
        super();
        this.resize = this.resize.bind(this);
    };

    state = { 
        x: document.documentElement.clientWidth,
        y: document.documentElement.clientWidth*(2/5)
    }

    resize()
    {
        this.setState({
            x: document.documentElement.clientWidth,
            y: document.documentElement.clientWidth*(2/5)})
    }

    render() {
        window.onresize = this.resize;
        return (
            <>
                <Carousel>
                    <Carousel.Item>
                        <img width={this.state.x} height={this.state.y} src={mortgage} alt="mortgage" />
                        <Carousel.Caption>
                        <h5 style={{fontSize : this.state.x/40}} className="p-1 mb-2 bg-primary text-white font-weight-bold">Kredyt hipoteczny dla Ciebie</h5>
                        <p style={{fontSize : this.state.x/60}} className="p-1 mb-2 bg-primary text-white font-italic">Mamy dla Ciebie atrakcyjne oferty kredytów hipetecznych dobranych specjalnie dla Ciebie</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img width={this.state.x} height={this.state.y} src={investment} alt="investment" />
                        <Carousel.Caption>
                        <h5 style={{fontSize : this.state.x/40}} className="p-1 mb-2 bg-primary text-white font-weight-bold">Lokaty</h5>
                        <p style={{fontSize : this.state.x/60}} className="p-1 mb-2 bg-primary text-white font-italic">Już teraz zacznij oszczędzać razem z nami</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img width={this.state.x} height={this.state.y} src={currency} alt="currency" />
                        <Carousel.Caption>
                        <h5 style={{fontSize : this.state.x/40}} className="p-1 mb-2 bg-primary text-white font-weight-bold">Konta walutowe</h5>
                        <p style={{fontSize : this.state.x/60}} className="p-1 mb-2 bg-primary text-white font-italic">Często wyjeżdżasz za granicę? Skorzystaj z naszych kont walutowych</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </>
        );
      }
} 

export default ActOffer;