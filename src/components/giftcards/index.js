import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {withUserContext} from '../wrappers/componentWrappers';
import Navbar from '../navbar/navbar';
import '../../resources/css/storeList.css';
import defaultStore from '../../resources/icons/store.png';

class StoreList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            giftcards: [],
            rewardsCards: [],
            fetch: false,
            message: null
        }
    }

    componentDidMount() {
        fetch('/cards', {
            credentials: "include"
        })
        .then(res => {
            if(res.status === 403) {
                this.setState({message: "You must login first"});
                throw new Error("You must login");
            }
            return res.json();
        })
        .catch(err => {
            console.log("Server error: ", err);
            this.props.history.push({pathname: '/login', state: {message: this.state.message}});
        })
        .then(data => {
            this.setState({
                giftcards: data.giftcards,
                rewardsCards: data.rewardsCards,
                fetch: true
            });
        })
        .catch(err => console.log("Page error: ", err));
    }
    
    render() {
        let body;
        if (!this.state.fetch) {body = (<h2>Loading...</h2>);}

        else if((this.props.location.state.showGiftcards && !this.state.giftcards.length) || (this.props.location.state.showRewards && !this.state.rewardsCards.length)) {
            body = (<h2>You do not have any cards to display</h2>);
        }
        return (
            <React.Fragment>
                <Navbar heading={this.props.location.state.showGiftcards ? "Giftcards" : "Rewards Cards"} />
                {body}
                {
                    //foreach card returned create the store item
                    this.props.location.state.showGiftcards ?

                    this.state.giftcards.map(card => {
                        return (
                            <div className="storeWrapper button-shadow" style={card.storeColor ? {'backgroundColor':card.storeColor} : {'backgroundColor':'#FFBA80'}}>
                                <Link to={{pathname: `/cards/giftcards/${card._id}`, state: {cardInfo: card, cardType: 'giftcard'}}}>
                                    {card.logo ? <img src={card.logo} alt="Store logo"></img> : <img src={defaultStore} alt="Default store icon"></img>}
                                    <h2>{card.storeName}</h2>
                                    <span>${card.balance}</span>
                                </Link>
                            </div>
                        )
                    })

                    :

                    this.state.rewardsCards.map(card => {
                        return (
                            <div className="storeWrapper button-shadow" style={card.storeColor ? {'backgroundColor':card.storeColor} : {'backgroundColor':'#FFBA80'}}>
                                <Link to={{pathname: `/cards/rewards/${card._id}`, state: {cardInfo: card, cardType: 'rewardsCard'}}}>
                                    {card.logo ? <img src={card.logo} alt="Store logo"></img> : <img src={defaultStore} alt="Default store icon"></img>}
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