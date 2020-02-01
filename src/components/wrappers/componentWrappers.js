import React from 'react';
import {UserContext} from '../../App';

export const withUserContext = Component => {
    return props => {
      return (
        <UserContext.Consumer>
          {({user, username, isLoggedIn, login, logout}) => {
            return <Component {...props} user={user} username={username} isLoggedIn={isLoggedIn} login={login} logout={logout} />;
          }}
        </UserContext.Consumer>
      );
    };
  };