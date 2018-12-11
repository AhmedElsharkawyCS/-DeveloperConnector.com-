import {combineReducers} from 'redux';//collect multi reducer in one reducer 
import userAuth from './userAuth';
import userErrors from './userErrors'
//import all reducers 

const Reducer=combineReducers({
    auth:userAuth,
    errors:userErrors
});

export default Reducer;