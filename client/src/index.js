import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {CURRENT_USER} from './reduxControl/types'
import {userLogout} from'./reduxControl/action/index'
import './index.css';
import {Provider} from 'react-redux';
import Reducer from './reduxControl/reducer/combineReducers';//have states
import thunk from 'redux-thunk';
import {createStore,applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const store=createStore(
    Reducer,
    {},
    composeWithDevTools(applyMiddleware(thunk))
    );
    ///////////////////////////////////
    if (localStorage.getItem('jwtToken')) {
        // Set auth token header auth
        setAuthToken(localStorage.getItem('jwtToken'));
        console.log(localStorage.getItem('jwtToken'))
        // Decode token and get user info and exp
        const decoded = jwt_decode(localStorage.getItem('jwtToken'));
        // Set user and isAuthenticated
        store.dispatch({
            type:CURRENT_USER,
            payload:decoded
        });
      
        // Check for expired token
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          // Logout user
          store.dispatch(userLogout());
          // TODO: Clear current Profile
      
          // Redirect to login
          window.location.href = '/login';
        }
      }
///////////////////////////////////////////////
ReactDOM.render(
    <Provider store={store}>
            <App/> 
    </Provider>,
     document.getElementById('root')
    );
