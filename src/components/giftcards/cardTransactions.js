import React, {Component} from 'react';
import Navbar from '../navbar/navbar';
import '../../resources/css/transactions.css';

export default class Transactions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: []
        }

        this.formatDate = this.formatDate.bind(this);
    }

    componentDidMount() {
        fetch(`http://localhost:5000/cards/giftcards/${this.props.match.params.id}/transactions`)
        .then(res => res.json())
        .catch(err => console.log("Server error: ", err))
        .then(data => {
            this.setState({
                transactions: data
            });
        })
        .catch(err => console.log("Page error: ", err));
    }

    formatDate(date) {
        const month = date.substring(5,7);
        const day = date.substring(8,10);
        const year = date.substring(0,4);
        return `${month}/${day}/${year}`;
    }

    render() {
        return(
            <React.Fragment>
                <Navbar heading="Transactions" />
                {
                    this.state.transactions.length > 0 &&
                
                <table>
                    <thead>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.transactions.map(transaction => {
                                return (
                                    <tr>
                                        <td>{this.formatDate(transaction.date)}</td>
                                        <td>${transaction.amount}</td>
                                    </tr>
                                )
                            })
                        }                    
                    </tbody>
                </table>
                }

                {
                    this.state.transactions.length < 1 &&
                    <p>There are no transactions for this card</p>
                }
            </React.Fragment>
        );
    }
}