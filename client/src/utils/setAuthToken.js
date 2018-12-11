import Axios from 'axios';
const setAuthToken=function(token){
  if(token){
       // Apply to every request
    Axios.defaults.headers.common['Authorization'] = token;
  } else {
    // Delete auth header
    delete Axios.defaults.headers.common['Authorization'];
  }
}

export default setAuthToken;