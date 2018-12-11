import {CURRENT_USER,GET_ERRORS} from '../types'
import Axios from 'axios';
import  setAuthToken from '../../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

//register user
export const userRegister=function(userData,path){
   return function(dispatch){
     Axios.post('/api/users/register', userData)
     .then(() => {
       path.push('/login')
     }).catch((err) => {
      dispatch({
        type:GET_ERRORS,
        payload:err.response.data
      });
     });
   }
  }
  
  //login user
  export const userlogin=function(userData){
    return function(dispatch){
      Axios.post('/api/users/login', userData)
      .then((user) => {
        const token=user.data.token;
        localStorage.setItem('jwtToken', token);
        //to set header
        setAuthToken(token);
        //extract user data
        const userData=jwt_decode(token);
        dispatch({
             type:CURRENT_USER,
              payload:userData  
        });
        //redrirct to home page
        // path.push('/dashboard')
      }).catch((err) => {
        // console.log(err.response.data);
       dispatch({
         type:GET_ERRORS,
         payload:err.response.data
       });
      });
    }
   }
   
   //user logout
   export const userLogout=function () {
     return function(dispatch){
        //remove acces token
        localStorage.removeItem('jwtToken');
        localStorage.clear();
        console.log(localStorage.jwt_decode)
        //delete token from header 
        setAuthToken(false);
        //set current user= {} and userAuth=false
        dispatch({
          type:CURRENT_USER,
          payload:{} 
        })
     }
   }