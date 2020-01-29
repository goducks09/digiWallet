import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {withUserContext} from '../wrappers/componentWrappers';
import '../../resources/css/navbar.css';

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            heading: props.heading,
            dropdownOpen: false
        }

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidUpdate(prevProps){
        if(prevProps.heading !== this.props.heading){
            this.setState({          
                heading: this.props.heading
            });
        }
    }

    handleClick(e) {
        e.preventDefault();

        const menu = document.getElementById('dropdown');
        if (this.state.dropdownOpen) {
            menu.style.display = 'none';
        } else {
            menu.style.display = 'flex';
        }

        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        let link;
        this.props.isLoggedIn ? link = 'profile' : link = 'login'

        return (
            <nav>
                <ul>
                    <li id="hamburger" onClick={this.handleClick} className={this.state.dropdownOpen ? 'clicked' : undefined}>
                        <img src="https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn4.iconfinder.com%2Fdata%2Ficons%2Fflat-black%2F128%2Fmenu.png&f=1&nofb=1" alt="Menu icon"></img>
                        <ul id="dropdown">
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to={{pathname: '/cards/giftcards', state: {showGiftcards: true}}}>My Giftcards</Link></li>
                            <li><Link to={{pathname: '/cards/rewards', state: {showRewards: true}}}>My Rewards Cards</Link></li>
                            <li><Link to='/cards/new'>Add a Card</Link></li>
                        </ul>
                    </li>
                    <li>
                            <h1>{this.state.heading}</h1>
                    </li>
                    <li>
                        <Link to={`/${link}`}>
                            <img src="http://icons.iconarchive.com/icons/mahm0udwally/all-flat/128/User-icon.png" alt="Profile icon"></img>
                        </Link>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default withUserContext(Navbar);