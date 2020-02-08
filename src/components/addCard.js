import React, {Component} from 'react';
import {withUserContext} from '../components/wrappers/componentWrappers';
import Navbar from './navbar/navbar';
import '../resources/css/addCard.css';

class AddCard extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        this.state = {
            cardType: '',
            storeName: '',
            giftcardAmount: '',
            barcodeNumber: '',
            pinNumber: '',
            storeColor: '',
            logo: ''
        }
    }

    handleInputChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const colors = ['black', '#395662', '#4c212a', '#9b104e'];
        let randomColor = '';
        let num = Math.floor(Math.random() * Math.floor(4));
        randomColor = colors[num];
        
        const card = `userID=${this.props.user}&cardType=${this.state.cardType}&storeName=${this.state.storeName}&amount=${this.state.giftcardAmount}&balance=${this.state.giftcardAmount}&barcode=${this.state.barcodeNumber}&pin=${this.state.pinNumber}&storeColor=${randomColor}`;
        
        fetch('/cards',{
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            credentials: 'include',
            body: card
        })
        .then( res => {
            if(!res.ok) {
                res.text().then(data => {
                    this.props.history.push({pathname: '/cards/new', state: {message: data}});
                });
            } else {
                res.text().then(data => {
                    this.props.history.push({pathname: '/cards', state: {message: data}});
                });
            }
        });
    }
    
    render() {
        let fields;
        
        if (this.state.cardType === 'giftcard') {
            fields = 
                <React.Fragment>
                    <input type="text" onChange={this.handleInputChange} value={this.state.storeName} name="storeName" placeholder={"Store Name"} required/>
                    <input type="number" onChange={this.handleInputChange} value={this.state.giftcardAmount} name="giftcardAmount" placeholder="Amount" min="0" pattern="[0-9]" required/>
                    <input type="number" onChange={this.handleInputChange} value={this.state.barcodeNumber} name="barcodeNumber" placeholder="Barcode" min="0" pattern="[0-9]" required/>
                    <input type="number" onChange={this.handleInputChange} value={this.state.pinNumber} name="pinNumber" placeholder="PIN" min="0" pattern="[0-9]"  required/>
                    <input type="submit" value="Add"/>
                </React.Fragment>;
        } else if (this.state.cardType === 'rewardsCard') {
            fields =
                <React.Fragment>
                    <input type="text" onChange={this.handleInputChange} value={this.state.storeName} name="storeName" placeholder={"Store Name"} required/>
                    <input type="number" onChange={this.handleInputChange} value={this.state.barcodeNumber} name="barcodeNumber" placeholder="Barcode" min="0" pattern="[0-9]" required/>
                    <input type="submit" value="Add"/>
                </React.Fragment>;
        }

        return (
            <React.Fragment>
                <Navbar heading="Add Card" />
                <div className="formWrapper">
                    <form onSubmit={this.handleSubmit}>
                        <select id="cardSelect" onChange={this.handleInputChange} value={this.state.cardType} name="cardType" required>
                            <option value="">Please Select a Card Type</option>
                            <option value="giftcard">Giftcard</option>
                            <option value="rewardsCard">Rewards Card</option>
                        </select>
                        {fields}
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

export default withUserContext(AddCard);