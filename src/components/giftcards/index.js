import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {withUserContext} from '../wrappers/componentWrappers';
import Navbar from '../navbar/navbar';
import '../../resources/css/storeList.css';

class StoreList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            giftcards: [],
            rewardsCards: []
        }
    }

    // componentDidMount() {
    //     fetch('http://localhost:5000/cards')
    //     .then(res => res.json())
    //     .catch(err => console.log("Server error: ", err))
    //     .then(data => {
    //         console.log(data);
    //         const giftcards = data.giftcards.map(card => {
    //             return {
    //                 storeName: card.storeName,
    //                 amount: card.amount,
    //                 barcode: card.barcode,
    //                 pin: card.pin
    //             }
    //         });
    //         const rewardsCards = data.rewardsCards.map(card => {
    //             return {
    //                 storeName: card.storeName,
    //                 barcode: card.barcode
    //             }
    //         });
            
    //         this.setState({
    //             giftcards: giftcards,
    //             rewardsCards: rewardsCards
    //         });
    //         console.log("State :", this.state);
    //     })
    //     .catch(err => console.log("Page error: ", err));
    // }

    componentDidMount() {
        fetch('http://localhost:5000/cards', {
            credentials: "include"
        })
        .then(res => res.json())
        .catch(err => console.log("Server error: ", err))
        .then(data => {
            this.setState({
                giftcards: data.giftcards,
                rewardsCards: data.rewardsCards
            });
        })
        .catch(err => console.log("Page error: ", err));
    }
    
    render() {
        return (
            <React.Fragment>
                <Navbar heading={this.props.location.state.showGiftcards ? "Giftcards" : "Rewards Cards"} />
                {
                    //foreach card returned create the store item
                    this.props.location.state.showGiftcards ?

                    this.state.giftcards.map(card => {
                        return (
                            <div className="storeWrapper" style={card.storeColor ? {'backgroundColor':card.storeColor} : {'backgroundColor':'#FFBA80'}}>
                                <Link to={{pathname: `/cards/giftcards/${card._id}`, state: {cardInfo: card, cardType: 'giftcard'}}}>
                                    {card.logo ? <img src={card.logo} alt="Store logo"></img> : <span>Logo unavailable</span>}
                                    <h2>{card.storeName}</h2>
                                    <span>${card.balance}</span>
                                </Link>
                            </div>
                        )
                    })

                    :

                    this.state.rewardsCards.map(card => {
                        return (
                            <div className="storeWrapper" style={card.storeColor ? {'backgroundColor':card.storeColor} : {'backgroundColor':'#FFBA80'}}>
                                <Link to={{pathname: `/cards/rewards/${card._id}`, state: {cardInfo: card, cardType: 'rewardsCard'}}}>
                                    {card.logo ? <img src={card.logo} alt="Store logo"></img> : <span>Logo unavailable</span>}
                                    <h2>{card.storeName}</h2>
                                </Link>
                            </div>
                        )
                    })
                }
            </React.Fragment>
        );
    }
}

export default withUserContext(StoreList);