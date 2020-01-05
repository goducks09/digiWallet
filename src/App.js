import React from 'react';
import {Switch,Route} from 'react-router-dom';
import logo from './logo.svg';
import Homepage from './components/homePage';
import './App.css';
import AddCard from './components/addCard';
import GitftcardHome from './components/homePage';
import StoreList from './components/giftcards/index';
import StorePage from './components/giftcards/show';
import Transactions from './components/giftcards/cardTransactions';
import EditCard from './components/giftcards/edit';
import Register from './components/register';
import Profile from './components/profile';

function App() {
  return (
    <React.Fragment>        
      <Switch>
        <Route path='/' exact component={Homepage} />
        <Route path='/register' component={Register} />
        <Route path='/login'>
          {/* <Login /> */}
        </Route>
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
      </Switch>
    </React.Fragment>

    // <div id="loadingPage">
    //   <header>
    //     <h1>DigiWallet</h1>
    //   </header>
    // </div>
  );
}

export default App;
