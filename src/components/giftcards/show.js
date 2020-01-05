import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Navbar from '../navbar/navbar';
import '../../resources/css/storePage.css';

export default class StorePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardInfo: props.location.state.cardInfo,
            cardType: props.location.state.cardType,
            modalOpen: false
        }

        this.handleModal = this.handleModal.bind(this);
        this.postTransaction = this.postTransaction.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
        
    handleModal(e) {
        const modal = document.getElementById("modal");
        if(this.state.modalOpen) {
            modal.style.display = 'none';
            modal.setAttribute("aria-hidden", "true");
        } else {
            modal.style.display = 'block';
            modal.setAttribute("aria-hidden", "false");
        }

        this.setState({modalOpen: !this.state.modalOpen});
    }

    async postTransaction() {
        let balance = this.state.cardInfo.balance;
        const amount = document.getElementById('transactionAmount').value;

        if(amount > 0) {
            balance -= amount;
            const transaction = `amount=${amount}&balance=${balance}`;

            await fetch(`http://localhost:5000/cards/giftcards/${this.state.cardInfo._id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: transaction
            }).catch(err => {
                console.log("Error: ", err);
                this.props.history.push('/cards/giftcards');
            });

            const get =
                await fetch(`http://localhost:5000/cards/giftcards/${this.state.cardInfo._id}`)
                .catch(err => console.log("Error: ", err));
            const data = await get.json();

            this.setState({
                cardInfo: data
            });
        }
        
        this.handleModal();
    }

    handleEdit() {
        let param;
        if(this.state.cardType === 'giftcard') {
            param = 'giftcards';
        } else {
            param = 'rewards';
        }
        this.props.history.push({pathname: `/cards/${param}/${this.state.cardInfo._id}/edit`, state: {cardInfo: this.state.cardInfo, cardType: this.state.cardType}});
    }

    handleDelete() {
        console.log("delete");
        fetch(`http://localhost:5000/cards/${this.state.cardType}s/${this.state.cardInfo._id}/delete`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `cardType=${this.state.cardType}`
        }).then( res => {
            if(!res.ok) {
                console.log("Error: ", res.status);
                this.props.history.push(`/cards/${this.state.cardType}s/${this.state.cardInfo._id}`);
            } else {
                console.log(res);
                this.props.history.push('/cards');
            }
        });
    }

    render() {
        return (
            <React.Fragment>
            <Navbar heading={this.state.cardInfo.storeName} />
            <div className="pageWrapper">
                <div id="modal" aria-hidden="true">
                    <div id="modalWrapper">
                        <h2>Charge Amount</h2>
                        <input id="transactionAmount" type="number" placeholder="Amount" min="0"/>
                        <button onClick={this.postTransaction} id="modalButton">Ok</button>
                    </div>
                </div>

                <img id="barcodeImg" alt="barcode" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FxBpUxaFR2zs%2Fhqdefault.jpg&f=1&nofb=1"></img>
                <p id="barcode">
                    {this.state.cardInfo.barcode}
                </p>

                {
                    this.state.cardType === 'giftcard' &&
                    <React.Fragment>
                        <p id="balance">
                            Remaining Balance: ${this.state.cardInfo.balance}
                        </p>
                        <button onClick={this.handleModal} id="logButton" className="button"><h2>Log Purchase</h2></button>
                        <Link to={`/cards/giftcards/${this.state.cardInfo._id}/transactions`}>
                            <h2 id="transactionButton" className="button">Transaction History</h2>
                        </Link>
                    </React.Fragment>
                }

                <h2>Closest Location</h2>
                <p>Google Maps</p>

                <h2 onClick={this.handleEdit} className="button">Edit Card</h2>
                <h2 onClick={this.handleDelete} className="button">Delete Card</h2>            
            </div>
            </React.Fragment>
        );
    }
}