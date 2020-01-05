import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Navbar from './navbar/navbar';

export default class Homepage extends Component {
    constructor() {
        super();
        this.state = {
            giftcards: [],
            rewardsCards: [],
            numberGiftcards: 0,
            numberRewardsCards: 0
        }
    }

    componentDidMount() {
        fetch('http://localhost:5000/cards')
        .then(res => res.json())
        .catch(err => console.log("Server error: ", err))
        .then(data => {
            const numberGiftcards = data.giftcards.length;
            const numberRewards = data.rewardsCards.length;

            this.setState({
                giftcards: data.giftcards,
                rewardsCards: data.rewardsCards,
                numberGiftcards: numberGiftcards,
                numberRewardsCards: numberRewards
            });
        })
        .catch(err => console.log("Page error: ", err));
    }

    render() {
        const addButton = 
        <Link to={'/cards/new'}>
            <img src="https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn4.iconfinder.com%2Fdata%2Ficons%2Fkeynote-and-powerpoint-icons%2F256%2FPlus-128.png&f=1&nofb=1" alt="Add card icon"></img>
        </Link>;

        const nav = <Navbar heading="Categories" />;
        //if no cards in database
        if (this.state.numberGiftcards < 1 && this.state.numberRewardsCards < 1) {
            return (
                <React.Fragment>
                    {nav}
                    <section>
                        <p>You don't have any cards saved. Add one!</p>
                        {addButton}
                    </section>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    {nav}
                    <section id="homePageList">
                        {this.state.numberGiftcards > 0 &&
                        <Link id="giftcardsList" to={{pathname: '/cards/giftcards', state: {showGiftcards: true}}}>
                            <h2>Giftcards</h2>
                            <span>{this.state.numberGiftcards}</span>
                        </Link>
                        }

                        {this.state.numberRewardsCards > 0 &&
                            <Link id="rewardsList" to={{pathname: '/cards/rewards', state: {showRewards: true}}}>
                                <h2>Rewards Cards</h2>
                                <span>{this.state.numberRewardsCards}</span>
                            </Link>
                        }

                        {addButton}
                    </section>
                </React.Fragment>
            );
        }
    };
}