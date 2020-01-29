import React, {Component} from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import logo from './logo.svg';
import Homepage from './components/homePage';
import './App.css';
import AddCard from './components/addCard';
import GitftcardHome from './components/homePage';
import StoreList from './components/giftcards/index';
import StorePage from './components/giftcards/show';
import Transactions from './components/giftcards/cardTransactions';
import EditCard from './components/giftcards/edit';
import Register from './components/users/register';
import Login from './components/users/login';
export const UserContext = React.createContext();

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        user: null,
        isLoggedIn: false
    }

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount(prevProps, prevState) {
    if (this.state !== prevState) {
      fetch('http://localhost:5000/authenticate', {
            credentials: 'include'
        })
        .then( res => res.json())
        .then( data => {
            this.setState({
              user: data._id,
              isLoggedIn: true
            });
        });
    }
  }

  login(userID) {
    this.setState({
      user: userID,
      isLoggedIn: true
    });
  }

  logout() {
    fetch('http://localhost:5000/logout', {
        credentials: 'include'
    })
    .then( res => {
      console.log(res);
      if(res.ok) {
        this.setState({
          user: null,
          isLoggedIn: false
        });
      }
    })
  }

  render() {
    const value = {
      user: this.state.user,
      isLoggedIn: this.state.isLoggedIn,
      login: this.login,
      logout: this.logout
    }

    return (
      <UserContext.Provider value={value}> 
        <React.Fragment>
            <Switch>
              <Route path='/' exact component={Homepage} />
              <Route path='/register' component={Register} />
              <Route path='/login' component={Login} />
              <Route path='/profile' component={Login} />
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
              <Redirect to='/login' />
            </Switch>
        </React.Fragment>
      </UserContext.Provider>
    );
  }
}
