import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {withUserContext} from '../wrappers/componentWrappers';
import Navbar from '../navbar/navbar';
import '../../resources/css/storePage.css';

class StorePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardInfo: props.location.state.cardInfo,
            cardType: props.location.state.cardType,
            modalOpen: false
        }

        this.handleModal = this.handleModal.bind(this);
        this.postTransaction = this.postTransaction.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
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

            await fetch(`/cards/giftcards/${this.state.cardInfo._id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                credentials: "include",
                body: transaction
            }).catch(err => {
                console.log("Error: ", err);
                this.props.history.push('/cards/giftcards');
            });

            const get =
                await fetch(`/cards/giftcards/${this.state.cardInfo._id}`, {
                    credentials: "include"
                })
                .catch(err => console.log("Error: ", err));
            const data = await get.json();

            this.setState({
                cardInfo: data
            });
        }
        
        this.handleModal();
    }

    handleEditClick() {
        let param;
        if(this.state.cardType === 'giftcard') {
            param = 'giftcards';
        } else {
            param = 'rewards';
        }
        this.props.history.push({pathname: `/cards/${param}/${this.state.cardInfo._id}/edit`, state: {cardInfo: this.state.cardInfo, cardType: this.state.cardType}});
    }

    handleDelete() {
        fetch(`/cards/${this.state.cardType}s/${this.state.cardInfo._id}/delete`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            credentials: 'include',
            body: `cardType=${this.state.cardType}`
        }).then( res => {
            if(!res.ok) {
                res.text().then(data => {
                    this.props.history.push({
                        pathname: `/cards/${this.state.cardType}s/${this.state.cardInfo._id}`,
                        state: {message: data}
                    });
                });
            } else {
                res.text().then(data => {
                    this.props.history.push({
                        pathname: `/cards/`,
                        state: {message: data}
                    });
                });
            }
        });
    }

    render() {
        return (
            <React.Fragment>
            <Navbar heading={this.state.cardInfo.storeName} message={this.props.history.location.state ? this.props.history.location.state.message : null}/>
            <div className="pageWrapper">
                <div id="modal" aria-hidden="true">
                    <div id="modalWrapper">
                        <h2>Charge Amount</h2>
                        <input id="transactionAmount" type="number" placeholder="Amount" min="0"/>
                        <button onClick={this.postTransaction} id="modalButton">Ok</button>
                    </div>
                </div>

                <div id="barcode">
                    <img id="barcodeImg" alt="barcode" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FxBpUxaFR2zs%2Fhqdefault.jpg&f=1&nofb=1"></img>
                    <p>
                        {this.state.cardInfo.barcode}
                    </p>
                </div>

                {
                    this.state.cardType === 'giftcard' &&
                    <React.Fragment>
                        <h2 id="balance">
                            Remaining Balance: ${this.state.cardInfo.balance}
                        </h2>
                        <button onClick={this.handleModal} id="logButton" className="button button-shadow"><h2>Log Purchase</h2></button>
                        <Link to={`/cards/giftcards/${this.state.cardInfo._id}/transactions`}>
                            <h2 id="transactionButton" className="button button-shadow">Transaction History</h2>
                        </Link>
                    </React.Fragment>
                }

                <h2>Closest Location</h2>
                <p>Google Maps</p>

                <button id="editButton" className="button button-shadow"><h2 onClick={this.handleEditClick}>Edit Card</h2></button>
                <button id="deleteButton" className="button button-shadow"><h2 onClick={this.handleDelete}>Delete Card</h2></button>
            </div>
            </React.Fragment>
        );
    }
}

export default withUserContext(StorePage);