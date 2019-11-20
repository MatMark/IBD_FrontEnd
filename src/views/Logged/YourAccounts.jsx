import React, { Component } from 'react';
import { Spinner, Table } from 'react-bootstrap';
import ConnectDB from '../../utils/ConnectDB';

class YourAccounts extends Component {
    constructor(props){
        super(props);
        this.resize = this.resize.bind(this);
        this.state = {AccountsList: [], loading: true};
        ConnectDB.getClientAccounts(localStorage.getItem('userID')).then(resp => {
            console.log(resp);
            this.setState({AccountsList: resp, loading:false});
        })
    };

    state = { 
        x: document.documentElement.clientWidth,
        y: document.documentElement.clientWidth
    }

    resize()
    {
        this.setState({
            x: document.documentElement.clientWidth,
            y: document.documentElement.clientWidth})
    }

    loadAccounts = () => {
        return (
            <>
                <Spinner animation="grow" variant="dark" />
                <Spinner animation="grow" variant="dark" />
                <Spinner animation="grow" variant="dark" />
            </>
        )
    }

    showAccounts = () => {
        return (
            <Table responsive>
                <thead>
                    <tr>
                    <th>Numer konta</th>
                    <th>Saldo</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.AccountsList && this.state.AccountsList.map(account =>
                    <tr key={account.id}>
                    <td>{account.number}</td>
                    <td>{account.balance}</td>
                    </tr>)}
                </tbody>
            </Table>
        )}
    
    render = () => {
        let contents = this.state.loading
        
          ? this.loadAccounts()
          : this.showAccounts();
    
        return (
            <>
                {contents}
            </>
        );
        
      }

} 

export default YourAccounts;