import { 
    USER_LOADING,
    USER_LOADED,
    AUTH_ERR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS

 } from '../actions/types';
 import axios from "axios";
import { getSalt } from 'bcryptjs';
import { returnErrors } from './errorActions';

 //check token and loaduser
 export const loadUser = () => (dispatch, getState) => {
    // User Laoding
    dispatch({ USER_LOADING });

axios.get('/api/auth/user', tokenConfig(getState))
  .then(res => dispatch({
    type: USER_LOADED,
    payload: res.data
    }))
  .catch(err => { 
    dispatch(returnErrors(err.response.data, err.response.status));  
    dispatch({
   type: AUTH_ERR   
  });
});
};

//setup config/headers and token
   export const tokenConfig = getState => {
//get token from localStorage
   const token = getState().auth.token;

   // Headers  
   const config = {
   headers: {
       "Content-type": "application/json"
    }  
   };
   
//if token, add to headers
if(token) {
   config.headers['x-auth-token'] = token;
}
return config;
};

//register user 
export const register = ({ name, email, password }) => dispatch => {

 // Headers
 const config = {
   headers: {
       "Content-type": "application/json"
   }
 };

// Body 
const body = JSON.stringify({ name, email, password});

axios.post('apli/users', body, config)
.then(res => dispatch({
   type: REGISTER_SUCCESS,
   payload: res.data
}))
.catch(err => {
   dispatch(returnErrors(err.response.data, err.response.status, REGISTER_FAIL));   
   dispatch({
   type: REGISTER_FAIL
});
});
}

//Login User 

export const login = ({ email, password }) => dispatch => {

   // Headers
   const config = {
      headers: {
         "Content-type": "application/json"
      }
   };
  
  // Body 
  const body = JSON.stringify({ email, password});
  
  axios.post('apli/auth', body, config)
  .then(res => dispatch({
     type: LOGIN_SUCCESS,
     payload: res.data
  }))
  .catch(err => {
     dispatch(returnErrors(err.response.data, err.response.status, LOGIN_FAIL));   
     dispatch({
     type: LOGIN_FAIL
  });
  });
  }

// Logout user
export const logout = () =>{
   return {
   type: LOGOUT_SUCCESS
   };
};