import React, {Component} from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import logo from './logo.svg';
import Homepage from './components/homePage';
import './App.css';
import AddCard from './components/addCard';
import StoreList from './components/giftcards/index';
import StorePage from './components/giftcards/show';
import Transactions from './components/giftcards/cardTransactions';
import EditCard from './components/giftcards/edit';
import Register from './components/users/register';
import Login from './components/users/login';
import Profile from './components/users/profile';
export const UserContext = React.createContext();

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        user: null,
        username: null,
        isLoggedIn: false,
        message: null
    }

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  //if page is refreshed, check if the user is logged in
  componentDidMount(prevProps, prevState) {
    if (this.state !== prevState) {
      fetch('/authenticate', {
            credentials: 'include'
        })
        .then( res => {
          if(res.status !== 200) {
            this.setState({message: "You must login"});
            throw new Error("You must login");
          }
          return res.json();
        })
        .then( data => {
            this.setState({
              user: data._id,
              username: data.username,
              isLoggedIn: true
            });
        })
        .catch( err => console.log(err));
    }
  }

  login(userID, username) {
    this.setState({
      user: userID,
      username: username,
      isLoggedIn: true
    });
  }

  logout() {
    fetch('/logout', {
        credentials: 'include'
    })
    .then( res => {
      if(res.ok) {
        this.setState({
          user: null,
          isLoggedIn: false,
          message: "You have successfully logged out"
        });
      }
    })
  }

  render() {
    const value = {
      user: this.state.user,
      username: this.state.username,
      isLoggedIn: this.state.isLoggedIn,
      login: this.login,
      logout: this.logout
    }
    if(this.state.isLoggedIn) {
      return (
        <UserContext.Provider value={value}> 
          <React.Fragment>
              <Switch>
                <Route path='/' exact component={Homepage} />
                <Route path='/profile' component={Profile} />
                <Route path='/cards/giftcards/:id/transactions' component={Transactions} />
                <Route path='/cards/giftcards/:id/edit' component={EditCard}/>
                <Route path='/cards/giftcards/:id' component={StorePage} />
                <Route path='/cards/giftcards' component={StoreList} />
                <Route path='/cards/rewards/:id/edit' component={EditCard}/>
                <Route path='/cards/rewards/:id' component={StorePage} />
                <Route path='/cards/rewards' component={StoreList} />
                <Route path='/cards/new' component={AddCard} />
                <Route path='/cards' component={Homepage} />
                {/* <Route component={Default} /> */}
                <Redirect to='/' />
              </Switch>
          </React.Fragment>
        </UserContext.Provider>
      );
    } else {
      return (
        <UserContext.Provider value={value}>
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Redirect to={{pathname:'/login', state: {message: this.state.message}}}/>
          </Switch>
        </UserContext.Provider>
      );
    }
  }
}
