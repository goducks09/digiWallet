import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {withUserContext} from '../components/wrappers/componentWrappers';
import Navbar from './navbar/navbar';

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            giftcards: [],
            rewardsCards: [],
            numberGiftcards: 0,
            numberRewardsCards: 0,
            fetch: false
        }
    }

    componentDidMount() {
        fetch('http://localhost:5000/cards', {
            credentials: "include"
        })
        .then(res => {
            if(res.status === 403) {
                throw new Error("You must login");
            };
            return res.json();
        })
        .catch(err => {
            console.log("Server error: ", err);
            this.props.history.push('/login');
        })
        .then(data => {
            const numberGiftcards = data.giftcards.length;
            const numberRewards = data.rewardsCards.length;

            this.setState({
                giftcards: data.giftcards,
                rewardsCards: data.rewardsCards,
                numberGiftcards: numberGiftcards,
                numberRewardsCards: numberRewards,
                fetch: true
            });
        })
        .catch(err => console.log("Page error: ", err));
    }

    render() {
        let body;
        if (!this.state.fetch) {body = (<h2>Loading...</h2>);}

        else if(!this.state.giftcards.length && !this.state.rewardsCards.length) {
            body = (<h2>You don't have any cards saved. Add one!</h2>);
        }
        const addButton = 
            <Link to={'/cards/new'}>
                <img src="https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn4.iconfinder.com%2Fdata%2Ficons%2Fkeynote-and-powerpoint-icons%2F256%2FPlus-128.png&f=1&nofb=1" alt="Add card icon"></img>
            </Link>;
       
        return (
            <React.Fragment>
                <Navbar heading="Categories" />
                {body}
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
    };
}

export default withUserContext(Homepage);