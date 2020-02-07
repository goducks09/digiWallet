import React, {Component} from 'react';
import Navbar from '../navbar/navbar';
import '../../resources/css/storePage.css';

export default class EditCard extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        this.state = {
            cardType: props.location.state.cardType,
            cardInfo: {
                _id: props.location.state.cardInfo._id,
                storeName: props.location.state.cardInfo.storeName,
                amount: props.location.state.cardInfo.amount,
                balance: props.location.state.cardInfo.balance,
                barcode: props.location.state.cardInfo.barcode,
                pin: props.location.state.cardInfo.pin,
                transactions: props.location.state.cardInfo.transactions
            }
        }
    }


    handleInputChange(e) {
        const value = e.target.value;
        const name = e.target.name;
        
        this.setState(prevState => ({
            cardInfo:{
                ...prevState.cardInfo,
                [name]: value
            }
        }));
        
    }

    handleSubmit(e) {
        e.preventDefault();
        let type;
        if(this.state.cardType === 'giftcard') {
            type = 'giftcards';
        } else {
            type = 'rewards';
        }

        let card = `storeName=${this.state.cardInfo.storeName}&barcode=${this.state.cardInfo.barcode}`;
        
        if(this.state.cardType === 'giftcard') {
            let newBalance = this.state.cardInfo.amount;

			this.state.cardInfo.transactions.forEach(function(transaction) {
				newBalance -= transaction.amount;
            })
            
            this.setState(prevState => ({
                cardInfo:{
                    ...prevState.cardInfo,
                    balance: newBalance
                }
            }));
            
            card += `&amount=${this.state.cardInfo.amount}&balance=${newBalance}&pin=${this.state.cardInfo.pin}`;
        }
        
        fetch(`http://localhost:5000/cards/${type}/${this.state.cardInfo._id}/edit`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            credentials: 'include',
            body: card
        }).then( res => {
            if(!res.ok) {
                res.text().then(data => {
                    this.props.history.push({
                        pathname: `/cards/${type}/${this.state.cardInfo._id}/edit`,
                        state: {message: data}
                    });
                });
            } else {
                res.text().then(data => {
                    this.props.history.push({
                        pathname:`/cards/${type}/${this.state.cardInfo._id}`,
                        state: {cardInfo: this.state.cardInfo, cardType: this.state.cardType, message: data}
                    });
                });
            }
        });
    }

    render() {
        let fields;
            
        if (this.state.cardType === 'giftcard') {
            fields = 
                <React.Fragment>
                    <label htmlFor="storeName">Store Name</label>
                    <input id="storeName" type="text" onChange={this.handleInputChange} value={this.state.cardInfo.storeName} name="storeName" placeholder="Store Name" required/>
                    
                    <label htmlFor="giftcardAmount">Amount</label>
                    <input id="giftcardAmount" type="number" onChange={this.handleInputChange} value={this.state.cardInfo.amount} name="amount" placeholder="Amount" min="0" pattern="[0-9]" required/>
                    
                    <label htmlFor="barcodeNumber">Barcode</label>
                    <input id="barcodeNumber" type="number" onChange={this.handleInputChange} value={this.state.cardInfo.barcode} name="barcode" placeholder="Barcode" min="0" pattern="[0-9]" required/>
                    
                    <label htmlFor="pinNumber">PIN</label>
                    <input id="pinNumber" type="number" onChange={this.handleInputChange} value={this.state.cardInfo.pin} name="pin" placeholder="PIN" min="0" pattern="[0-9]"  required/>
                </React.Fragment>;
        } else if (this.state.cardType === 'rewardsCard') {
            fields =
                <React.Fragment>
                    <input type="text" onChange={this.handleInputChange} value={this.state.cardInfo.storeName} name="storeName" placeholder={"Store Name"} required/>
                    <input type="number" onChange={this.handleInputChange} value={this.state.cardInfo.barcode} name="barcode" placeholder="Barcode" min="0" pattern="[0-9]" required/>
                </React.Fragment>;
        }

        return (
            <React.Fragment>
                <Navbar heading={`Edit "${this.state.cardInfo.storeName}"`} />
                <div className="formWrapper">
                    <form onSubmit={this.handleSubmit}>
                        {fields}
                        <input type="submit" value="Submit"/>  
                    </form>                
                </div>
            </React.Fragment>
        );
    }
}
